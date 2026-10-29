import type { CSSProperties, ReactNode } from "react";

// Einmaliges Einblenden beim Scrollen. Im HTML immer sichtbar, versteckt wird nur
// mit JavaScript und ohne reduzierte Bewegung (siehe globals.css und ScrollEffekte).
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div data-reveal="" className={className} style={{ "--d": `${Math.round(delay * 1000)}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

// Index für gestaffelte Kartenreihen ([data-stagger] am Elternelement)
export const staffel = (i: number) => ({ "--i": i }) as CSSProperties;
