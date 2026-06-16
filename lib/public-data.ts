import { fallbackPortfolioData } from "@/lib/fallback-data";
import { prisma } from "@/lib/prisma";
import type { PortfolioData } from "@/lib/types";

export async function getPublicPortfolioData(): Promise<PortfolioData> {
  try {
    const [
      profile,
      about,
      experiences,
      projects,
      socialLinks,
      techStacks,
      settings,
    ] = await Promise.all([
      prisma.profile.findFirst({ orderBy: { updatedAt: "desc" } }),
      prisma.about.findFirst({ orderBy: { updatedAt: "desc" } }),
      prisma.experience.findMany({
        orderBy: [{ startDate: "desc" }, { createdAt: "desc" }],
      }),
      prisma.project.findMany({
        where: { isFeatured: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
      prisma.socialLink.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
      prisma.techStack.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      }),
      prisma.siteSetting.findFirst({ orderBy: { updatedAt: "desc" } }),
    ]);

    return {
      profile: profile
        ? {
            name: profile.name,
            headline: profile.headline,
            shortIntro: profile.shortIntro,
            profileImageUrl: profile.profileImageUrl,
            cvUrl: profile.cvUrl,
            ownerEmail: profile.ownerEmail,
          }
        : fallbackPortfolioData.profile,
      about: about
        ? {
            title: about.title,
            subtitle: about.subtitle,
            description: about.description,
          }
        : fallbackPortfolioData.about,
      experiences:
        experiences.length > 0
          ? experiences.map((experience) => ({
              id: experience.id,
              position: experience.position,
              organization: experience.organization,
              location: experience.location,
              startDate: experience.startDate.toISOString(),
              endDate: experience.endDate?.toISOString() ?? null,
              isPresent: experience.isPresent,
              description: experience.description,
            }))
          : fallbackPortfolioData.experiences,
      projects:
        projects.length > 0
          ? projects.map((project) => ({
              id: project.id,
              title: project.title,
              description: project.description,
              thumbnailUrl: project.thumbnailUrl,
              githubUrl: project.githubUrl,
              liveDemoUrl: project.liveDemoUrl,
              techStack: project.techStack,
            }))
          : fallbackPortfolioData.projects,
      socialLinks:
        socialLinks.length > 0
          ? socialLinks.map((socialLink) => ({
              id: socialLink.id,
              platform: socialLink.platform,
              url: socialLink.url,
              icon: socialLink.icon,
            }))
          : fallbackPortfolioData.socialLinks,
      techStacks:
        techStacks.length > 0
          ? techStacks.map((techStack) => ({
              id: techStack.id,
              name: techStack.name,
              category: techStack.category,
              imageUrl: techStack.imageUrl,
            }))
          : fallbackPortfolioData.techStacks,
      settings: settings
        ? {
            siteTitle: settings.siteTitle,
            metaDescription: settings.metaDescription,
            ownerEmail: settings.ownerEmail,
            heroRoles:
              settings.heroRoles.length > 0
                ? settings.heroRoles
                : fallbackPortfolioData.settings.heroRoles,
            primaryColor: settings.primaryColor,
            seoTitle: settings.seoTitle,
            seoDescription: settings.seoDescription,
          }
        : fallbackPortfolioData.settings,
    };
  } catch {
    return fallbackPortfolioData;
  }
}
