import type { PortfolioData } from "@/lib/types";

export const fallbackPortfolioData: PortfolioData = {
  profile: {
    name: "Ari Darrell Muljono",
    headline: "Fullstack Engineer",
    shortIntro:
      "I build reliable, scalable, and user-focused digital products through clean code, efficient architecture, and modern engineering practices.",
    profileImageUrl: "/images/profile-placeholder.svg",
    cvUrl: null,
    ownerEmail: "ari@example.com",
  },
  about: {
    title: "About Me",
    subtitle: "Who I Am",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis. Nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus.",
  },
  experiences: [
    {
      id: "fallback-experience-1",
      position: "Fullstack Developer",
      organization: "Student Technology Organization",
      location: null,
      startDate: "2025-01-01T00:00:00.000Z",
      endDate: null,
      isPresent: true,
      description:
        "Responsible for developing internal systems, maintaining web-based platforms, and supporting digital transformation initiatives within the organization.",
    },
    {
      id: "fallback-experience-2",
      position: "Event Technology Coordinator",
      organization: "Campus Innovation Event",
      location: null,
      startDate: "2024-03-01T00:00:00.000Z",
      endDate: "2024-12-31T00:00:00.000Z",
      isPresent: false,
      description:
        "Managed technical preparation, coordinated digital registration systems, and ensured smooth technology operations during the event.",
    },
    {
      id: "fallback-experience-3",
      position: "Committee Member",
      organization: "Student Leadership Program",
      location: null,
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2024-02-29T00:00:00.000Z",
      isPresent: false,
      description:
        "Supported program planning, participant coordination, and documentation for organizational activities.",
    },
  ],
  projects: [
    {
      id: "fallback-project-1",
      title: "Personal Portfolio Website",
      description:
        "A modern portfolio website built with Next.js, PostgreSQL, Tailwind CSS, and Framer Motion.",
      thumbnailUrl: "/images/project-portfolio.svg",
      githubUrl: "https://github.com/example/portfolio",
      liveDemoUrl: "https://example.com",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    },
    {
      id: "fallback-project-2",
      title: "Task Management App",
      description:
        "A productivity app for managing tasks, deadlines, and project collaboration.",
      thumbnailUrl: "/images/project-task.svg",
      githubUrl: "https://github.com/example/task-management",
      liveDemoUrl: null,
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    },
    {
      id: "fallback-project-3",
      title: "DevOps Deployment Dashboard",
      description:
        "A dashboard for monitoring deployments, server status, and CI/CD workflow activity.",
      thumbnailUrl: "/images/project-devops.svg",
      githubUrl: "https://github.com/example/devops-dashboard",
      liveDemoUrl: null,
      techStack: ["Next.js", "Docker", "PostgreSQL", "API"],
    },
    {
      id: "fallback-project-4",
      title: "Product Analytics Platform",
      description:
        "A simple analytics platform to track product usage, user activity, and engagement metrics.",
      thumbnailUrl: "/images/project-analytics.svg",
      githubUrl: "https://github.com/example/product-analytics",
      liveDemoUrl: null,
      techStack: ["Next.js", "PostgreSQL", "Chart.js", "Tailwind CSS"],
    },
  ],
  socialLinks: [
    {
      id: "fallback-social-linkedin",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/ari-darrell-muljono",
      icon: "linkedin",
    },
    {
      id: "fallback-social-instagram",
      platform: "Instagram",
      url: "https://instagram.com/ari.darrell",
      icon: "instagram",
    },
    {
      id: "fallback-social-github",
      platform: "GitHub",
      url: "https://github.com/aridarrell",
      icon: "github",
    },
  ],
  techStacks: [
    {
      id: "fallback-tech-next",
      name: "Next.js",
      category: "Frameworks",
      iconKey: "devicon:nextjs",
      imageUrl: null,
    },
    {
      id: "fallback-tech-nest",
      name: "Nest.js",
      category: "Frameworks",
      iconKey: "devicon:nestjs",
      imageUrl: null,
    },
    {
      id: "fallback-tech-aws",
      name: "AWS",
      category: "Infrastructure",
      iconKey: "devicon:amazonwebservices-wordmark",
      imageUrl: null,
    },
    {
      id: "fallback-tech-linux",
      name: "Linux",
      category: "Infrastructure",
      iconKey: "devicon:linux",
      imageUrl: null,
    },
    {
      id: "fallback-tech-tailwind",
      name: "Tailwind CSS",
      category: "Frameworks",
      iconKey: "devicon:tailwindcss",
      imageUrl: null,
    },
    {
      id: "fallback-tech-postgresql",
      name: "PostgreSQL",
      category: "Programming Language",
      iconKey: "devicon:postgresql",
      imageUrl: null,
    },
    {
      id: "fallback-tech-python",
      name: "Python",
      category: "Programming Language",
      iconKey: "devicon:python",
      imageUrl: null,
    },
    {
      id: "fallback-tech-prisma",
      name: "Prisma",
      category: "Frameworks",
      iconKey: "devicon:prisma",
      imageUrl: null,
    },
    {
      id: "fallback-tech-java",
      name: "Java",
      category: "Programming Language",
      iconKey: "devicon:java",
      imageUrl: null,
    },
    {
      id: "fallback-tech-docker",
      name: "Docker",
      category: "Infrastructure",
      iconKey: "devicon:docker",
      imageUrl: null,
    },
    {
      id: "fallback-tech-git",
      name: "Git & GitHub",
      category: "Tools",
      iconKey: "devicon:github",
      imageUrl: null,
    },
    {
      id: "fallback-tech-postman",
      name: "Postman",
      category: "Tools",
      iconKey: "devicon:postman",
      imageUrl: null,
    },
  ],
  settings: {
    siteTitle: "Ari Darrell Muljono | Fullstack Engineer Portfolio",
    metaDescription:
      "Professional portfolio website of Ari Darrell Muljono, showcasing experience, projects, and engineering expertise.",
    ownerEmail: "ari@example.com",
    heroRoles: ["Fullstack Engineer", "DevOps Engineer", "Product Engineer"],
    primaryColor: "#6EE7B7",
    seoTitle: "Ari Darrell Muljono | Fullstack Engineer Portfolio",
    seoDescription:
      "Professional portfolio website of Ari Darrell Muljono, showcasing experience, projects, and engineering expertise.",
  },
};
