"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Mail,
  Menu,
  Rocket,
  Send,
  X,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTypewriter } from "@/hooks/useTypewriter";
import type {
  PortfolioData,
  PublicProject,
  PublicSocialLink,
  PublicTechStack,
} from "@/lib/types";
import { cn, formatDateRange } from "@/lib/utils";

const navItems = [
  { href: "#home", label: "Home", sectionId: "home" },
  { href: "#about", label: "About", sectionId: "about" },
  { href: "#experience", label: "Experience", sectionId: "experience" },
  { href: "#tech-stack", label: "Stack", sectionId: "tech-stack" },
  { href: "#projects", label: "Projects", sectionId: "projects" },
  { href: "#contact", label: "Contact", sectionId: "contact" },
];

const cvDownloadUrl =
  "https://drive.google.com/file/d/1fapIQZiLej8iQmQ7fbUb4n-hL03usqVs/view?usp=sharing";

const categoryAccentClasses = [
  "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
  "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  "border-amber-300/35 bg-amber-300/10 text-amber-100",
  "border-rose-300/35 bg-rose-300/10 text-rose-100",
  "border-violet-300/35 bg-violet-300/10 text-violet-100",
];

function categoryAccent(index: number) {
  return categoryAccentClasses[index % categoryAccentClasses.length];
}

function techInitials(name: string) {
  return name
    .split(/\s+|&|\./)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

function SocialIcon({ icon }: { icon: string | null }) {
  const normalized = icon?.toLowerCase();

  if (normalized?.includes("linkedin"))
    return <FaLinkedinIn aria-hidden="true" className="h-5 w-5" />;
  if (normalized?.includes("instagram"))
    return <FaInstagram aria-hidden="true" className="h-5 w-5" />;
  if (normalized?.includes("github"))
    return <FaGithub aria-hidden="true" className="h-5 w-5" />;
  return <ExternalLink aria-hidden="true" className="h-5 w-5" />;
}

function AnimatedSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.getElementById(item.sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="mx-auto max-w-7xl rounded-2xl border border-emerald-200/15 bg-[#050807]/78 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href="#home"
            className="min-w-0 text-sm font-semibold text-slate-50 outline-none transition hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-300"
            onClick={() => setIsOpen(false)}
          >
            Ari Darrell Muljono
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isSection = item.href.startsWith("#");
              const isActive = isSection && activeSection === item.sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-emerald-300/10 hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300",
                    isActive &&
                      "bg-emerald-300/10 text-emerald-100 ring-1 ring-emerald-300/25",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200/15 text-slate-100 transition hover:border-emerald-300/50 hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:hidden"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>

        {isOpen ? (
          <div className="mt-3 grid gap-1 border-t border-emerald-200/10 pt-3 md:hidden">
            {navItems.map((item) => {
              const isSection = item.href.startsWith("#");
              const isActive = isSection && activeSection === item.sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-emerald-300/10 hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300",
                    isActive && "bg-emerald-300/10 text-emerald-100",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        ) : null}
      </nav>
    </header>
  );
}

function TypewriterText({ words }: { words: string[] }) {
  const text = useTypewriter({ words });

  return (
    <span className="inline-flex min-h-9 max-w-full items-center break-words text-emerald-300 sm:min-h-11">
      {text}
      <span
        className="ml-1 h-8 w-px animate-cursor bg-emerald-300 sm:h-10"
        aria-hidden="true"
      />
    </span>
  );
}

function HeroSocials({ socialLinks }: { socialLinks: PublicSocialLink[] }) {
  const positions = [
    "lg:absolute lg:-right-3 lg:top-10",
    "lg:absolute lg:-left-5 lg:top-1/2",
    "lg:absolute lg:bottom-8 lg:right-8",
  ];

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3 lg:mt-0 lg:block">
      {socialLinks.map((link, index) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          aria-label={link.platform}
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-400/20 bg-slate-950/70 text-slate-100 shadow-lg shadow-emerald-950/30 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-emerald-300/70 hover:text-emerald-200 hover:shadow-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-300",
            positions[index % positions.length],
          )}
        >
          <SocialIcon icon={link.icon || link.platform} />
        </a>
      ))}
    </div>
  );
}

