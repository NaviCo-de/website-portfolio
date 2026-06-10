import { cn } from "@/lib/utils";

export const panelClass = "rounded-2xl border border-slate-400/15 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/30";
export const inputClass = "mt-2 h-11 w-full rounded-xl border border-slate-500/25 bg-slate-950/70 px-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20";
export const textareaClass = "mt-2 w-full rounded-xl border border-slate-500/25 bg-slate-950/70 px-3 py-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20";
export const buttonClass = "inline-flex h-10 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300";
export const dangerButtonClass = "inline-flex h-10 items-center justify-center rounded-xl border border-red-400/25 px-4 text-sm font-semibold text-red-200 transition hover:bg-red-950/30 focus:outline-none focus:ring-2 focus:ring-red-300";

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold tracking-normal text-slate-50">{title}</h2>
      {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p> : null}
    </div>
  );
}

export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-200">
      {label}
      <input name={name} type={type} required={required} defaultValue={defaultValue ?? ""} placeholder={placeholder} className={inputClass} />
    </label>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue,
  required = false,
  rows = 5,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-200">
      {label}
      <textarea name={name} required={required} rows={rows} defaultValue={defaultValue ?? ""} placeholder={placeholder} className={textareaClass} />
    </label>
  );
}

export function CheckboxField({ label, name, defaultChecked = false }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-200">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 rounded border-slate-500 bg-slate-950 text-cyan-300 focus:ring-cyan-300" />
      {label}
    </label>
  );
}

export function FormGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-5 md:grid-cols-2", className)}>{children}</div>;
}
