const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = (
    process.env.ADMIN_EMAIL || "admin@example.com"
  ).toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "change-this-password";
  const ownerEmail = process.env.OWNER_EMAIL || "ari@example.com";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword, name: "Portfolio Admin" },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Portfolio Admin",
    },
  });

  const profile = await prisma.profile.findFirst();
  const profileData = {
    name: "Ari Darrell Muljono",
    headline: "Fullstack Engineer",
    shortIntro:
      "I build reliable, scalable, and user-focused digital products through clean code, efficient architecture, and modern engineering practices.",
    profileImageUrl: "/images/profile-placeholder.svg",
    ownerEmail,
  };
  if (profile)
    await prisma.profile.update({
      where: { id: profile.id },
      data: profileData,
    });
  else await prisma.profile.create({ data: profileData });

  const about = await prisma.about.findFirst();
  const aboutData = {
    title: "About Me",
    subtitle: "Who I Am",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis. Nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus.",
  };
  if (about)
    await prisma.about.update({ where: { id: about.id }, data: aboutData });
  else await prisma.about.create({ data: aboutData });

  const settings = await prisma.siteSetting.findFirst();
  const settingsData = {
    siteTitle: "Ari Darrell Muljono | Fullstack Engineer Portfolio",
    metaDescription:
      "Professional portfolio website of Ari Darrell Muljono, showcasing experience, projects, and engineering expertise.",
    ownerEmail,
    heroRoles: ["Fullstack Engineer", "DevOps Engineer", "Product Engineer"],
    primaryColor: "#6EE7B7",
    seoTitle: "Ari Darrell Muljono | Fullstack Engineer Portfolio",
    seoDescription:
      "Professional portfolio website of Ari Darrell Muljono, showcasing experience, projects, and engineering expertise.",
  };
  if (settings)
    await prisma.siteSetting.update({
      where: { id: settings.id },
      data: settingsData,
    });
  else await prisma.siteSetting.create({ data: settingsData });

  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/ari-darrell-muljono",
        icon: "linkedin",
        sortOrder: 1,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/ari.darrell",
        icon: "instagram",
        sortOrder: 2,
      },
      {
        platform: "GitHub",
        url: "https://github.com/aridarrell",
        icon: "github",
        sortOrder: 3,
      },
    ],
  });

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        position: "Fullstack Developer",
        organization: "Student Technology Organization",
        startDate: new Date("2025-01-01T00:00:00.000Z"),
        isPresent: true,
        description:
          "Responsible for developing internal systems, maintaining web-based platforms, and supporting digital transformation initiatives within the organization.",
        sortOrder: 1,
      },
      {
        position: "Event Technology Coordinator",
        organization: "Campus Innovation Event",
        startDate: new Date("2024-03-01T00:00:00.000Z"),
        endDate: new Date("2024-12-31T00:00:00.000Z"),
        description:
          "Managed technical preparation, coordinated digital registration systems, and ensured smooth technology operations during the event.",
        sortOrder: 2,
      },
      {
        position: "Committee Member",
        organization: "Student Leadership Program",
        startDate: new Date("2024-01-01T00:00:00.000Z"),
        endDate: new Date("2024-02-29T00:00:00.000Z"),
        description:
          "Supported program planning, participant coordination, and documentation for organizational activities.",
        sortOrder: 3,
      },
    ],
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Personal Portfolio Website",
        description:
          "A modern portfolio website built with Next.js, PostgreSQL, Tailwind CSS, and Framer Motion.",
        thumbnailUrl: "/images/project-portfolio.svg",
        githubUrl: "https://github.com/example/portfolio",
        liveDemoUrl: "https://example.com",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
        sortOrder: 1,
      },
      {
        title: "Task Management App",
        description:
          "A productivity app for managing tasks, deadlines, and project collaboration.",
        thumbnailUrl: "/images/project-task.svg",
        githubUrl: "https://github.com/example/task-management",
        techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
        sortOrder: 2,
      },
      {
        title: "DevOps Deployment Dashboard",
        description:
          "A dashboard for monitoring deployments, server status, and CI/CD workflow activity.",
        thumbnailUrl: "/images/project-devops.svg",
        githubUrl: "https://github.com/example/devops-dashboard",
        techStack: ["Next.js", "Docker", "PostgreSQL", "API"],
        sortOrder: 3,
      },
      {
        title: "Product Analytics Platform",
        description:
          "A simple analytics platform to track product usage, user activity, and engagement metrics.",
        thumbnailUrl: "/images/project-analytics.svg",
        githubUrl: "https://github.com/example/product-analytics",
        techStack: ["Next.js", "PostgreSQL", "Chart.js", "Tailwind CSS"],
        sortOrder: 4,
      },
    ],
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
