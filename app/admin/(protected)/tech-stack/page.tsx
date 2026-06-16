import Image from "next/image";
import {
  CheckboxField,
  FormGrid,
  PageHeader,
  TextField,
  buttonClass,
  dangerButtonClass,
  panelClass,
} from "@/components/admin/AdminUi";
import { getTechStacksForAdmin } from "@/lib/admin-data";
import {
  createTechStackAction,
  deleteTechStackAction,
  updateTechStackAction,
} from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminTechStackPage() {
  const techStacks = await getTechStacksForAdmin();

  return (
    <div>
      <PageHeader
        title="Tech Stack"
        description="Manage the technology matrix shown on the public portfolio. Use Cloudinary URLs for clean, optimized logos."
      />

      <section className={`${panelClass} max-w-5xl`}>
        <h3 className="text-lg font-semibold text-slate-50">
          Create tech stack
        </h3>
        <form action={createTechStackAction} className="mt-5 space-y-5">
          <FormGrid>
            <TextField
              label="Tech name"
              name="name"
              required
              placeholder="Next.js"
            />
            <TextField
              label="Category"
              name="category"
              required
              placeholder="Frontend Framework"
            />
            <TextField
              label="Cloudinary image URL"
              name="imageUrl"
              placeholder="https://res.cloudinary.com/..."
            />
            <TextField
              label="Sort order"
              name="sortOrder"
              type="number"
              defaultValue={0}
            />
          </FormGrid>
          <CheckboxField label="Active" name="isActive" defaultChecked />
          <button className={buttonClass}>Create Tech Stack</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {techStacks.length === 0 ? (
          <p className={panelClass}>No tech stack entries added yet.</p>
        ) : (
          techStacks.map((tech) => (
            <details key={tech.id} className={panelClass}>
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-500/15 bg-slate-950/70">
                      {tech.imageUrl ? (
                        <Image
                          src={tech.imageUrl}
                          alt={tech.name + " logo"}
                          width={40}
                          height={40}
                          className="max-h-10 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-emerald-200">
                          {tech.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-slate-50">
                        {tech.name}
                      </h3>
                      <p className="text-sm text-slate-400">{tech.category}</p>
                    </div>
                  </div>
                  <span className="w-fit rounded-full border border-slate-500/20 px-3 py-1 text-xs text-slate-300">
                    {tech.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
              </summary>
              <div className="mt-6 border-t border-slate-500/15 pt-6">
                <form action={updateTechStackAction} className="space-y-5">
                  <input type="hidden" name="id" value={tech.id} />
                  <FormGrid>
                    <TextField
                      label="Tech name"
                      name="name"
                      required
                      defaultValue={tech.name}
                    />
                    <TextField
                      label="Category"
                      name="category"
                      required
                      defaultValue={tech.category}
                    />
                    <TextField
                      label="Cloudinary image URL"
                      name="imageUrl"
                      defaultValue={tech.imageUrl}
                    />
                    <TextField
                      label="Sort order"
                      name="sortOrder"
                      type="number"
                      defaultValue={tech.sortOrder}
                    />
                  </FormGrid>
                  <CheckboxField
                    label="Active"
                    name="isActive"
                    defaultChecked={tech.isActive}
                  />
                  <button className={buttonClass}>Update Tech Stack</button>
                </form>
                <form action={deleteTechStackAction} className="mt-3">
                  <input type="hidden" name="id" value={tech.id} />
                  <button className={dangerButtonClass}>
                    Delete Tech Stack
                  </button>
                </form>
              </div>
            </details>
          ))
        )}
      </section>
    </div>
  );
}
