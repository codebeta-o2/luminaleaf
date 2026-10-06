export interface Founder {
  name: string;
  role: string;
  bio: string;
  description?: string;
  imageUrl: string;
  linkedinUrl?: string;
  emailContact?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Industry' | 'Engineering' | 'Policy' | 'Case Study';
  summary: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  category: 'Rooftop' | 'Ground-Mount' | 'Electrical' | 'Site Survey';
  mediaUrl: string;
  thumbnailUrl: string;
  caption: string;
  photoNumber?: number;
  fileName?: string;
  projectName?: string;
  tagline?: string;
}

export interface CommissionedProjectSection {
  projectName: string;
  category: 'Rooftop' | 'Ground-Mount' | 'Electrical' | 'Site Survey';
  items: GalleryItem[];
}

export interface CalculationResult {
  wattage: number; // in Wp
  zoneName: string;
  zoneValue: number;
  mountingName: string;
  mountingValue: number;
  totalCostInr: number;
  breakdown: {
    engineeringAndDesign: number;
    installationLabor: number;
    liaisoningAndApprovals: number;
    scadaAndMonitoring: number;
    maintenanceBuffer: number;
  };
}

export interface LeadInfo {
  name: string;
  email: string;
  message?: string;
}
