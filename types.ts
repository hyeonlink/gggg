
export type UserRole = 'CLUB' | 'ANGEL' | 'ADMIN';

export interface Club {
  id: string;
  name: string;
  university: 'SNU' | 'YONSEI' | 'KOREA' | 'OTHER';
  category: string;
  description: string;
  longDescription: string;
  logo: string;
  coverImage: string;
  location: string;
  memberCount: number;
  tags: string[];
  projects: Project[];
  angelScore: number;
  totalFunding: number;
  // New verification fields
  activityHistory?: string;
  activityHistoryImage?: string;
  adminRole?: string;
  adminProofUrl?: string;
  verificationStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  imageUrl: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED';
  reports: Report[];
  rewards: Reward[];
}

export interface Report {
  id: string;
  date: string;
  content: string;
  images: string[];
}

export interface Reward {
  id: string;
  title: string;
  minAmount: number;
  description: string;
}

export interface FeedPost {
  id: string;
  clubId: string;
  clubName: string;
  clubLogo: string;
  university: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  type: 'UPDATE' | 'PROJECT_START' | 'REPORT';
  projectId?: string; // 연결된 프로젝트가 있을 경우
}

// Add Post interface for the Community page
export interface Post {
  id: string;
  title: string;
  author: string;
  authorRole: 'ANGEL' | 'CLUB';
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface Sponsor {
  id: string;
  name: string;
  email: string; // 추가됨
  type: 'INDIVIDUAL' | 'CORPORATE';
  description: string;
  interest: string[];
  totalDonated: number;
  logo: string;
  isPartner: boolean;
}
