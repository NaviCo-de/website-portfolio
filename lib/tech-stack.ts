export const TECH_STACK_CATEGORY_VALUES = [
  "Programming Language",
  "Frameworks",
  "Infrastructure",
  "Tools",
] as const;

export type TechStackCategory = (typeof TECH_STACK_CATEGORY_VALUES)[number];

export const TECH_STACK_CATEGORY_DETAILS: Record<
  TechStackCategory,
  { description: string; shortLabel: string }
> = {
  "Programming Language": {
    description:
      "Languages and database systems used across backend, scripts, and data-heavy work.",
    shortLabel: "Language",
  },
  Frameworks: {
    description:
      "Application frameworks and libraries for building product interfaces and APIs.",
    shortLabel: "Framework",
  },
  Infrastructure: {
    description:
      "Cloud, operating system, and container layers that keep apps reliable in production.",
    shortLabel: "Infrastructure",
  },
  Tools: {
    description:
      "Version control, collaboration, and API workflow tools used day to day.",
    shortLabel: "Tool",
  },
};

const CATEGORY_BY_TECH_NAME: Record<string, TechStackCategory> = {
  nextjs: "Frameworks",
  nestjs: "Frameworks",
  tailwindcss: "Frameworks",
  prisma: "Frameworks",
  aws: "Infrastructure",
  linux: "Infrastructure",
  docker: "Infrastructure",
  postgresql: "Programming Language",
  postgres: "Programming Language",
  python: "Programming Language",
  java: "Programming Language",
  gitgithub: "Tools",
  github: "Tools",
  git: "Tools",
  postman: "Tools",
};

function normalizeKey(value?: string | null) {
  return (value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function normalizeTechStackCategory(
  category: string | null | undefined,
  techName?: string | null,
): TechStackCategory {
  const nameCategory = CATEGORY_BY_TECH_NAME[normalizeKey(techName)];

  if (nameCategory) {
    return nameCategory;
  }

  const normalizedCategory = normalizeKey(category);

  if (normalizedCategory.includes("language")) {
    return "Programming Language";
  }

  if (
    normalizedCategory.includes("framework") ||
    normalizedCategory.includes("frontend") ||
    normalizedCategory.includes("backend") ||
    normalizedCategory.includes("datalayer")
  ) {
    return "Frameworks";
  }

  if (
    normalizedCategory.includes("infrastructure") ||
    normalizedCategory.includes("cloud") ||
    normalizedCategory.includes("devops")
  ) {
    return "Infrastructure";
  }

  if (
    normalizedCategory.includes("tool") ||
    normalizedCategory.includes("workflow")
  ) {
    return "Tools";
  }

  return "Tools";
}
