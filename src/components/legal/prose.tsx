import * as React from 'react';

/* Lightweight, RTL-aware prose primitives for legal/support pages.
 * (No @tailwindcss/typography in this project, so we style explicitly.) */

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg leading-relaxed text-foreground-muted">{children}</p>;
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-12 scroll-mt-24 text-xl font-extrabold text-navy first:mt-0 md:text-2xl"
    >
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-foreground">{children}</p>;
}

export function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 ps-6 leading-relaxed text-foreground marker:text-primary-400">
      {children}
    </ul>
  );
}
