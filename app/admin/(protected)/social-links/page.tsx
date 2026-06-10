import {
  CheckboxField,
  FormGrid,
  PageHeader,
  TextField,
  buttonClass,
  dangerButtonClass,
  panelClass,
} from "@/components/admin/AdminUi";
import { getSocialLinksForAdmin } from "@/lib/admin-data";
import { createSocialLinkAction, deleteSocialLinkAction, updateSocialLinkAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminSocialLinksPage() {
  const socialLinks = await getSocialLinksForAdmin();

  return (
    <div>
      <PageHeader title="Social Links" description="Manage LinkedIn, Instagram, GitHub, and any other active profile links." />

      <section className={`${panelClass} max-w-5xl`}>
        <h3 className="text-lg font-semibold text-slate-50">Create social link</h3>
        <form action={createSocialLinkAction} className="mt-5 space-y-5">
          <FormGrid>
            <TextField label="Platform" name="platform" required placeholder="LinkedIn" />
            <TextField label="URL" name="url" required placeholder="https://example.com" />
            <TextField label="Icon" name="icon" placeholder="linkedin" />
            <TextField label="Sort order" name="sortOrder" type="number" defaultValue={0} />
          </FormGrid>
          <CheckboxField label="Active" name="isActive" defaultChecked />
          <button className={buttonClass}>Create Social Link</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {socialLinks.length === 0 ? (
          <p className={panelClass}>No social links added yet.</p>
        ) : (
          socialLinks.map((link) => (
            <details key={link.id} className={panelClass}>
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">{link.platform}</h3>
                    <p className="break-all text-sm text-slate-400">{link.url}</p>
                  </div>
                  <span className="rounded-full border border-slate-500/20 px-3 py-1 text-xs text-slate-300">{link.isActive ? "Active" : "Disabled"}</span>
                </div>
              </summary>
              <div className="mt-6 border-t border-slate-500/15 pt-6">
                <form action={updateSocialLinkAction} className="space-y-5">
                  <input type="hidden" name="id" value={link.id} />
                  <FormGrid>
                    <TextField label="Platform" name="platform" required defaultValue={link.platform} />
                    <TextField label="URL" name="url" required defaultValue={link.url} />
                    <TextField label="Icon" name="icon" defaultValue={link.icon} />
                    <TextField label="Sort order" name="sortOrder" type="number" defaultValue={link.sortOrder} />
                  </FormGrid>
                  <CheckboxField label="Active" name="isActive" defaultChecked={link.isActive} />
                  <button className={buttonClass}>Update Social Link</button>
                </form>
                <form action={deleteSocialLinkAction} className="mt-3">
                  <input type="hidden" name="id" value={link.id} />
                  <button className={dangerButtonClass}>Delete Social Link</button>
                </form>
              </div>
            </details>
          ))
        )}
      </section>
    </div>
  );
}
