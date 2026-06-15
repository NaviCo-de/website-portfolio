import {
  FormGrid,
  PageHeader,
  TextareaField,
  TextField,
  buttonClass,
  panelClass,
} from "@/components/admin/AdminUi";
import { ProfileImageUploader } from "@/components/admin/ProfileImageUploader";
import {
  getFallbackProfileForForm,
  getProfileForAdmin,
} from "@/lib/admin-data";
import { saveProfileAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await getProfileForAdmin();
  const fallback = getFallbackProfileForForm();

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Edit identity, hero copy, profile photo URL, CV URL, and owner contact email."
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
        <ProfileImageUploader
          defaultValue={profile?.profileImageUrl ?? fallback.profileImageUrl}
        />
        <FormGrid>
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
        <button className={buttonClass}>Save Profile</button>
      </form>
    </div>
  );
}
