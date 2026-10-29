"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type NavLink = { href: string; label: string };

// Menü für schmale Bildschirme, ab 1024 px übernimmt die Pill-Leiste
export function MobilMenue({ links }: { links: NavLink[] }) {
  const [offen, setOffen] = useState(false);
  const id = useId();
  const knopf = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!offen) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOffen(false);
        knopf.current?.focus();
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [offen]);

  return (
    <div className="lg:hidden">
      <button
        ref={knopf}
        type="button"
        aria-expanded={offen}
        aria-controls={id}
        onClick={() => setOffen((o) => !o)}
        className="press grid size-11 place-items-center rounded-[12px] bg-surface-2"
      >
        <span className="sr-only">{offen ? "Menü schließen" : "Menü öffnen"}</span>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
          {offen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {offen && (
        <nav
          id={id}
          aria-label="Hauptnavigation"
          className="absolute inset-x-0 top-full border-b border-line bg-bg px-4 pb-5 pt-2 shadow-[var(--shadow-soft)]"
        >
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOffen(false)}
                  className="flex min-h-[48px] items-center rounded-[12px] px-3 text-[17px] active:bg-surface-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/#pilot"
                onClick={() => setOffen(false)}
                className="press flex min-h-[52px] items-center justify-center rounded-[12px] bg-ink text-[16px] font-medium text-white"
              >
                Termin vereinbaren
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
