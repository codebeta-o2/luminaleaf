import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Play, Pause, Sun, Calendar, Clock, RotateCw, ShieldCheck, 
  ZoomIn, ZoomOut, RefreshCw, Factory
} from 'lucide-react';

interface Solar3DShadowAnalysisProps {
  darkMode?: boolean;
}

type Season = 'Winter' | 'Summer' | 'Equinox' | 'Today';

interface SeasonData {
  name: Season;
  dateLabel: string;
  maxAltitude: number; // degrees at solar noon
  sunriseHour: number;
  sunsetHour: number;
  peakIrradiance: number; // W/m²
}

const SEASONS: Record<Season, SeasonData> = {
  Winter: {
    name: 'Winter',
    dateLabel: 'Dec 21 (Solstice)',
    maxAltitude: 42,
    sunriseHour: 7.0,
    sunsetHour: 17.2,
    peakIrradiance: 680,
  },
  Summer: {
    name: 'Summer',
    dateLabel: 'Jun 21 (Solstice)',
    maxAltitude: 84,
    sunriseHour: 5.5,
    sunsetHour: 18.8,
    peakIrradiance: 980,
  },
  Equinox: {
    name: 'Equinox',
    dateLabel: 'Mar 21 / Sep 23',
    maxAltitude: 63,
    sunriseHour: 6.0,
    sunsetHour: 18.0,
    peakIrradiance: 890,
  },
  Today: {
    name: 'Today',
    dateLabel: 'Aug 20',
    maxAltitude: 74,
    sunriseHour: 5.8,
    sunsetHour: 18.4,
    peakIrradiance: 935,
  },
};

