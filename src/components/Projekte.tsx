import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { eigenesProjekt, loesungen, type Loesung } from "./loesungen-daten";
import { Container, SectionHead } from "./ui/Basis";
import { IconHaken, IconPdf, IconPfeilRechts } from "./ui/Icons";
import { Reveal, staffel } from "./ui/Reveal";
import { TerminLink } from "./ui/TerminButton";
import type { LoesungId } from "@/lib/schema";

// Kleine Vorschau je Karte, nur ab Tablet sichtbar
const vorschauen: Partial<Record<LoesungId, ReactNode>> = {
  schadenmeldung: <VorschauSchaden />,
  aenderungen: <VorschauAenderung />,
  whatsapp: <VorschauChat />,
  chatbot: <VorschauAssistent />,
};

export function Projekte() {
  return (
    <section id="projekte" aria-labelledby="projekte-titel" className="py-14 sm:py-16">
      <Container>
        <Reveal>
          <SectionHead
            id="projekte-titel"
            eyebrow="Projekte"
            titel="Jedes Maklerhaus ist anders."
            text="Deshalb schauen wir uns Ihr Büro gemeinsam an und besprechen, welche Projekte für Sie passen."
            center
          />
        </Reveal>

        {/* Desktop 2 × 2, mobil untereinander */}
        <ul data-stagger="" className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {loesungen.map((l, i) => (
            <li key={l.id} style={staffel(i)} className="min-w-0">
              <Karte loesung={l} />
            </li>
          ))}
        </ul>

        <Reveal>
          <EigeneLeiste />
        </Reveal>
      </Container>
    </section>
  );
}

// Gemeinsame Hülle: Lichtfleck folgt der Maus (siehe LichtEffekt), Hover hebt leicht an
const huelle =
  "licht-karte group relative isolate overflow-hidden rounded-[22px] bg-surface shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 ease-out motion-safe:can-hover:-translate-y-1 can-hover:shadow-[var(--shadow-float)]";

function KartenIcon({ loesung: l }: { loesung: Loesung }) {
  return (
    <span
      className="bg-grad grid size-11 shrink-0 place-items-center rounded-[13px] text-white shadow-[0_8px_20px_-8px_rgb(232_80_30/0.6)] transition-transform duration-300 ease-out motion-safe:group-can-hover:-rotate-6"
      aria-hidden="true"
    >
      <l.icon className="size-[22px]" />
    </span>
  );
}

function Karte({ loesung: l }: { loesung: Loesung }) {
  const vorschau = vorschauen[l.id];
  return (
    <article className={`${huelle} flex h-full flex-col p-6 sm:p-7`}>
      <div className="flex items-center gap-3.5">
        <KartenIcon loesung={l} />
        <h3 className="text-[21px] leading-tight sm:text-[23px]">{l.titel}</h3>
      </div>
      <p className="mt-4 text-[17px] leading-[1.6] text-ink-2 lg:text-[18px]">{l.text}</p>
      <ul className="mt-4 space-y-2">
        {l.punkte.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-[16px] leading-snug">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#FFE6DB] text-orange-3">
              <IconHaken className="size-3" strokeWidth={2.4} />
            </span>
            {p}
          </li>
        ))}
      </ul>
      {l.id === "schadenmeldung" && (
        <Link
          href="/demo/schadenmeldung"
          className="mt-4 inline-flex min-h-[48px] items-center gap-2 self-start text-[16px] font-medium underline decoration-line decoration-2 underline-offset-[6px] can-hover:decoration-accent"
        >
          Beispiel durchklicken
          <IconPfeilRechts className="size-4" />
        </Link>
      )}
      {vorschau && <div className="hidden h-5 md:block" aria-hidden="true" />}
      {vorschau && (
        <div
          aria-hidden="true"
          className={`bg-grad-soft mt-auto hidden h-[210px] min-w-0 justify-center overflow-hidden rounded-[16px] px-3.5 md:flex ${
            // Beim Assistenten zählt das Ende des Gesprächs (Rückruf), darum von unten zeigen
            l.id === "chatbot" ? "vorschau-von-unten items-end pb-3.5" : "vorschau-ausschnitt items-start pt-3.5"
          }`}
        >
          {vorschau}
        </div>
      )}
    </article>
  );
}

