"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Code2,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Menu,
  LogOut,
  Settings,
  Share2,
  Sparkles,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import type { AdminSession } from "@/lib/types";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero Profile", icon: UserRound },
  { href: "/admin/about", label: "About", icon: Sparkles },
  { href: "/admin/experiences", label: "Experiences", icon: WalletCards },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/tech-stack", label: "Tech Stack", icon: Code2 },
  { href: "/admin/socials", label: "Social Links", icon: Share2 },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AdminSession;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="border-b border-slate-400/10 bg-slate-950/95 px-5 py-5 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-300 text-slate-950">
              <Sparkles aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-50">
                Portfolio Admin
              </p>
              <p className="truncate text-xs text-slate-400">{session.email}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label={
              isOpen ? "Close admin navigation" : "Open admin navigation"
            }
            aria-expanded={isOpen}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-200/20 text-slate-100 transition hover:border-emerald-300/50 hover:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-300 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav
          className={[
            "mt-5 gap-2 pb-2 lg:block lg:space-y-1 lg:pb-0",
            isOpen ? "grid" : "hidden",
          ].join(" ")}
          aria-label="Admin navigation"
        >
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 lg:flex"
                onClick={() => setIsOpen(false)}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form
          action="/api/auth/logout"
          method="post"
          className={["mt-4", isOpen ? "block" : "hidden", "lg:block"].join(
            " ",
          )}
        >
          <button className="inline-flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-950/30 focus:outline-none focus:ring-2 focus:ring-red-300">
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Logout
          </button>
        </form>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-10 border-b border-slate-400/10 bg-slate-950/85 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Ari Darrell Muljono</p>
              <h1 className="text-xl font-semibold text-slate-50">
                Portfolio Control Center
              </h1>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-emerald-200 hover:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              View Site
            </Link>
          </div>
        </header>
        <main className="px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