export const Solar3DShadowAnalysis: React.FC<Solar3DShadowAnalysisProps> = ({ darkMode = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simulation controls state
  const [season, setSeason] = useState<Season>('Today');
  const [timeHour, setTimeHour] = useState<number>(11.5); // 11:30 AM
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cameraView, setCameraView] = useState<'drone' | 'overhead' | 'ground'>('drone');
  const [scrollSync, setScrollSync] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(100); // 100%

  // References to three.js scene elements
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const sunSphereRef = useRef<THREE.Mesh | null>(null);
  const dynamicModelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 4, 0));
  const cameraSphericalRef = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 78,
    theta: Math.PI * 0.5,
    phi: Math.PI * 0.28,
  });

  // Calculate sun position based on season and time
  const currentSeasonData = SEASONS[season];

  // Calculate sun position vector
  const getSunPosition = useCallback((hour: number, currentSeason: Season) => {
    const sData = SEASONS[currentSeason];
    const dayLength = sData.sunsetHour - sData.sunriseHour;
    const progress = (hour - sData.sunriseHour) / dayLength; // 0 (sunrise) to 1 (sunset)
    
    // Normalized [-1, 1] across the day
    const normalizedTime = Math.max(0, Math.min(1, progress));
    const sunAngle = (normalizedTime - 0.5) * Math.PI; // -PI/2 to PI/2

    // Altitude angle
    const maxAltRad = (sData.maxAltitude * Math.PI) / 180;
    const altitude = Math.max(0, Math.cos(sunAngle) * maxAltRad);

    // Azimuth: East (90°) through South (180°) to West (270°)
    const azimuth = Math.PI * (0.15 + 0.7 * normalizedTime);

    const distance = 95;
    const x = -Math.cos(sunAngle) * distance * Math.cos(azimuth);
    const y = Math.sin(altitude) * distance;
    const z = Math.sin(sunAngle) * distance;

    const altDeg = Math.round((altitude * 180) / Math.PI);
    const azimDeg = Math.round((azimuth * 180) / Math.PI);

    // Shading loss factor heuristic based on low sun angles vs parapets and obstacles
    let shadingPercent = 0.1;
    if (altDeg < 16) {
      shadingPercent = Math.min(16.5, (16 - altDeg) * 1.8);
    } else if (altDeg < 28) {
      shadingPercent = Math.min(4.8, (28 - altDeg) * 0.4);
    } else {
      shadingPercent = 0.2; // Sub-1% optimal design
    }

    // Irradiance calculation
    const currentIrradiance = Math.max(0, Math.round(sData.peakIrradiance * Math.sin(altitude)));

    return {
      x,
      y: Math.max(1, y),
      z,
      altitude: altDeg,
      azimuth: azimDeg,
      shadingPercent: parseFloat(shadingPercent.toFixed(1)),
      irradiance: currentIrradiance,
    };
  }, []);

  // Update Three.js camera position from spherical coordinates
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = cameraSphericalRef.current;
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(cameraTargetRef.current);
  }, []);

  // Zoom In Handler
  const handleZoomIn = () => {
    cameraSphericalRef.current.radius = Math.max(22, cameraSphericalRef.current.radius - 9);
    updateCameraPosition();
    setZoomLevel(Math.round((78 / cameraSphericalRef.current.radius) * 100));
  };

  // Zoom Out Handler
  const handleZoomOut = () => {
    cameraSphericalRef.current.radius = Math.min(150, cameraSphericalRef.current.radius + 9);
    updateCameraPosition();
    setZoomLevel(Math.round((78 / cameraSphericalRef.current.radius) * 100));
  };

  // Reset Camera View & Zoom
  const handleResetView = () => {
    cameraSphericalRef.current = {
      radius: 78,
      theta: Math.PI * 0.5,
      phi: Math.PI * 0.28,
    };
    cameraTargetRef.current.set(0, 4, 0);
    updateCameraPosition();
    setZoomLevel(100);
    setCameraView('drone');
  };

  // Format hour into standard readable time (e.g., "11:30 AM")
  const formatTime = (hourVal: number) => {
    const totalMinutes = Math.round(hourVal * 60);
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours12}:${minStr} ${period}`;
  };

  // Camera presets
  const handleSetView = (view: 'drone' | 'overhead' | 'ground') => {
    setCameraView(view);
    if (view === 'drone') {
      cameraSphericalRef.current = { radius: 78, theta: Math.PI * 0.5, phi: Math.PI * 0.28 };
    } else if (view === 'overhead') {
      cameraSphericalRef.current = { radius: 68, theta: Math.PI * 0.5, phi: 0.05 };
    } else if (view === 'ground') {
      cameraSphericalRef.current = { radius: 64, theta: Math.PI * 0.22, phi: Math.PI * 0.4 };
    }
    updateCameraPosition();
    setZoomLevel(Math.round((78 / cameraSphericalRef.current.radius) * 100));
  };

  // Build the 3D Meshes for the Industrial Solar Facility
  const rebuildModels = useCallback(() => {
    if (!dynamicModelGroupRef.current) return;
    const group = dynamicModelGroupRef.current;
    
    // Clear all existing children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        if (obj.geometry) obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else if (obj.material) {
          obj.material.dispose();
        }
      }
    }

    // Common Materials
    const buildingWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6dbdf,
      roughness: 0.7,
      metalness: 0.1,
    });

    const roofBlueMaterial = new THREE.MeshStandardMaterial({
      color: 0x24425d, // Dark industrial navy blue matching screenshot
      roughness: 0.45,
      metalness: 0.25,
    });

    const roofLightMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8dde2,
      roughness: 0.85,
    });

    const safetyLineMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1c40f, // Safety yellow lifeline
      roughness: 0.3,
    });

    const solarFrameMaterial = new THREE.MeshStandardMaterial({
      color: 0x9ca3af, // Anodized aluminum mounting rails
      metalness: 0.8,
      roughness: 0.2,
    });

    const solarCellMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a192f, // Deep navy monocrystalline PV cells
      roughness: 0.18,
      metalness: 0.75,
    });

    const hvacMaterial = new THREE.MeshStandardMaterial({
      color: 0xbdc3c7,
      roughness: 0.4,
      metalness: 0.5,
    });

    const treeTrunkMaterial = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
    const treeFoliageMaterial = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.75 });

    // Lower warehouse body
    const b1Length = 76;
    const b1Width = 32;
    const b1Height = 8.5;

    const b1BodyGeo = new THREE.BoxGeometry(b1Length, b1Height, b1Width);
    const b1Body = new THREE.Mesh(b1BodyGeo, buildingWallMaterial);
    b1Body.position.set(-2, b1Height / 2, -10);
    b1Body.castShadow = true;
    b1Body.receiveShadow = true;
    group.add(b1Body);

    // Industrial dark blue roof
    const b1RoofGeo = new THREE.BoxGeometry(b1Length + 1.2, 0.6, b1Width + 1.2);
    const b1Roof = new THREE.Mesh(b1RoofGeo, roofBlueMaterial);
    b1Roof.position.set(-2, b1Height + 0.3, -10);
    b1Roof.castShadow = true;
    b1Roof.receiveShadow = true;
    group.add(b1Roof);

    // Yellow safety lifeline border
    const p1Geo = new THREE.BoxGeometry(b1Length + 0.8, 0.4, 0.2);
    const p1 = new THREE.Mesh(p1Geo, safetyLineMaterial);
    p1.position.set(-2, b1Height + 0.7, -10 + b1Width / 2);
    group.add(p1);

    const p2Geo = new THREE.BoxGeometry(b1Length + 0.8, 0.4, 0.2);
    const p2 = new THREE.Mesh(p2Geo, safetyLineMaterial);
    p2.position.set(-2, b1Height + 0.7, -10 - b1Width / 2);
    group.add(p2);

    // Elevated central warehouse tier
    const tierL = 60;
    const tierW = 18;
    const tierH = 4.2;
    const tierGeo = new THREE.BoxGeometry(tierL, tierH, tierW);
    const tierMesh = new THREE.Mesh(tierGeo, buildingWallMaterial);
    tierMesh.position.set(-2, b1Height + tierH / 2, -10);
    tierMesh.castShadow = true;
    tierMesh.receiveShadow = true;
    group.add(tierMesh);

    // Tier Roof
    const tierRoofGeo = new THREE.BoxGeometry(tierL + 0.8, 0.4, tierW + 0.8);
    const tierRoof = new THREE.Mesh(tierRoofGeo, roofBlueMaterial);
    tierRoof.position.set(-2, b1Height + tierH + 0.2, -10);
    tierRoof.castShadow = true;
    tierRoof.receiveShadow = true;
    group.add(tierRoof);

    // Solar Photovoltaic Tables on Elevated Tier
    const tierTotalH = b1Height + tierH + 0.4;
    const panelRows = 4;
    const panelsPerRow = 18;
    const panelWidth = 2.4;
    const panelDepth = 1.6;
    const panelThickness = 0.08;

    for (let r = 0; r < panelRows; r++) {
      const rowZ = -10 - 5.5 + r * 3.6;
      for (let p = 0; p < panelsPerRow; p++) {
        const posX = (p - panelsPerRow / 2 + 0.5) * (panelWidth + 0.12) - 2;

        const pFrameGeo = new THREE.BoxGeometry(panelWidth, panelThickness, panelDepth);
        const pFrame = new THREE.Mesh(pFrameGeo, solarFrameMaterial);
        pFrame.position.set(posX, tierTotalH + 0.7, rowZ);
        pFrame.rotation.x = -0.16; // 9-degree south tilt
        pFrame.castShadow = true;
        pFrame.receiveShadow = true;
        group.add(pFrame);

        const cellGeo = new THREE.BoxGeometry(panelWidth - 0.08, 0.04, panelDepth - 0.08);
        const cell = new THREE.Mesh(cellGeo, solarCellMaterial);
        cell.position.set(posX, tierTotalH + 0.76, rowZ);
        cell.rotation.x = -0.16;
        cell.castShadow = true;
        cell.receiveShadow = true;
        group.add(cell);
      }
    }

    // Building 2: Concrete Flat Roof Annex with Parapets and HVAC Obstacles
    const b2Length = 76;
    const b2Width = 12;
    const b2Height = 6.2;

    const b2Body = new THREE.Mesh(new THREE.BoxGeometry(b2Length, b2Height, b2Width), buildingWallMaterial);
    b2Body.position.set(-2, b2Height / 2, 14);
    b2Body.castShadow = true;
    b2Body.receiveShadow = true;
    group.add(b2Body);

    const b2Roof = new THREE.Mesh(new THREE.BoxGeometry(b2Length + 0.8, 0.5, b2Width + 0.8), roofLightMaterial);
    b2Roof.position.set(-2, b2Height + 0.25, 14);
    b2Roof.castShadow = true;
    b2Roof.receiveShadow = true;
    group.add(b2Roof);

    // HVAC Obstacles on Annex Roof
    const hvac1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 2.4), hvacMaterial);
    hvac1.position.set(20, b2Height + 1.2, 15);
    hvac1.castShadow = true;
    hvac1.receiveShadow = true;
    group.add(hvac1);

    const hvac2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 2.4), hvacMaterial);
    hvac2.position.set(25, b2Height + 1.2, 15);
    hvac2.castShadow = true;
    hvac2.receiveShadow = true;
    group.add(hvac2);

    const lDuct = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.6, 1.2), hvacMaterial);
    lDuct.position.set(22, b2Height + 1.3, 11.5);
    lDuct.castShadow = true;
    lDuct.receiveShadow = true;
    group.add(lDuct);

    // Warehouse Shed 3
    const b3Roof = new THREE.Mesh(new THREE.BoxGeometry(78, 4.5, 16), roofBlueMaterial);
    b3Roof.position.set(-2, 2.2, 28);
    b3Roof.rotation.x = 0.05;
    b3Roof.castShadow = true;
    b3Roof.receiveShadow = true;
    group.add(b3Roof);

    // Trees along Perimeter
    const presetTrees = [
      { x: -38, z: -30 }, { x: -36, z: -18 }, { x: -40, z: -4 },
      { x: -38, z: 12 }, { x: -44, z: 24 }, { x: -40, z: 36 },
      { x: 38, z: -28 }, { x: 42, z: -18 }, { x: 40, z: -6 },
      { x: 42, z: 6 }, { x: 39, z: 18 }, { x: 42, z: 30 },
      { x: -28, z: -42 }, { x: 0, z: -44 }, { x: 26, z: -42 },
    ];

    presetTrees.forEach(pos => {
      const trunkH = 2.4;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, trunkH, 6), treeTrunkMaterial);
      trunk.position.set(pos.x, trunkH / 2, pos.z);
      trunk.castShadow = true;
      group.add(trunk);

      const canopy = new THREE.Mesh(new THREE.SphereGeometry(1.9, 7, 6), treeFoliageMaterial);
      canopy.position.set(pos.x, trunkH + 1.4, pos.z);
      canopy.scale.set(1, 1.25, 1);
      canopy.castShadow = true;
      canopy.receiveShadow = true;
      group.add(canopy);
    });
  }, []);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(darkMode ? 0x0f1216 : 0xdde3ea);
    scene.fog = new THREE.FogExp2(darkMode ? 0x0f1216 : 0xdde3ea, 0.005);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 1, 600);
    cameraRef.current = camera;
    updateCameraPosition();

    // 3. Renderer with PCFSoftShadowMap
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, darkMode ? 0.4 : 0.65);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffae8, 1.35);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 280;
    sunLight.shadow.camera.left = -65;
    sunLight.shadow.camera.right = 65;
    sunLight.shadow.camera.top = 65;
    sunLight.shadow.camera.bottom = -65;
    sunLight.shadow.bias = -0.0004;
    sunLight.shadow.radius = 2.5; // Soft shadows
    sunLightRef.current = sunLight;
    scene.add(sunLight);

    // Visible Sun Disk
    const sunSphereGeo = new THREE.SphereGeometry(3.2, 16, 16);
    const sunSphereMat = new THREE.MeshBasicMaterial({ color: 0xffd152 });
    const sunSphere = new THREE.Mesh(sunSphereGeo, sunSphereMat);
    sunSphereRef.current = sunSphere;
    scene.add(sunSphere);

    // 5. Ground Plane
    const groundGeo = new THREE.PlaneGeometry(350, 350);
    const groundMat = new THREE.MeshStandardMaterial({
      color: darkMode ? 0x1a212a : 0xc7d0d9,
      roughness: 0.95,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid Floor Overlay
    const grid = new THREE.GridHelper(300, 60, darkMode ? 0x2a3644 : 0xa4b1bf, darkMode ? 0x1f2732 : 0xbdcad6);
    grid.position.y = 0.02;
    scene.add(grid);

    // 6. Dynamic Model Group
    const dynamicGroup = new THREE.Group();
    dynamicModelGroupRef.current = dynamicGroup;
    scene.add(dynamicGroup);

    // Build the 3D model
    rebuildModels();

    // Render loop
    const animate = () => {
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse drag to orbit in 3D
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cameraSphericalRef.current.theta -= deltaX * 0.008;
      cameraSphericalRef.current.phi = Math.max(
        0.05,
        Math.min(Math.PI * 0.45, cameraSphericalRef.current.phi - deltaY * 0.008)
      );

      updateCameraPosition();
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Mouse Wheel Zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.06;
      cameraSphericalRef.current.radius = Math.max(22, Math.min(150, cameraSphericalRef.current.radius + zoomDelta));
      updateCameraPosition();
      setZoomLevel(Math.round((78 / cameraSphericalRef.current.radius) * 100));
    };

    // Touch handlers for Mobile (Touch Orbit & Pinch-to-Zoom)
    let touchStartDist = 0;
    let isPinching = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isPinching = false;
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isPinching = true;
        isDraggingRef.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPinching && e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.sqrt(dx * dx + dy * dy);
        const diff = touchStartDist - currentDist;
        cameraSphericalRef.current.radius = Math.max(22, Math.min(150, cameraSphericalRef.current.radius + diff * 0.22));
        touchStartDist = currentDist;
        updateCameraPosition();
        setZoomLevel(Math.round((78 / cameraSphericalRef.current.radius) * 100));
      } else if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
        cameraSphericalRef.current.theta -= deltaX * 0.008;
        cameraSphericalRef.current.phi = Math.max(
          0.05,
          Math.min(Math.PI * 0.45, cameraSphericalRef.current.phi - deltaY * 0.008)
        );
        updateCameraPosition();
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      isPinching = false;
    };

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener('mousedown', handleMouseDown);
    canvasEl.addEventListener('wheel', handleWheel, { passive: false });
    canvasEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvasEl.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize observer
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('mousedown', handleMouseDown);
      canvasEl.removeEventListener('wheel', handleWheel);
      canvasEl.removeEventListener('touchstart', handleTouchStart);
      canvasEl.removeEventListener('touchmove', handleTouchMove);
      canvasEl.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
    };
  }, [darkMode, updateCameraPosition, rebuildModels]);

  // Update Sun Directional Light Position dynamically
  useEffect(() => {
    if (!sunLightRef.current || !sunSphereRef.current) return;
    const sunPos = getSunPosition(timeHour, season);
    sunLightRef.current.position.set(sunPos.x, sunPos.y, sunPos.z);
    sunSphereRef.current.position.set(sunPos.x * 0.95, sunPos.y * 0.95, sunPos.z * 0.95);

    // Golden light in morning/evening, bright white at solar noon
    const altRatio = Math.max(0, Math.min(1, sunPos.altitude / 60));
    if (altRatio < 0.25) {
      sunLightRef.current.color.setHex(0xffaa5e);
      sunLightRef.current.intensity = 0.95;
    } else {
      sunLightRef.current.color.setHex(0xfffae8);
      sunLightRef.current.intensity = 1.35;
    }
  }, [timeHour, season, getSunPosition]);

  // Scroll Driven Animation
  useEffect(() => {
    if (!scrollSync) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startTrigger = windowHeight;
      const endTrigger = -rect.height * 0.4;
      const totalDistance = startTrigger - endTrigger;
      const currentProgress = (startTrigger - rect.top) / totalDistance;

      if (currentProgress >= 0 && currentProgress <= 1) {
        const minHour = 8.0;
        const maxHour = 17.5;
        const mappedHour = minHour + currentProgress * (maxHour - minHour);
        setTimeHour(parseFloat(mappedHour.toFixed(2)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollSync]);

  // Auto playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeHour(prev => {
        const next = prev + 0.08;
        if (next > 17.5) return 8.0;
        return parseFloat(next.toFixed(2));
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section 
      id="solar-3d-shadow-analysis"
      ref={sectionRef} 
      className={`py-12 md:py-20 border-b relative overflow-hidden transition-colors ${
        darkMode ? 'bg-[#0f1216] border-[#30363d]' : 'bg-slate-100 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Sun className="h-3.5 w-3.5 text-amber-500 animate-spin-slow" />
              <span>Helio3D™ Shadow & Solar Irradiance Studio</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              3D Rooftop <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">Shadow Analysis</span> & Sun Path Simulation
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We also perform 3D shadow analysis of your building or solar panel installation site so that our clients can get the maximum power output and reduce their risk            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Factory className="h-3.5 w-3.5 text-emerald-400" />
              <span>C&I 250 kWp Industrial Facility Model</span>
            </div>
          </div>
        </div>

        {/* 3D Simulation Canvas Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[460px] max-h-[660px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20 group"
          style={{ cursor: 'grab' }}
        >
          {/* Three.js Canvas */}
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Top-Left Floating Controls / Hint */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {/* Orbit & Wheel Zoom Hint */}
            <div className="hidden sm:inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full text-[10px] font-medium border border-white/10">
              <RotateCw className="h-3 w-3 text-emerald-400" />
              <span>Drag to orbit • Wheel / buttons to zoom</span>
            </div>
          </div>

          {/* Top-Right Control Toolbar: Camera Angle & Dedicated ZOOM Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            
            {/* Dedicated Zoom In / Zoom Out / Reset Controls */}
            <div className="flex items-center bg-black/80 backdrop-blur-md border border-white/15 p-1 rounded-xl shadow-lg">
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/15 active:scale-95 transition"
                title="Zoom In (Scroll Up)"
                aria-label="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <div className="px-2 font-mono text-[10px] font-bold text-emerald-400 border-x border-white/10 select-none">
                {zoomLevel}%
              </div>
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/15 active:scale-95 transition"
                title="Zoom Out (Scroll Down)"
                aria-label="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={handleResetView}
                className="p-1.5 rounded-lg text-gray-300 hover:text-amber-400 hover:bg-white/15 active:scale-95 transition ml-0.5"
                title="Reset View Orientation & Zoom"
                aria-label="Reset View"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Camera Angle Presets */}
            <div className="hidden md:flex items-center gap-1 bg-black/80 backdrop-blur-md border border-white/15 p-1 rounded-xl shadow-lg">
              <button
                onClick={() => handleSetView('drone')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                  cameraView === 'drone' ? 'bg-emerald-500 text-black shadow' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Isometric
              </button>
              <button
                onClick={() => handleSetView('overhead')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                  cameraView === 'overhead' ? 'bg-emerald-500 text-black shadow' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Top-Down
              </button>
              <button
                onClick={() => handleSetView('ground')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                  cameraView === 'ground' ? 'bg-emerald-500 text-black shadow' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Shadow Angle
              </button>
            </div>

          </div>

          {/* BOTTOM CENTER: SEASON PILLS & DATE BADGE (MATCHING USER'S SCREENSHOT) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            
            {/* Season Pill Buttons */}
            <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-2xl">
              {(['Winter', 'Summer', 'Equinox', 'Today'] as Season[]).map(s => {
                const isActive = season === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition duration-200 ${
                      isActive 
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
                        : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Date Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-semibold border border-white/15 shadow-md">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span>{currentSeasonData.dateLabel}</span>
              <span className="text-gray-500">•</span>
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-mono text-emerald-300">{formatTime(timeHour)}</span>
            </div>

          </div>

          {/* Bottom-Right Playback / Scrub controls toggle */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg transition active:scale-95"
              title={isPlaying ? "Pause Sun Movement" : "Play Sun Movement"}
              aria-label={isPlaying ? "Pause Sun Movement" : "Play Sun Movement"}
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
            </button>

            <button
              onClick={() => setScrollSync(!scrollSync)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition ${
                scrollSync
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-black/60 border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Toggle whether scrolling moves the sun"
            >
              <span>Scroll-Sync: {scrollSync ? 'ON' : 'OFF'}</span>
            </button>
          </div>

        </div>

        {/* Time Scrubber Slider Bar */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 ${
          darkMode ? 'bg-black/30 border-gray-800' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-2 shrink-0">
            <Sun className="h-4 w-4 text-amber-500" />
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Time of Day:
            </span>
            <span className="font-mono text-sm font-extrabold text-amber-400 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {formatTime(timeHour)}
            </span>
          </div>

          {/* Interactive Range Slider */}
          <div className="flex-grow w-full flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-400 shrink-0">08:00 AM</span>
            <input
              type="range"
              min={8.0}
              max={17.5}
              step={0.1}
              value={timeHour}
              onChange={(e) => {
                setTimeHour(parseFloat(e.target.value));
                setScrollSync(false);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[10px] font-bold text-gray-400 shrink-0">05:30 PM</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>3D Shadow Certified (PR &gt; 82%)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
