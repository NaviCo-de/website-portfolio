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
import { getProjectsForAdmin } from "@/lib/admin-data";
import { createProjectAction, deleteProjectAction, updateProjectAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjectsForAdmin();

  return (
    <div>
      <PageHeader title="Projects" description="Manage featured project cards, thumbnails, repository links, live demos, and tech stack badges." />

      <section className={`${panelClass} max-w-6xl`}>
        <h3 className="text-lg font-semibold text-slate-50">Create project</h3>
        <form action={createProjectAction} className="mt-5 space-y-5">
          <FormGrid>
            <TextField label="Nama project" name="title" required />
            <TextField label="Sort order" name="sortOrder" type="number" defaultValue={0} />
            <TextField label="Thumbnail / preview image URL" name="thumbnailUrl" />
            <TextField label="GitHub URL" name="githubUrl" required />
            <TextField label="Live demo URL optional" name="liveDemoUrl" />
          </FormGrid>
          <TextareaField label="Deskripsi singkat" name="description" required rows={4} />
          <TextareaField label="Tech stack" name="techStack" required rows={3} placeholder="Next.js, TypeScript, Tailwind CSS" />
          <CheckboxField label="Featured" name="isFeatured" defaultChecked />
          <button className={buttonClass}>Create Project</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {projects.length === 0 ? (
          <p className={panelClass}>No projects available yet.</p>
        ) : (
          projects.map((project) => (
            <details key={project.id} className={panelClass}>
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">{project.title}</h3>
                    <p className="text-sm text-slate-400">{project.techStack.join(", ")}</p>
                  </div>
                  <span className="rounded-full border border-slate-500/20 px-3 py-1 text-xs text-slate-300">{project.isFeatured ? "Featured" : "Hidden"}</span>
                </div>
              </summary>
              <div className="mt-6 border-t border-slate-500/15 pt-6">
                <form action={updateProjectAction} className="space-y-5">
                  <input type="hidden" name="id" value={project.id} />
                  <FormGrid>
                    <TextField label="Nama project" name="title" required defaultValue={project.title} />
                    <TextField label="Sort order" name="sortOrder" type="number" defaultValue={project.sortOrder} />
                    <TextField label="Thumbnail / preview image URL" name="thumbnailUrl" defaultValue={project.thumbnailUrl} />
                    <TextField label="GitHub URL" name="githubUrl" required defaultValue={project.githubUrl} />
                    <TextField label="Live demo URL optional" name="liveDemoUrl" defaultValue={project.liveDemoUrl} />
                  </FormGrid>
                  <TextareaField label="Deskripsi singkat" name="description" required rows={4} defaultValue={project.description} />
                  <TextareaField label="Tech stack" name="techStack" required rows={3} defaultValue={project.techStack.join(", ")} />
                  <CheckboxField label="Featured" name="isFeatured" defaultChecked={project.isFeatured} />
                  <button className={buttonClass}>Update Project</button>
                </form>
                <form action={deleteProjectAction} className="mt-3">
                  <input type="hidden" name="id" value={project.id} />
                  <button className={dangerButtonClass}>Delete Project</button>
                </form>
              </div>
            </details>
          ))
        )}
      </section>
    </div>
  );
}
