import {
  PageHeader,
  buttonClass,
  dangerButtonClass,
  panelClass,
} from "@/components/admin/AdminUi";
import { getMessagesForAdmin } from "@/lib/admin-data";
import { deleteMessageAction, markMessageReadAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getMessagesForAdmin();

  return (
    <div>
      <PageHeader
        title="Messages"
        description="Review contact form submissions, mark messages as read, or delete old entries."
      />
      <section className="space-y-4">
        {messages.length === 0 ? (
          <p className={panelClass}>No messages received yet.</p>
        ) : (
          messages.map((message) => (
            <article key={message.id} className={panelClass}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-50">
                      {message.subject}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${message.isRead ? "bg-slate-800 text-slate-300" : "bg-emerald-300/10 text-emerald-200"}`}
                    >
                      {message.isRead ? "Read" : "Unread"}
                    </span>
                  </div>
                  <p className="mt-1 break-all text-sm text-emerald-200">
                    {message.email}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(message.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {!message.isRead ? (
                    <form action={markMessageReadAction}>
                      <input type="hidden" name="id" value={message.id} />
                      <button className={buttonClass}>Mark as read</button>
                    </form>
                  ) : null}
                  <form action={deleteMessageAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <button className={dangerButtonClass}>Delete</button>
                  </form>
                </div>
              </div>
              <details className="mt-5 rounded-xl border border-slate-500/15 bg-slate-950/50 p-4">
                <summary className="cursor-pointer text-sm font-medium text-slate-200">
                  View message detail
                </summary>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {message.message}
                </p>
              </details>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
