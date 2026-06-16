const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const defaultTechStacks = [
  {
    name: "Next.js",
    category: "Frameworks",
    iconKey: "devicon:nextjs",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    sortOrder: 1,
  },
  {
    name: "Nest.js",
    category: "Frameworks",
    iconKey: "devicon:nestjs",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    sortOrder: 2,
  },
  {
    name: "AWS",
    category: "Infrastructure",
    iconKey: "devicon:amazonwebservices-wordmark",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    sortOrder: 3,
  },
  {
    name: "Linux",
    category: "Infrastructure",
    iconKey: "devicon:linux",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    sortOrder: 4,
  },
  {
    name: "Tailwind CSS",
    category: "Frameworks",
    iconKey: "devicon:tailwindcss",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    sortOrder: 5,
  },
  {
    name: "PostgreSQL",
    category: "Programming Language",
    iconKey: "devicon:postgresql",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    sortOrder: 6,
  },
  {
    name: "Python",
    category: "Programming Language",
    iconKey: "devicon:python",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    sortOrder: 7,
  },
  {
    name: "Prisma",
    category: "Frameworks",
    iconKey: "devicon:prisma",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    sortOrder: 8,
  },
  {
    name: "Java",
    category: "Programming Language",
    iconKey: "devicon:java",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    sortOrder: 9,
  },
  {
    name: "Docker",
    category: "Infrastructure",
    iconKey: "devicon:docker",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    sortOrder: 10,
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    iconKey: "devicon:github",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    sortOrder: 11,
  },
  {
    name: "Postman",
    category: "Tools",
    iconKey: "devicon:postman",
    imageUrl:
      "https://res.cloudinary.com/demo/image/fetch/f_png,w_256/https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    sortOrder: 12,
  },
];

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

  await prisma.techStack.deleteMany();
  await prisma.techStack.createMany({ data: defaultTechStacks });

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
