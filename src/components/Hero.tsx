import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Container, Eyebrow, Leuchten } from "./ui/Basis";
import { TerminButton } from "./ui/TerminButton";
import { IconHaken, IconPersonStift, IconPfeilRechts, IconDokumentBlitz, IconSprechblaseFunken } from "./ui/Icons";

export function Hero() {
  return (
    <section aria-labelledby="hero-titel" className="relative overflow-x-clip pb-14 pt-8 sm:pb-20 sm:pt-14">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className="relative z-10">
            <Eyebrow>Für Versicherungsmakler</Eyebrow>
            <h1 id="hero-titel" className="mt-6 text-[40px] leading-[1.04] sm:text-[56px] lg:text-[64px]">
              Weniger Backoffice. Mehr Zeit bei{" "}
              <span className="pinsel relative inline-block whitespace-nowrap">
                Ihren Kunden.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 24"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.12em] left-0 h-[0.28em] w-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="pinsel-grad" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#FFB36B" />
                      <stop offset="55%" stopColor="#FF5F3A" />
                      <stop offset="100%" stopColor="#E8501E" />
                    </linearGradient>
                  </defs>
                  {/* Pinselstrich: dicker in der Mitte, ausgefranste Enden */}
                  <path
                    d="M4 15 C 60 7, 120 6, 180 9 S 270 13, 296 8"
                    pathLength={1}
                    fill="none"
                    stroke="url(#pinsel-grad)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    className="pinsel-strich"
                  />
                  <path
                    d="M30 19 C 90 13, 170 13, 250 15"
                    pathLength={1}
                    fill="none"
                    stroke="url(#pinsel-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.55"
                    className="pinsel-strich pinsel-strich-2"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-7 max-w-[560px] text-[17px] leading-[1.6] text-ink-2 lg:text-[18px]">
              Wir automatisieren die Routinearbeit in Ihrem Innendienst. Sie arbeiten weiter mit VEMA, Ihrem Pool und
              Ihren gewohnten Programmen. Ohne Umstellung.
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-start">
              <div className="flex flex-col items-start gap-2.5">
                <TerminButton size="lg" />
                <p className="whitespace-nowrap text-[14px] text-ink-2">Kostenlos · 30 Minuten · Ohne Verpflichtung</p>
              </div>
              <Link
                href="/demo/schadenmeldung"
                className="press inline-flex min-h-[56px] items-center gap-2 rounded-[12px] border border-line bg-surface px-5 text-[15px] font-medium can-hover:border-ink/30 sm:whitespace-nowrap"
              >
                Beispiel ansehen: Schadenmeldung
                <IconPfeilRechts className="size-4" />
              </Link>
            </div>
          </div>

          {/* Beispieldaten erfunden, nur zur Veranschaulichung */}
          <div className="relative">
            <Leuchten className="hero-leuchten -inset-x-10 -inset-y-12 sm:-inset-16" />
            <div className="relative mx-auto flex max-w-[440px] flex-col gap-4 lg:max-w-none">
              {[
                {
                  karte: (
                    <Vorgang
                      icon={<IconPersonStift className="size-[18px]" />}
                      titel="Adressänderung Frau Becker"
                      pill="vorbereitet"
                      zeile="an alle Versicherer, wartet auf Freigabe"
                    />
                  ),
                  versatz: "hidden md:block lg:mr-16",
                  ankunft: "100ms",
                  schweben: "0s",
                  dauer: "7s",
                },
                {
                  karte: (
                    <Vorgang
                      icon={<IconDokumentBlitz className="size-[18px]" />}
                      titel="Schadenmeldung Kfz, Herr Weber"
                      pill="vollständig"
                      haken
                      zeile="Fotos, Kennzeichen und Hergang liegen vor"
                    />
                  ),
                  versatz: "lg:ml-16",
                  ankunft: "220ms",
                  schweben: "-2.4s",
                  dauer: "8s",
                },
                {
                  karte: (
                    <Vorgang
                      icon={<IconSprechblaseFunken className="size-[18px]" />}
                      titel="Antwortentwurf WhatsApp"
                      pill="KI-Entwurf"
                      zeile="Ihr Team prüft und sendet"
                      knopf
                    />
                  ),
                  versatz: "hidden md:block lg:mr-8",
                  ankunft: "340ms",
                  schweben: "-4.6s",
                  dauer: "6.5s",
                },
              ].map((k, i) => (
                <div key={i} className={`hero-ankunft min-w-0 ${k.versatz}`} style={{ "--d": k.ankunft } as CSSProperties}>
                  <div className="hero-schweben" style={{ "--sd": k.schweben, "--dauer": k.dauer } as CSSProperties}>
                    {k.karte}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Vorgang({
  icon,
  titel,
  pill,
  zeile,
  haken = false,
  knopf = false,
}: {
  icon: ReactNode;
  titel: string;
  pill: string;
  zeile: string;
  haken?: boolean;
  knopf?: boolean;
}) {
  return (
    <div aria-hidden="true" className="rounded-[18px] bg-surface p-4 shadow-[var(--shadow-float)] sm:p-5">
      <div className="flex items-start gap-3">
        <span className="bg-grad grid size-9 shrink-0 place-items-center rounded-[11px] text-white">{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <p className="text-[14.5px] font-medium leading-snug">{titel}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFE6DB] px-2.5 py-0.5 text-[11px] font-medium text-[#B23A12]">
              {haken && <IconHaken className="size-3" strokeWidth={2.4} />}
              {pill}
            </span>
          </div>
          <p className="mt-1 text-[14px] leading-snug text-ink-2">{zeile}</p>
          {knopf && (
            <div className="mt-3 flex justify-end gap-2 text-[12px]">
              <span className="rounded-[9px] bg-surface-2 px-3 py-1.5">Bearbeiten</span>
              <span className="rounded-[9px] bg-ink px-3 py-1.5 font-medium text-white">Senden</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
