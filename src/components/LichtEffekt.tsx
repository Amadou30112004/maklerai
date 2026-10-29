"use client";

import { useEffect } from "react";

// Weicher Lichtfleck auf den Projekt-Karten, der dem Mauszeiger folgt.
// Nur bei echter Maus und ohne reduzierte Bewegung. Position über --x / --y, einmal pro Frame.
export function LichtEffekt() {
  useEffect(() => {
    const maus = window.matchMedia("(hover: hover) and (pointer: fine)");
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!maus.matches || ruhig.matches) return;

    let frame = 0;
    let letztes: { el: HTMLElement; x: number; y: number } | null = null;

    const bewegen = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(".licht-karte");
      if (!el) return;
      const r = el.getBoundingClientRect();
      letztes = { el, x: e.clientX - r.left, y: e.clientY - r.top };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!letztes) return;
        letztes.el.style.setProperty("--x", `${letztes.x}px`);
        letztes.el.style.setProperty("--y", `${letztes.y}px`);
      });
    };

    document.documentElement.classList.add("licht-an");
    document.addEventListener("pointermove", bewegen, { passive: true });
    return () => {
      document.removeEventListener("pointermove", bewegen);
      document.documentElement.classList.remove("licht-an");
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
