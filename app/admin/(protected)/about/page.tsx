import { FormGrid, PageHeader, TextareaField, TextField, buttonClass, panelClass } from "@/components/admin/AdminUi";
import { getAboutForAdmin, getFallbackAboutForForm } from "@/lib/admin-data";
import { saveAboutAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const about = await getAboutForAdmin();
  const fallback = getFallbackAboutForForm();

  return (
    <div>
      <PageHeader title="About" description="Manage the about section shown below the hero." />
      <form action={saveAboutAction} className={`${panelClass} max-w-5xl space-y-5`}>
        <FormGrid>
          <TextField label="Title" name="title" required defaultValue={about?.title ?? fallback.title} />
          <TextField label="Subtitle optional" name="subtitle" defaultValue={about?.subtitle ?? fallback.subtitle} />
        </FormGrid>
        <TextareaField label="Description" name="description" required rows={8} defaultValue={about?.description ?? fallback.description} />
        <button className={buttonClass}>Save About</button>
      </form>
    </div>
  );
}
