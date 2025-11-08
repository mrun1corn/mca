import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function PageHeader({ eyebrow, title, description, actions }: Props) {
  return (
    <div className="mb-6 space-y-3">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p> : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">{title}</h1>
          {description ? <p className="text-base text-slate-500 dark:text-slate-400 max-w-3xl">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
