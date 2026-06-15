import {
  FormGrid,
  PageHeader,
  TextareaField,
  TextField,
  buttonClass,
  panelClass,
} from "@/components/admin/AdminUi";
import {
  getFallbackProfileForForm,
  getFallbackSettingsForForm,
  getProfileForAdmin,
  getSettingsForAdmin,
} from "@/lib/admin-data";
import { saveProfileAction, saveSettingsAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminHeroProfilePage() {
  const [profile, settings] = await Promise.all([
    getProfileForAdmin(),
    getSettingsForAdmin(),
  ]);
  const fallback = getFallbackProfileForForm();
  const fallbackSettings = getFallbackSettingsForForm();

  return (
    <div>
      <PageHeader
        title="Hero Profile"
        description="Edit hero identity, headline, intro copy, profile photo URL, CV URL, and owner contact email."
      />
      <form
        action={saveProfileAction}
        className={`${panelClass} max-w-5xl space-y-5`}
      >
        <FormGrid>
          <TextField
            label="Nama"
            name="name"
            required
            defaultValue={profile?.name ?? fallback.name}
          />
          <TextField
            label="Headline / short intro label"
            name="headline"
            defaultValue={profile?.headline ?? fallback.headline}
          />
        </FormGrid>
        <TextareaField
          label="Short intro"
          name="shortIntro"
          required
          rows={4}
          defaultValue={profile?.shortIntro ?? fallback.shortIntro}
        />
        <FormGrid>
          <TextField
            label="Foto profil URL"
            name="profileImageUrl"
            defaultValue={profile?.profileImageUrl ?? fallback.profileImageUrl}
          />
          <TextField
            label="CV URL optional"
            name="cvUrl"
            defaultValue={profile?.cvUrl ?? fallback.cvUrl}
          />
          <TextField
            label="Email tujuan contact"
            name="ownerEmail"
            type="email"
            defaultValue={profile?.ownerEmail ?? fallback.ownerEmail}
          />
        </FormGrid>
        <button className={buttonClass}>Save Hero Profile</button>
      </form>

      <form
        action={saveSettingsAction}
        className={panelClass + " mt-6 max-w-5xl space-y-5"}
      >
        <input
          type="hidden"
          name="siteTitle"
          defaultValue={settings?.siteTitle ?? fallbackSettings.siteTitle}
        />
        <input
          type="hidden"
          name="metaDescription"
          defaultValue={
            settings?.metaDescription ?? fallbackSettings.metaDescription ?? ""
          }
        />
        <input
          type="hidden"
          name="ownerEmail"
          defaultValue={
            settings?.ownerEmail ?? fallbackSettings.ownerEmail ?? ""
          }
        />
        <input
          type="hidden"
          name="primaryColor"
          defaultValue={
            settings?.primaryColor ?? fallbackSettings.primaryColor ?? ""
          }
        />
        <input
          type="hidden"
          name="seoTitle"
          defaultValue={settings?.seoTitle ?? fallbackSettings.seoTitle ?? ""}
        />
        <input
          type="hidden"
          name="seoDescription"
          defaultValue={
            settings?.seoDescription ?? fallbackSettings.seoDescription ?? ""
          }
        />
        <TextareaField
          label="Role list untuk typewriter"
          name="heroRoles"
          required
          rows={4}
          defaultValue={(
            settings?.heroRoles ?? fallbackSettings.heroRoles
          ).join("\n")}
        />
        <button className={buttonClass}>Save Typewriter Roles</button>
      </form>
    </div>
  );
}
