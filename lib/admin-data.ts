import { fallbackPortfolioData } from "@/lib/fallback-data";
import { prisma } from "@/lib/prisma";

type Profile = {
  id: string;
  name: string;
  headline: string | null;
  shortIntro: string | null;
  profileImageUrl: string | null;
  cvUrl: string | null;
  ownerEmail: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type About = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

type Experience = {
  id: string;
  position: string;
  organization: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  isPresent: boolean;
  description: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type Project = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  githubUrl: string;
  liveDemoUrl: string | null;
  techStack: string[];
  isFeatured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type TechStack = {
  id: string;
  name: string;
  category: string;
  iconKey: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type ContactMessage = {
  id: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  ipAddress: string | null;
  createdAt: Date;
};

type SiteSetting = {
  id: string;
  siteTitle: string;
  metaDescription: string | null;
  ownerEmail: string | null;
  heroRoles: string[];
  primaryColor: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type AdminDashboardData = {
  experiences: number;
  projects: number;
  socialLinks: number;
  techStacks: number;
  messages: number;
  latestMessage: ContactMessage | null;
  latestSettings: SiteSetting | null;
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  try {
    const [
      experiences,
      projects,
      socialLinks,
      techStacks,
      messages,
      latestMessage,
      latestSettings,
    ] = await Promise.all([
      prisma.experience.count(),
      prisma.project.count(),
      prisma.socialLink.count(),
      prisma.techStack.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.findFirst({ orderBy: { createdAt: "desc" } }),
      prisma.siteSetting.findFirst({ orderBy: { updatedAt: "desc" } }),
    ]);

    return {
      experiences,
      projects,
      socialLinks,
      techStacks,
      messages,
      latestMessage,
      latestSettings,
    };
  } catch {
    return {
      experiences: 0,
      projects: 0,
      socialLinks: 0,
      techStacks: 0,
      messages: 0,
      latestMessage: null,
      latestSettings: null,
    };
  }
}

export async function getProfileForAdmin(): Promise<Profile | null> {
  return prisma.profile
    .findFirst({ orderBy: { updatedAt: "desc" } })
    .catch(() => null);
}

export async function getAboutForAdmin(): Promise<About | null> {
  return prisma.about
    .findFirst({ orderBy: { updatedAt: "desc" } })
    .catch(() => null);
}

export async function getSettingsForAdmin(): Promise<SiteSetting | null> {
  return prisma.siteSetting
    .findFirst({ orderBy: { updatedAt: "desc" } })
    .catch(() => null);
}

export async function getExperiencesForAdmin(): Promise<Experience[]> {
  return prisma.experience
    .findMany({ orderBy: [{ startDate: "desc" }, { createdAt: "desc" }] })
    .catch(() => []);
}

export async function getProjectsForAdmin(): Promise<Project[]> {
  return prisma.project
    .findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] })
    .catch(() => []);
}

export async function getSocialLinksForAdmin(): Promise<SocialLink[]> {
  return prisma.socialLink
    .findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] })
    .catch(() => []);
}

export async function getTechStacksForAdmin(): Promise<TechStack[]> {
  return prisma.techStack
    .findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] })
    .catch(() => []);
}

export async function getMessagesForAdmin(): Promise<ContactMessage[]> {
  return prisma.contactMessage
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);
}

export function getFallbackProfileForForm() {
  return fallbackPortfolioData.profile;
}

export function getFallbackAboutForForm() {
  return fallbackPortfolioData.about;
}

export function getFallbackSettingsForForm() {
  return fallbackPortfolioData.settings;
}
