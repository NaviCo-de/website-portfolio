import {
  CheckboxField,
  FormGrid,
  PageHeader,
  TextareaField,
  TextField,
  buttonClass,
  dangerButtonClass,
  panelClass,
} from "@/components/admin/AdminUi";
import { getExperiencesForAdmin } from "@/lib/admin-data";
import { formatDateRange, toInputDate } from "@/lib/utils";
import { createExperienceAction, deleteExperienceAction, updateExperienceAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminExperiencesPage() {
  const experiences = await getExperiencesForAdmin();

  return (
    <div>
      <PageHeader title="Experiences" description="Create, update, delete, and sort organization or committee experiences." />

      <section className={`${panelClass} max-w-6xl`}>
        <h3 className="text-lg font-semibold text-slate-50">Create experience</h3>
        <form action={createExperienceAction} className="mt-5 space-y-5">
          <FormGrid>
            <TextField label="Jabatan" name="position" required />
            <TextField label="Dimana / Organisasi / Event" name="organization" required />
            <TextField label="Location optional" name="location" />
            <TextField label="Sort order" name="sortOrder" type="number" defaultValue={0} />
            <TextField label="Tanggal mulai" name="startDate" type="date" required />
            <TextField label="Tanggal selesai" name="endDate" type="date" />
          </FormGrid>
          <CheckboxField label="Present" name="isPresent" />
          <TextareaField label="Deskripsi kegiatan" name="description" required rows={5} />
          <button className={buttonClass}>Create Experience</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {experiences.length === 0 ? (
          <p className={panelClass}>No experiences added yet.</p>
        ) : (
          experiences.map((experience) => (
            <details key={experience.id} className={panelClass}>
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">{experience.position}</h3>
                    <p className="text-sm text-cyan-200">{experience.organization}</p>
                  </div>
                  <p className="text-sm text-slate-400">{formatDateRange(experience.startDate, experience.endDate, experience.isPresent)}</p>
                </div>
              </summary>
              <div className="mt-6 border-t border-slate-500/15 pt-6">
                <form action={updateExperienceAction} className="space-y-5">
                  <input type="hidden" name="id" value={experience.id} />
                  <FormGrid>
                    <TextField label="Jabatan" name="position" required defaultValue={experience.position} />
                    <TextField label="Dimana / Organisasi / Event" name="organization" required defaultValue={experience.organization} />
                    <TextField label="Location optional" name="location" defaultValue={experience.location} />
                    <TextField label="Sort order" name="sortOrder" type="number" defaultValue={experience.sortOrder} />
                    <TextField label="Tanggal mulai" name="startDate" type="date" required defaultValue={toInputDate(experience.startDate)} />
                    <TextField label="Tanggal selesai" name="endDate" type="date" defaultValue={toInputDate(experience.endDate)} />
                  </FormGrid>
                  <CheckboxField label="Present" name="isPresent" defaultChecked={experience.isPresent} />
                  <TextareaField label="Deskripsi kegiatan" name="description" required rows={5} defaultValue={experience.description} />
                  <div className="flex flex-wrap gap-3">
                    <button className={buttonClass}>Update Experience</button>
                  </div>
                </form>
                <form action={deleteExperienceAction} className="mt-3">
                  <input type="hidden" name="id" value={experience.id} />
                  <button className={dangerButtonClass}>Delete Experience</button>
                </form>
              </div>
            </details>
          ))
        )}
      </section>
    </div>
  );
}
