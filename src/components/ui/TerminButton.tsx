"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { IconPfeilRechts } from "./Icons";

// Scrollt weich zum Termin-Abschnitt und setzt den Fokus ins Feld Vorname.
// Auf Unterseiten ohne #pilot funktioniert der Link ganz normal.
function zumTermin(e: MouseEvent<HTMLAnchorElement>) {
  const ziel = document.getElementById("pilot");
  if (!ziel) return;
  e.preventDefault();
  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  ziel.scrollIntoView({ behavior: ruhig ? "auto" : "smooth", block: "start" });
  document.getElementById("feld-vorname")?.focus({ preventScroll: true });
  history.replaceState(null, "", "#pilot");
}

// Der eine Handlungsaufruf der Seite, überall gleich
export function TerminButton({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const pad = size === "lg" ? "py-2 pl-5 pr-2 text-[17px] min-h-[56px]" : "py-1.5 pl-4 pr-1.5 text-[15px] min-h-[48px]";
  const kachel = size === "lg" ? "size-10" : "size-9";
  return (
    <Link
      href="/#pilot"
      onClick={zumTermin}
      className={`press glanz group inline-flex items-center gap-3 rounded-[12px] bg-ink font-medium text-white ${pad} ${className}`}
    >
      <span>Termin vereinbaren</span>
      <span
        className={`grid ${kachel} place-items-center rounded-[9px] bg-white text-ink transition-transform duration-200 ease-out motion-safe:group-can-hover:translate-x-0.5`}
        aria-hidden="true"
      >
        <IconPfeilRechts className="size-4" />
      </span>
    </Link>
  );
}

// Schlichter Textlink zum Termin, gleiche Wirkung wie der Button
export function TerminLink({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <Link href="/#pilot" onClick={zumTermin} className={className}>
      {children}
    </Link>
  );
}
