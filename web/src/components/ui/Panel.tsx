import { ReactNode } from "react";

type Props = {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Panel({ title, description, actions, children, className = "" }: Props) {
  return (
    <section
      className={`glass rounded-lg p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md ${className}`.trim()}
    >
      {(title || description || actions) && (
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div>
            {title ? <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2> : null}
            {description ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex gap-2 flex-wrap">{actions}</div> : null}
        </header>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
