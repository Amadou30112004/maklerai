"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { site } from "@/config/site";
import { berechneErsparnis, formatEuro, formatStunden } from "@/lib/ersparnis";
import { Container, SectionHead } from "./ui/Basis";

type Regler = {
  key: "meldungenProMonat" | "minutenHeute" | "minutenMitTool" | "stundensatz";
  label: string;
  min: number;
  max: number;
  einheit: string;
};

const regler: Regler[] = [
  { key: "meldungenProMonat", label: "Schadenmeldungen pro Monat", min: 1, max: 100, einheit: "" },
  { key: "minutenHeute", label: "Minuten pro Meldung heute (inkl. Rückfragen)", min: 5, max: 60, einheit: "Min." },
  {
    key: "minutenMitTool",
    label: `Minuten pro Meldung mit ${site.name} (Prüfen und Freigeben)`,
    min: 1,
    max: 15,
    einheit: "Min.",
  },
  { key: "stundensatz", label: "Kosten pro Innendienst-Stunde in €", min: 20, max: 80, einheit: "€" },
];

export function Rechner() {
  const [werte, setWerte] = useState({
    meldungenProMonat: 15,
    minutenHeute: 15,
    minutenMitTool: 3,
    stundensatz: 35,
  });
  const e = berechneErsparnis(werte);
  const baseId = useId();
  const ergebnisRef = useRef<HTMLDivElement>(null);
  const animation = useRef(0);
  // 1 = echte Werte. Beim ersten Sichtbarwerden zählen die Zahlen von 0 hoch.
  const [faktor, setFaktor] = useState(1);

  useEffect(() => {
    const el = ergebnisRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let gestartet = false;
    const io = new IntersectionObserver(
      ([eintrag]) => {
        if (gestartet) return;
        if (!eintrag.isIntersecting) {
          setFaktor(0);
          return;
        }
        gestartet = true;
        io.disconnect();
        const start = performance.now();
        const schritt = (jetzt: number) => {
          const t = Math.min(1, (jetzt - start) / 600);
          setFaktor(1 - Math.pow(1 - t, 3));
          if (t < 1) animation.current = requestAnimationFrame(schritt);
        };
        animation.current = requestAnimationFrame(schritt);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(animation.current);
    };
  }, []);

  const zahl = (wert: number) => wert * faktor;
  const aendern = (key: Regler["key"], wert: number) => {
    // Beim Ziehen sofort die echten Werte zeigen, ohne Animation
    cancelAnimationFrame(animation.current);
    setFaktor(1);
    setWerte((w) => ({ ...w, [key]: wert }));
  };

  return (
    <section id="rechner" aria-labelledby="rechner-titel" className="py-16 sm:py-24">
      <Container>
        <SectionHead id="rechner-titel" eyebrow="Ersparnisrechner" titel="Wie viel Zeit könnten Sie beim Kunden sein?" />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <div className="rounded-[22px] bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="space-y-7">
              {regler.map((r) => {
                const id = `${baseId}-${r.key}`;
                const wert = werte[r.key];
                const prozent = ((wert - r.min) / (r.max - r.min)) * 100;
                return (
                  <div key={r.key}>
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor={id} className="text-[15px] leading-snug">
                        {r.label}
                      </label>
                      <output
                        htmlFor={id}
                        className="shrink-0 rounded-full bg-bg px-3 py-1 text-[15px] font-medium tabular-nums"
                      >
                        {wert}
                        {r.einheit && ` ${r.einheit}`}
                      </output>
                    </div>
                    <input
                      id={id}
                      type="range"
                      min={r.min}
                      max={r.max}
                      step={1}
                      value={wert}
                      onChange={(ev) => aendern(r.key, Number(ev.target.value))}
                      className="regler mt-3 h-11 w-full cursor-pointer"
                      style={{ "--p": `${prozent}%` } as CSSProperties}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ergebnis als Blickfang: Orange-Verlauf, große weiße Zahlen, kleine Schrift dunkel für genug Kontrast */}
          <div className="flex flex-col gap-4">
            <div
              ref={ergebnisRef}
              className="rechner-ergebnis relative flex-1 overflow-hidden rounded-[22px] p-6 shadow-[var(--shadow-float)] sm:p-8"
              aria-live={faktor < 1 ? "off" : "polite"}
            >
              <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-ink">Gesparte Zeit pro Monat</p>
              <p className="mt-3 text-[56px] font-medium leading-none tracking-[-0.03em] text-white tabular-nums sm:text-[72px]">
                {formatStunden(zahl(e.stundenProMonat))} <span className="text-[28px]">Std.</span>
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/40 pt-5">
                <div>
                  <p className="text-[13px] font-medium text-ink">pro Monat</p>
                  <p className="mt-1 text-[32px] font-medium tracking-[-0.03em] text-white tabular-nums sm:text-[40px]">
                    {formatEuro(zahl(e.euroProMonat))}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-ink">pro Jahr</p>
                  <p className="mt-1 text-[32px] font-medium tracking-[-0.03em] text-white tabular-nums sm:text-[40px]">
                    {formatEuro(zahl(e.euroProJahr))}
                  </p>
                </div>
              </div>
            </div>
            <p className="px-1 text-[14px] leading-relaxed text-ink-2">
              So rechnen wir: Vorgänge pro Monat mal gesparte Minuten, mal Stundensatz. Ihre Werte stellen Sie selbst
              ein. Beispielrechnung, Ihre tatsächliche Ersparnis hängt von Ihrem Büro ab.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
