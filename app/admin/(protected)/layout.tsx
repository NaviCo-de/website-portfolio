import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  return <AdminShell session={session}>{children}</AdminShell>;
}