function HeroSection({ data }: { data: PortfolioData }) {
  const { profile, socialLinks, settings } = data;

  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:min-h-[92vh] lg:px-10 lg:pb-28 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.14),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(15,118,110,0.18),transparent_30%),linear-gradient(135deg,#050807_0%,#07110D_45%,#050807_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.82fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200">
            <Code2 aria-hidden="true" className="h-4 w-4" />
            Hi, I am
          </p>
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-slate-50 sm:text-6xl lg:mx-0 lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 text-2xl font-semibold text-slate-100 sm:text-3xl">
            I&apos;m a <TypewriterText words={settings.heroRoles} />
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
            {profile.shortIntro}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <Rocket aria-hidden="true" className="h-4 w-4" />
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-400/25 bg-slate-900/70 px-6 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/60 hover:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              Contact Me
            </a>
            <a
              href={cvDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-300/10 px-6 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-300/15 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            className="absolute -inset-6 rounded-[3rem] bg-emerald-400/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative rounded-[2.5rem] border border-emerald-200/20 bg-slate-900/55 p-4 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-950 clip-profile">
              <Image
                src={
                  profile.profileImageUrl || "/images/profile-placeholder.svg"
                }
                alt={(profile.name || "Ari Darrell Muljono") + " profile photo"}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/88 to-transparent p-6"></div>
            </div>
          </div>
          <HeroSocials socialLinks={socialLinks} />
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-7 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-slate-500/25 bg-slate-900/60 text-slate-300 transition hover:border-emerald-300/50 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 md:flex"
      >
        <ArrowDown aria-hidden="true" className="h-5 w-5" />
      </a>
    </section>
  );
}

function AboutSection({ data }: { data: PortfolioData }) {
  return (
    <AnimatedSection id="about" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-400/15 bg-slate-900/60 p-8 shadow-xl shadow-slate-950/40 backdrop-blur md:p-10">
        <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm font-medium text-emerald-200">
          {data.about.subtitle || "Who I Am"}
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-normal text-slate-50 sm:text-4xl">
          {data.about.title}
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
          {data.about.description}
        </p>
      </div>
    </AnimatedSection>
  );
}

