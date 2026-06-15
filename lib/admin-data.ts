import type {
  About,
  ContactMessage,
  Experience,
  Profile,
  Project,
  SiteSetting,
  SocialLink,
} from "@prisma/client";
import { fallbackPortfolioData } from "@/lib/fallback-data";
import { prisma } from "@/lib/prisma";

type AdminDashboardData = {
  experiences: number;
  projects: number;
  socialLinks: number;
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
      messages,
      latestMessage,
      latestSettings,
    ] = await Promise.all([
      prisma.experience.count(),
      prisma.project.count(),
      prisma.socialLink.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.findFirst({ orderBy: { createdAt: "desc" } }),
      prisma.siteSetting.findFirst({ orderBy: { updatedAt: "desc" } }),
    ]);

    return {
      experiences,
      projects,
      socialLinks,
      messages,
      latestMessage,
      latestSettings,
    };
  } catch {
    return {
      experiences: 0,
      projects: 0,
      socialLinks: 0,
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
