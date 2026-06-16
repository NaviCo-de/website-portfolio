import { Code2, Inbox, Share2, WalletCards, FolderKanban } from "lucide-react";
import { PageHeader, panelClass } from "@/components/admin/AdminUi";
import { getAdminDashboardData } from "@/lib/admin-data";

const cards = [
  { key: "experiences", label: "Experiences", icon: WalletCards },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "techStacks", label: "Tech Stack", icon: Code2 },
  { key: "socialLinks", label: "Social Links", icon: Share2 },
  { key: "messages", label: "Messages", icon: Inbox },
] as const;

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Quick overview of portfolio content and incoming contact messages."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className={panelClass}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-50">
                    {data[card.key]}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className={`${panelClass} mt-6`}>
        <h3 className="text-lg font-semibold text-slate-50">Latest Activity</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-500/15 bg-slate-950/50 p-4">
            <p className="text-sm font-medium text-slate-300">
              Tanggal update terakhir
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {data.latestSettings?.updatedAt
                ? new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(data.latestSettings.updatedAt)
                : "No settings update yet."}
            </p>
          </div>
          <div className="rounded-xl border border-slate-500/15 bg-slate-950/50 p-4">
            <p className="text-sm font-medium text-slate-300">Latest Message</p>
            {data.latestMessage ? (
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {data.latestMessage.subject} from {data.latestMessage.email}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                No messages received yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