function ExperienceSection({ data }: { data: PortfolioData }) {
  return (
    <AnimatedSection id="experience" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              Experience
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-50 sm:text-4xl">
              Organization & Committee Work
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Recent responsibilities across engineering, event technology, and
            student leadership environments.
          </p>
        </div>

        {data.experiences.length === 0 ? (
          <p className="rounded-xl border border-slate-400/15 bg-slate-900/60 p-6 text-slate-400">
            No experiences added yet.
          </p>
        ) : (
          <div className="relative">
            <div
              className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-emerald-300 via-slate-600 to-transparent md:left-1/2"
              aria-hidden="true"
            />
            <div className="space-y-8">
              {data.experiences.map((experience, index) => (
                <motion.article
                  key={experience.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.05, 0.2),
                  }}
                  className={cn(
                    "relative grid gap-5 pl-12 md:grid-cols-2 md:pl-0",
                    index % 2 === 0 ? "md:text-right" : "md:text-left",
                  )}
                >
                  <span className="absolute left-0 top-7 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/40 bg-slate-950 text-emerald-200 md:left-1/2 md:-translate-x-1/2">
                    <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div
                    className={cn(
                      index % 2 === 0 ? "md:pr-10" : "md:col-start-2 md:pl-10",
                    )}
                  >
                    <div className="rounded-2xl border border-slate-400/15 bg-slate-900/70 p-6 text-left shadow-lg shadow-slate-950/35 transition hover:-translate-y-1 hover:border-emerald-300/40">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-slate-50">
                          {experience.position}
                        </h3>
                        {experience.isPresent ? (
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                            Present
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 font-medium text-emerald-200">
                        {experience.organization}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatDateRange(
                          experience.startDate,
                          experience.endDate,
                          experience.isPresent,
                        )}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

function TechStackSection({ data }: { data: PortfolioData }) {
  const techStacks = data.techStacks;
  const groupedTechStacks = useMemo(() => {
    const groups = new Map<string, PublicTechStack[]>();

    for (const tech of techStacks) {
      const current = groups.get(tech.category) ?? [];
      current.push(tech);
      groups.set(tech.category, current);
    }

    return Array.from(groups.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }, [techStacks]);

  return (
    <AnimatedSection id="tech-stack" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              Tech Stack
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-50 sm:text-4xl">
              Tools I Use to Ship Products
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            A categorized view of the frameworks, platforms, languages, and
            delivery tools behind my engineering workflow.
          </p>
        </div>

        {techStacks.length === 0 ? (
          <p className="rounded-xl border border-slate-400/15 bg-slate-900/60 p-6 text-slate-400">
            No tech stack entries added yet.
          </p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="rounded-2xl border border-slate-400/15 bg-slate-900/55 p-6 shadow-xl shadow-slate-950/35 backdrop-blur">
              <div className="flex items-end justify-between gap-4 border-b border-slate-500/15 pb-5">
                <div>
                  <p className="text-sm text-slate-400">Current toolkit</p>
                  <p className="mt-2 text-4xl font-semibold text-slate-50">
                    {techStacks.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Categories</p>
                  <p className="mt-2 text-4xl font-semibold text-emerald-200">
                    {groupedTechStacks.length}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {groupedTechStacks.map((group, index) => (
                  <div key={group.category}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold",
                          categoryAccent(index),
                        )}
                      >
                        {group.category}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {String(group.items.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-emerald-300"
                        style={{
                          width:
                            String(
                              Math.max(
                                18,
                                (group.items.length / techStacks.length) * 100,
                              ),
                            ) + "%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {groupedTechStacks.map((group, groupIndex) => (
                <div key={group.category}>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-50">
                      {group.category}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        categoryAccent(groupIndex),
                      )}
                    >
                      {group.items.length} tools
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((tech, index) => (
                      <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                          duration: 0.42,
                          delay: Math.min(index * 0.04, 0.18),
                        }}
                        className="group relative min-h-28 overflow-hidden rounded-2xl border border-slate-400/15 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/25 transition hover:-translate-y-1 hover:border-emerald-300/45 hover:bg-slate-900"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-500/15 bg-slate-950/75">
                            {tech.imageUrl ? (
                              <Image
                                src={tech.imageUrl}
                                alt={tech.name + " logo"}
                                width={42}
                                height={42}
                                sizes="42px"
                                className="max-h-11 w-auto object-contain transition group-hover:scale-110"
                              />
                            ) : (
                              <span className="text-sm font-semibold text-emerald-200">
                                {techInitials(tech.name)}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-base font-semibold text-slate-50">
                              {tech.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {group.category}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

function ProjectPreview({
  project,
  side,
  onClick,
}: {
  project: PublicProject;
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={"Show " + project.title}
      onClick={onClick}
      className={cn(
        "absolute top-12 z-0 hidden h-[24rem] w-[21rem] overflow-hidden rounded-2xl border border-slate-400/15 bg-slate-900 text-left opacity-30 shadow-xl shadow-slate-950/30 transition duration-300 hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 lg:block",
        side === "left"
          ? "left-0 -translate-x-64 xl:-translate-x-72"
          : "right-0 translate-x-64 xl:translate-x-72",
      )}
    >
      <div className="relative h-full">
        <Image
          src={project.thumbnailUrl || "/images/project-portfolio.svg"}
          alt={project.title + " preview"}
          fill
          sizes="23rem"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div
          className={cn(
            "absolute inset-y-0 w-20 bg-gradient-to-r from-[#050807] to-transparent",
            side === "right" && "right-0 rotate-180",
          )}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-sm font-semibold text-slate-100">
            {project.title}
          </p>
          <p className="mt-1 text-xs text-slate-400">Preview</p>
        </div>
      </div>
    </button>
  );
}

function ActiveProjectCard({
  project,
  direction,
  reducedMotion,
}: {
  project: PublicProject;
  direction: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : { opacity: 0, x: direction > 0 ? 48 : -48, scale: 0.98 }
      }
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 0, x: direction > 0 ? -48 : 48, scale: 0.98 }
      }
      transition={{ duration: 0.38, ease: "easeOut" }}
      className="relative z-10 mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-400/15 bg-slate-900 shadow-2xl shadow-slate-950/40 md:grid-cols-[1.08fr_0.92fr]"
    >
      <div className="relative aspect-[16/10] min-h-64 bg-slate-950 md:aspect-auto md:min-h-[25rem]">
        <Image
          src={project.thumbnailUrl || "/images/project-portfolio.svg"}
          alt={project.title + " preview"}
          fill
          sizes="(min-width: 1024px) 34rem, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex min-h-[25rem] flex-col p-6 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase text-emerald-300">
            Featured Project
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-50">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-500/20 bg-slate-950/70 px-3 py-1 text-xs text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-50 px-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <FaGithub aria-hidden="true" className="h-4 w-4" />
            View GitHub
          </a>
          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-400/25 px-4 text-sm font-semibold text-slate-100 transition hover:border-emerald-300/50 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCarousel({ projects }: { projects: PublicProject[] }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectDirection, setProjectDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const projectCount = projects.length;
  const safeActiveProjectIndex =
    projectCount > 0 ? Math.min(activeProjectIndex, projectCount - 1) : 0;

  if (projectCount === 0) {
    return null;
  }

  const activeProject = projects[safeActiveProjectIndex]!;
  const previousProjectIndex =
    (safeActiveProjectIndex - 1 + projectCount) % projectCount;
  const nextProjectIndex = (safeActiveProjectIndex + 1) % projectCount;
  const previousProject = projects[previousProjectIndex] ?? activeProject;
  const nextProject = projects[nextProjectIndex] ?? activeProject;
  const hasMultipleProjects = projectCount > 1;

  function goToPreviousProject() {
    setProjectDirection(-1);
    setActiveProjectIndex(previousProjectIndex);
  }

  function goToNextProject() {
    setProjectDirection(1);
    setActiveProjectIndex(nextProjectIndex);
  }

  function goToProject(index: number) {
    if (index === safeActiveProjectIndex) {
      return;
    }

    setProjectDirection(index > safeActiveProjectIndex ? 1 : -1);
    setActiveProjectIndex(index);
  }

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden py-2 lg:px-14">
      <div className="relative min-h-[35rem] py-4 lg:min-h-[29rem]">
        {hasMultipleProjects ? (
          <>
            <ProjectPreview
              project={previousProject}
              side="left"
              onClick={goToPreviousProject}
            />
            <ProjectPreview
              project={nextProject}
              side="right"
              onClick={goToNextProject}
            />
          </>
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          <ActiveProjectCard
            key={activeProject.id}
            project={activeProject}
            direction={projectDirection}
            reducedMotion={Boolean(reducedMotion)}
          />
        </AnimatePresence>

        {hasMultipleProjects ? (
          <>
            <button
              type="button"
              aria-label="Show previous project"
              onClick={goToPreviousProject}
              className="absolute left-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-400/20 bg-slate-950/80 text-slate-100 shadow-lg shadow-slate-950/35 backdrop-blur transition hover:border-emerald-300/60 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 lg:left-0"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Show next project"
              onClick={goToNextProject}
              className="absolute right-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-400/20 bg-slate-950/80 text-slate-100 shadow-lg shadow-slate-950/35 backdrop-blur transition hover:border-emerald-300/60 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 lg:right-0"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {hasMultipleProjects ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          {projects.map((project, index) => {
            const isActive = index === safeActiveProjectIndex;

            return (
              <button
                key={project.id}
                type="button"
                aria-label={"Show " + project.title}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goToProject(index)}
                className={cn(
                  "h-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950",
                  isActive
                    ? "w-8 bg-emerald-300"
                    : "w-2.5 bg-slate-600 hover:bg-slate-400",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ProjectsSection({ data }: { data: PortfolioData }) {
  const projects = data.projects;

  return (
    <AnimatedSection id="projects" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              Projects
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-50 sm:text-4xl">
              Selected Engineering Work
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Featured projects with repository links and stack context.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="rounded-xl border border-slate-400/15 bg-slate-900/60 p-6 text-slate-400">
            No projects available yet.
          </p>
        ) : (
          <ProjectCarousel projects={projects} />
        )}
      </div>
    </AnimatedSection>
  );
}
function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const content = String(formData.get("message") || "").trim();
    const website = String(formData.get("website") || "");

    if (!email || !subject || !content || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Failed to send message. Please try again.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message: content, website }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message.");
      }

      setStatus("success");
      setMessage(result.message || "Message sent successfully.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Failed to send message. Please try again.");
    }
  }

  return (
    <AnimatedSection id="contact" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">
            Contact
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-50 sm:text-4xl">
            Send Me a Message
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Project inquiry, collaboration note, or technical discussion.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-400/15 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/35 md:p-8"
        >
          <input
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            name="website"
            aria-hidden="true"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-200">
              Email pengirim
              <input
                name="email"
                type="email"
                required
                className="mt-2 h-12 w-full rounded-xl border border-slate-500/25 bg-slate-950/70 px-4 text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/25"
                placeholder="sender@example.com"
              />
            </label>
            <label className="block text-sm font-medium text-slate-200">
              Subjek
              <input
                name="subject"
                required
                className="mt-2 h-12 w-full rounded-xl border border-slate-500/25 bg-slate-950/70 px-4 text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/25"
                placeholder="Project Inquiry"
              />
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium text-slate-200">
            Isi pesan
            <textarea
              name="message"
              required
              rows={6}
              className="mt-2 w-full resize-y rounded-xl border border-slate-500/25 bg-slate-950/70 px-4 py-3 text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/25"
              placeholder="Hello, I would like to discuss a project."
            />
          </label>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <Send aria-hidden="true" className="h-4 w-4" />
              {status === "loading" ? "Sending..." : "Send"}
            </button>
            {message ? (
              <p
                className={cn(
                  "text-sm",
                  status === "success" ? "text-emerald-300" : "text-red-300",
                )}
                role="status"
              >
                {message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </AnimatedSection>
  );
}

function Footer({ data }: { data: PortfolioData }) {
  return (
    <footer className="border-t border-slate-400/10 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {data.profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {data.socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.platform}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-400/15 text-slate-300 transition hover:border-emerald-300/50 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <SocialIcon icon={link.icon || link.platform} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function PortfolioHome({ data }: { data: PortfolioData }) {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050807] text-slate-50">
      <Navbar />
      <HeroSection data={data} />
      <AboutSection data={data} />
      <ExperienceSection data={data} />
      <TechStackSection data={data} />
      <ProjectsSection data={data} />
      <ContactSection />
      <Footer data={data} />
    </main>
  );
}