function EigeneLeiste() {
  const l = eigenesProjekt;
  return (
    <article className={`${huelle} mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7 md:mt-5`}>
      <div className="flex min-w-0 flex-1 items-start gap-3.5 sm:items-center">
        <KartenIcon loesung={l} />
        <div className="min-w-0">
          <h3 className="text-[19px] leading-tight">{l.titel}</h3>
          <p className="mt-1 text-[17px] leading-[1.6] text-ink-2">{l.text}</p>
        </div>
      </div>
      <TerminLink className="inline-flex min-h-[48px] shrink-0 items-center gap-2 self-start text-[16px] font-medium underline decoration-line decoration-2 underline-offset-[6px] can-hover:decoration-accent sm:self-center">
        Termin vereinbaren
        <IconPfeilRechts className="size-4" />
      </TerminLink>
    </article>
  );
}

function Mini({ children, className = "", anim = false }: { children: ReactNode; className?: string; anim?: boolean }) {
  return (
    <div
      data-anim={anim ? "" : undefined}
      className={`w-full rounded-[14px] bg-surface p-3 text-[12px] shadow-[var(--shadow-float)] ${anim ? "seq" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

const verzoegerung = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function VorschauSchaden() {
  return (
    <Mini className="max-w-[400px]" anim>
      <div className="flex items-center justify-between border-b border-line pb-2.5">
        <span className="text-[11px] uppercase tracking-[0.08em] text-ink-2">Entwurf an Versicherer</span>
        <span
          style={verzoegerung(350)}
          className="seq-teil seq-pop inline-flex items-center gap-1 rounded-full bg-[#FFE6DB] py-0.5 pl-1.5 pr-2 text-[10.5px] font-medium text-[#B23A12]"
        >
          <svg viewBox="0 0 12 12" className="seq-haken size-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 6.3 5 8.6l4.5-5" pathLength={1} />
          </svg>
          vollständig
        </span>
      </div>
      <p className="mt-2.5 font-medium">Schadenmeldung Hausrat, Vertrag [NR]</p>
      <div className="mt-2 space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-surface-2" />
        <span className="block h-1.5 w-5/6 rounded-full bg-surface-2" />
        <span className="block h-1.5 w-2/3 rounded-full bg-surface-2" />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 rounded-[10px] border border-line px-2.5 py-1.5">
          <IconPdf className="size-4 shrink-0 text-orange-3" />
          <span className="truncate">Schadenmeldung.pdf</span>
        </span>
        <span className="shrink-0 rounded-[9px] bg-ink px-3 py-1.5 font-medium text-white">Freigeben</span>
      </div>
    </Mini>
  );
}

// Beispieldaten erfunden, nur zur Veranschaulichung
function VorschauChat() {
  return (
    <Mini className="max-w-[400px]" anim>
      <div className="flex items-center gap-2.5 border-b border-line pb-2.5">
        <span className="bg-grad grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-medium text-white">
          W
        </span>
        <span className="flex-1 font-medium">Herr Weber</span>
        <span className="text-[11px] text-ink-2">WhatsApp</span>
      </div>
      <div
        style={verzoegerung(0)}
        className="seq-teil mt-3 max-w-[88%] rounded-[12px] rounded-bl-[4px] bg-bg px-2.5 py-1.5 leading-snug"
      >
        Hallo, mir ist heute einer reingefahren. Was soll ich jetzt machen und wie melde ich den Schaden?
        <span className="mt-1 block text-right text-[10.5px] text-ink-2">14:32</span>
      </div>
      <div className="relative mt-2.5">
        {/* Tippanzeige liegt über dem Platz des Entwurfs, damit nichts springt */}
        <span className="wa-tippen absolute right-0 top-0 flex gap-1 rounded-[12px] bg-surface-2 px-3 py-2.5">
          <span className="size-1.5 rounded-full bg-ink-2/60" />
          <span className="size-1.5 rounded-full bg-ink-2/60" />
          <span className="size-1.5 rounded-full bg-ink-2/60" />
        </span>
        <div
          style={verzoegerung(950)}
          className="seq-teil ml-auto max-w-[92%] rounded-[12px] rounded-br-[4px] border border-dashed border-ink-2/30 bg-surface-2/60 px-3 py-2 leading-snug"
        >
          <span className="mb-1 inline-block rounded-full bg-[#FFE6DB] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-[#B23A12]">
            KI-Entwurf
          </span>
          <span className="block">
            Das tut uns leid, Herr Weber. Ist jemand verletzt? Wenn nicht: Fotos machen und das Kennzeichen notieren. Den
            Schaden melden Sie direkt hier: [Link]
          </span>
        </div>
      </div>
      <div style={verzoegerung(1250)} className="seq-teil mt-2.5 flex justify-end gap-2">
        <span className="rounded-[9px] border border-line bg-surface px-3 py-1.5 font-medium">Bearbeiten</span>
        <span className="rounded-[9px] bg-ink px-3 py-1.5 font-medium text-white">Senden</span>
      </div>
    </Mini>
  );
}

function VorschauAenderung() {
  return (
    <Mini className="max-w-[340px]">
      <p className="font-medium">Adressänderung</p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-[11.5px] leading-snug">
        <div className="rounded-[10px] bg-bg p-2">
          <span className="block text-[10px] uppercase tracking-[0.06em] text-ink-2">Alt</span>
          <span className="text-ink-2 line-through decoration-ink-2/50">Lindenweg 4, 50667 Köln</span>
        </div>
        <div className="rounded-[10px] border border-line p-2">
          <span className="block text-[10px] uppercase tracking-[0.06em] text-ink-2">Neu</span>
          Am Sonnenhang 12, 51069 Köln
        </div>
      </div>
      <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#FFE6DB] px-2.5 py-1 text-[11px] font-medium text-[#B23A12]">
        <span className="size-1.5 rounded-full bg-accent" />
        Bereit zur Weitergabe
      </div>
    </Mini>
  );
}


// Statische Vorschau, kein echter Chatbot. Beispieldaten erfunden, nur zur Veranschaulichung.
// Regel: Der Assistent berät nicht, empfiehlt keine Tarife, sagt nichts zur Deckung und gibt sich als KI zu erkennen.
function VorschauAssistent() {
  return (
    <Mini className="max-w-[400px]">
      <div className="border-b border-line pb-2.5">
        <p className="font-medium">Assistent · Muster Versicherungsmakler</p>
        <p className="text-[11px] text-ink-2">KI-Assistent, keine Beratung</p>
      </div>
      <div className="mt-2.5 space-y-1.5 leading-snug">
        <p className="ml-auto max-w-[80%] rounded-[12px] rounded-br-[4px] bg-ink px-2.5 py-1.5 text-white">
          Ich ziehe um. Was muss ich tun?
        </p>
        <p className="max-w-[88%] rounded-[12px] rounded-bl-[4px] bg-bg px-2.5 py-1.5">
          Danke für Ihre Nachricht. Ihre neue Adresse können Sie uns direkt hier melden: [Link]. Wir geben sie an Ihre
          Versicherer weiter.
        </p>
        <p className="ml-auto max-w-[80%] rounded-[12px] rounded-br-[4px] bg-ink px-2.5 py-1.5 text-white">
          Brauche ich in der neuen Wohnung eine höhere Hausrat?
        </p>
        <div className="max-w-[88%] rounded-[12px] rounded-bl-[4px] bg-bg px-2.5 py-1.5">
          Das klären wir am besten persönlich. Soll Sie Ihr Berater zurückrufen?
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-[9px] bg-ink px-2.5 py-1 font-medium text-white">Rückruf anfragen</span>
            <span className="rounded-[9px] border border-line bg-surface px-2.5 py-1 font-medium">Nein, danke</span>
          </div>
        </div>
      </div>
    </Mini>
  );
}
