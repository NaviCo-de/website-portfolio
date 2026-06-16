export type PublicProfile = {
  name: string;
  headline: string | null;
  shortIntro: string | null;
  profileImageUrl: string | null;
  cvUrl: string | null;
  ownerEmail: string | null;
};

export type PublicAbout = {
  title: string;
  subtitle: string | null;
  description: string;
};

export type PublicExperience = {
  id: string;
  position: string;
  organization: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  isPresent: boolean;
  description: string;
};

export type PublicProject = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  githubUrl: string;
  liveDemoUrl: string | null;
  techStack: string[];
};

export type PublicSocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
};

export type PublicTechStack = {
  id: string;
  name: string;
  category: string;
  imageUrl: string | null;
};

export type PublicSettings = {
  siteTitle: string;
  metaDescription: string | null;
  ownerEmail: string | null;
  heroRoles: string[];
  primaryColor: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type PortfolioData = {
  profile: PublicProfile;
  about: PublicAbout;
  experiences: PublicExperience[];
  projects: PublicProject[];
  socialLinks: PublicSocialLink[];
  techStacks: PublicTechStack[];
  settings: PublicSettings;
};

export type AdminSession = {
  userId: string;
  email: string;
  name: string | null;
  role: "admin";
};
