import { LockKeyhole } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "invalid";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-10 text-slate-50">
      <div className="w-full max-w-md rounded-2xl border border-slate-400/15 bg-slate-900/75 p-8 shadow-2xl shadow-slate-950/50">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-300 text-slate-950">
            <LockKeyhole aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-50">
              Admin Login
            </h1>
            <p className="text-sm text-slate-400">Portfolio dashboard access</p>
          </div>
        </div>

        {hasError ? (
          <p
            className="mb-5 rounded-xl border border-red-400/25 bg-red-950/30 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            Invalid email or password.
          </p>
        ) : null}

        <form action="/api/auth/login" method="post" className="space-y-5">
          <label className="block text-sm font-medium text-slate-200">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-2 h-12 w-full rounded-xl border border-slate-500/25 bg-slate-950/70 px-4 text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
              placeholder="admin@example.com"
            />
          </label>
          <label className="block text-sm font-medium text-slate-200">
            Password
            <input
              name="password"
              type="password"
              required
              className="mt-2 h-12 w-full rounded-xl border border-slate-500/25 bg-slate-950/70 px-4 text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
              placeholder="Password"
            />
          </label>
          <button className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-emerald-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
