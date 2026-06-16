import {
  CheckboxField,
  FormGrid,
  PageHeader,
  SelectField,
  TextField,
  buttonClass,
  dangerButtonClass,
  panelClass,
} from "@/components/admin/AdminUi";
import { TechStackLogo } from "@/components/TechStackLogo";
import { getTechStacksForAdmin } from "@/lib/admin-data";
import {
  TECH_STACK_CATEGORY_VALUES,
  normalizeTechStackCategory,
} from "@/lib/tech-stack";
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
        description="Manage the technology matrix shown on the public portfolio. Prefer Iconify keys like devicon:nextjs, with Cloudinary URLs available as custom fallbacks."
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
            <SelectField
              label="Category"
              name="category"
              required
              defaultValue="Frameworks"
              options={TECH_STACK_CATEGORY_VALUES}
            />
            <TextField
              label="Iconify icon key"
              name="iconKey"
              placeholder="devicon:nextjs"
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
                    <TechStackLogo
                      name={tech.name}
                      iconKey={tech.iconKey}
                      imageUrl={tech.imageUrl}
                      className="bg-slate-950/70"
                      iconClassName="h-10 w-10"
                      imageClassName="max-h-10"
                    />
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-slate-50">
                        {tech.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {normalizeTechStackCategory(tech.category, tech.name)}
                      </p>
                      {tech.iconKey ? (
                        <p className="mt-1 font-mono text-xs text-emerald-200/80">
                          {tech.iconKey}
                        </p>
                      ) : null}
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
                    <SelectField
                      label="Category"
                      name="category"
                      required
                      defaultValue={normalizeTechStackCategory(
                        tech.category,
                        tech.name,
                      )}
                      options={TECH_STACK_CATEGORY_VALUES}
                    />
                    <TextField
                      label="Iconify icon key"
                      name="iconKey"
                      defaultValue={tech.iconKey}
                      placeholder="devicon:nextjs"
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
