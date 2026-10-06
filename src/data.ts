import { Founder, BlogPost, GalleryItem, CommissionedProjectSection } from './types';
import jayantiBeraImg from './assets/images/Jayanti Bera.jpeg';
import surajitBeraImg from './assets/images/Surajit Bera.jpeg';
import soumenMondalImg from './assets/images/Soumen Mondal.jpeg';
import ranajitKumarBeraImg from './assets/images/Ranajit Kumar Bera.jpeg';

export const leadershipMembers: Founder[] = [
  {
    name: "Mrs. Jayanti Bera",
    role: "Founder & Director",
    bio: "“True success is not measured by what we build for ourselves, but by the opportunities we create for others.”",
    description: "The Founder and Director of LuminaLeaf, Mrs. Jayanti Bera is the inspiration, strength, and guiding force behind the organisation. Her unwavering belief in honesty, compassion, perseverance, and social responsibility gave LuminaLeaf the courage to dream bigger and move forward.\n\nHer vision goes beyond building a successful company—to create opportunities, empower people, support communities, and contribute meaningfully to society. Her values continue to shape LuminaLeaf’s culture and inspire the organisation to grow with purpose, responsibility, and integrity.",
    imageUrl: jayantiBeraImg,
    linkedinUrl: "https://linkedin.com",
    emailContact: "jayanti.bera@luminaleaf.com"
  },
  {
    name: "Surajit Bera",
    role: "Co-Founder & Managing Director",
    bio: "“A sustainable future is not built by vision alone—it is built by the people who turn that vision into reality.”",
    description: "A Civil Engineer with over 11 years of experience in infrastructure development, commercial projects, and commercial & industrial solar, Surajit Bera transformed a part-time entrepreneurial vision into LuminaLeaf, driven by a strong belief in creating a trusted and purpose-led organisation.\n\nAs the heart of LuminaLeaf, he brings together engineering, execution, customer trust, and people with one purpose—to deliver reliable solar solutions that create lasting value. His vision extends beyond business: to build a company where success creates opportunities for others and contributes to a greener future.",
    imageUrl: surajitBeraImg,
    linkedinUrl: "https://www.linkedin.com/in/surajit-bera-luminaleaf?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    emailContact: "connect@luminaleaf.com"
  }
];

export const executives: Founder[] = [
  {
    name: "Soumen Mondal",
    role: "Co-Founder & Director – Engineering",
    bio: "“Clean energy made truly accessible through precision structural engineering and seamless project execution.”",
    description: "A Structural Engineer by profession, Soumen Mondal co-founded LuminaLeaf Energy with a vision to make clean energy accessible through reliable engineering and seamless project execution.\n\nHe oversees engineering design, operations, and technical project delivery, ensuring every rooftop and ground-mounted installation meets the highest structural standards, wind-load resistance safety, and long-term durability.",
    imageUrl: soumenMondalImg,
    linkedinUrl: "https://www.linkedin.com/in/soumen-mondal-501682183?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    emailContact: "soumen@luminaleaf.com"
  },
  {
    name: "Ranajit Kumar Bera",
    role: "Co-founder & Director (Business Development)",
    bio: "“Transforming sustainable ideas into impactful solutions and scalable, high-performance clean energy assets.”",
    description: "Co-Founder of LuminaLeaf with a background in project engineering, Ranajit Kumar Bera is passionate about building innovative and sustainable clean energy solutions, with a sharp focus on operational excellence and strategic planning.\n\nAt LuminaLeaf, he leads strategic initiatives, project execution, and business development, working closely with cross-functional teams to drive innovation, optimize field operations, and deliver scalable turnkey solutions that create lasting economic and ecological value.",
    imageUrl: ranajitKumarBeraImg,
    linkedinUrl: "https://www.linkedin.com/in/ranajit-kumar-bera-0a0511230?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    emailContact: "ranajit.kumar@luminaleaf.com"
  }
];

export const founders: Founder[] = executives;

// Dynamically import all photos from Project Commissioned / Project Comessioned directory
const projectCommissionedModules = import.meta.glob<{ default: string } | string>(
  [
    './assets/Project Commissioned/**/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}',
    './assets/Project Comessioned/**/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}'
  ],
  { eager: true }
);

function determineCategory(
  projectName: string, 
  tagline: string
): 'Rooftop' | 'Ground-Mount' | 'Electrical' | 'Site Survey' {
  const p = projectName.toLowerCase();
  const t = tagline.toLowerCase();

  if (
    p.includes('electrical') ||
    t.includes('panel') ||
    t.includes('inv') ||
    t.includes('acdb') ||
    t.includes('dcdb') ||
    t.includes('busbar') ||
    t.includes('cable') ||
    t.includes('earthing') ||
    t.includes('earthstrip') ||
    t.includes('la installation') ||
    t.includes('switchgear') ||
    t.includes('transformer') ||
    t.includes('insulation test') ||
    t.includes('termination')
  ) {
    return 'Electrical';
  }

  if (
    t.includes('arial') ||
    t.includes('aerial') ||
    t.includes('survey') ||
    t.includes('top-view')
  ) {
    return 'Site Survey';
  }

  if (
    t.includes('ground') ||
    t.includes('pile') ||
    p.includes('gadarwara') ||
    p.includes('teloijan') ||
    p.includes('banas 1.2mw') ||
    p.includes('banas 1mw')
  ) {
    return 'Ground-Mount';
  }

  return 'Rooftop';
}

