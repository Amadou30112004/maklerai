"use client";

import { useEffect } from "react";

const AUSWAHL = "[data-reveal], [data-stagger], [data-anim]";

// Setzt .is-visible, sobald ein Element ins Bild kommt (einmalig).
// Erst danach gilt .anim-bereit, vorher bleibt alles sichtbar.
export function ScrollEffekte() {
  useEffect(() => {
    const html = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elemente = Array.from(document.querySelectorAll<HTMLElement>(AUSWAHL));
    // Was beim Laden schon zu sehen ist, bleibt einfach sichtbar
    for (const el of elemente) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add("is-visible");
    }

    const io = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of elemente) if (!el.classList.contains("is-visible")) io.observe(el);
    html.classList.add("anim-bereit");

    return () => {
      io.disconnect();
      html.classList.remove("anim-bereit");
    };
  }, []);

  return null;
}
