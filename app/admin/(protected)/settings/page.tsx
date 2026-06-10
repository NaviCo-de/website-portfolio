import { FormGrid, PageHeader, TextareaField, TextField, buttonClass, panelClass } from "@/components/admin/AdminUi";
import { getFallbackSettingsForForm, getSettingsForAdmin } from "@/lib/admin-data";
import { saveSettingsAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettingsForAdmin();
  const fallback = getFallbackSettingsForForm();

  return (
    <div>
      <PageHeader title="Settings" description="Configure site title, SEO text, owner email, typewriter roles, and primary accent." />
      <form action={saveSettingsAction} className={`${panelClass} max-w-5xl space-y-5`}>
        <FormGrid>
          <TextField label="Site title" name="siteTitle" required defaultValue={settings?.siteTitle ?? fallback.siteTitle} />
          <TextField label="Owner email" name="ownerEmail" type="email" defaultValue={settings?.ownerEmail ?? fallback.ownerEmail} />
        </FormGrid>
        <TextareaField label="Meta description" name="metaDescription" rows={3} defaultValue={settings?.metaDescription ?? fallback.metaDescription} />
        <TextareaField label="Hero roles untuk typewriter" name="heroRoles" required rows={4} defaultValue={(settings?.heroRoles ?? fallback.heroRoles).join("\n")} />
        <FormGrid>
          <TextField label="Primary color optional" name="primaryColor" defaultValue={settings?.primaryColor ?? fallback.primaryColor} />
          <TextField label="SEO title" name="seoTitle" defaultValue={settings?.seoTitle ?? fallback.seoTitle} />
        </FormGrid>
        <TextareaField label="SEO description" name="seoDescription" rows={3} defaultValue={settings?.seoDescription ?? fallback.seoDescription} />
        <button className={buttonClass}>Save Settings</button>
      </form>
    </div>
  );
}