// Build categorized, project-grouped gallery items
const { allItems, projectSections } = (() => {
  const items: GalleryItem[] = [];
  const sectionsMap = new Map<string, GalleryItem[]>();
  const seenKeys = new Set<string>();

  const entries = Object.entries(projectCommissionedModules);

  entries.forEach(([path, mod], idx) => {
    // path format: ./assets/Project Commissioned/<Project Name>/<Image Name>.jpeg
    const parts = path.split('/');
    const rawFileName = parts.pop() || '';
    const projectName = parts.pop() || 'Commissioned Project';
    const key = `${projectName}:::${rawFileName}`;
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    
    // Tagline is the image name without file extension
    const rawTagline = rawFileName.replace(/\.[^/.]+$/, '').trim();
    const isWhatsApp = rawTagline.toLowerCase().startsWith('whatsapp image') || rawTagline.toLowerCase().startsWith('whatsapp');
    const isRooftoOnly = rawTagline.toLowerCase() === 'rooftop' || rawTagline.toLowerCase() === 'roofto';
    const tagline = (isWhatsApp || isRooftoOnly) ? '' : rawTagline;
    const resolvedUrl = (typeof mod === 'string' ? mod : mod?.default) || `/assets/Project Commissioned/${projectName}/${rawFileName}`;
    const category = determineCategory(projectName, rawTagline);

    const item: GalleryItem = {
      id: `pc-${projectName.replace(/[^a-zA-Z0-9]/g, '-')}-${rawTagline.replace(/[^a-zA-Z0-9]/g, '-')}-${idx}`,
      title: isWhatsApp ? projectName : rawTagline,
      tagline: tagline,
      projectName: projectName,
      type: 'image',
      category: category,
      mediaUrl: resolvedUrl,
      thumbnailUrl: resolvedUrl,
      fileName: rawFileName,
      caption: isWhatsApp || !tagline ? projectName : `${projectName} — ${tagline}`
    };

    items.push(item);

    if (!sectionsMap.has(projectName)) {
      sectionsMap.set(projectName, []);
    }
    sectionsMap.get(projectName)!.push(item);
  });

  // Convert map to ordered sections
  const sections: CommissionedProjectSection[] = Array.from(sectionsMap.entries()).map(([name, pItems]) => {
    // Dominant category for the project
    const catCounts: Record<string, number> = {};
    pItems.forEach(i => {
      catCounts[i.category] = (catCounts[i.category] || 0) + 1;
    });
    const dominantCategory = (Object.keys(catCounts).reduce((a, b) => 
      catCounts[a] > catCounts[b] ? a : b, 'Rooftop'
    )) as 'Rooftop' | 'Ground-Mount' | 'Electrical' | 'Site Survey';

    return {
      projectName: name,
      category: dominantCategory,
      items: pItems
    };
  });

  // Sort sections with landmark projects first
  const priorityOrder = [
    'IIT 2MW, Guwahati',
    'Reliance Madelin 1MW, Daman & Diu',
    'Saraf Foods Roha Dried 2MW, Gujarat',
    'Yoshika Engineering 400KW, Pune Maharashtra',
    'Good Drop Wine 400KW, Nasik Maharashtra',
    'Haldirams Bhurjiwala 1MW, Singur WB',
    'NTPC Kawas 700KW, Gujarat',
    'Amul Banas 1.2MW, Kanpur',
    'Amul Banas 1MW, Varanasi',
    'Amul Banas 500KW, Lucknow',
    'Suzuki Banas 600KW, Palanpur Gujarat',
    'Teloijan Tea Estate 800KW, Assam',
    'NTPC Gadarwara 1MW, MP',
    'Meheta API 420KW, Boisar Maharashtra',
    'Rank Terrace 60KW, Andheri Maharashtra',
    'Electrical & Switchyard Infrastructure'
  ];

  sections.sort((a, b) => {
    const idxA = priorityOrder.indexOf(a.projectName);
    const idxB = priorityOrder.indexOf(b.projectName);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.projectName.localeCompare(b.projectName);
  });

  return { allItems: items, projectSections: sections };
})();

export const galleryItems: GalleryItem[] = allItems;
export const commissionedProjectSections: CommissionedProjectSection[] = projectSections;

export const blogPosts: BlogPost[] = [];


