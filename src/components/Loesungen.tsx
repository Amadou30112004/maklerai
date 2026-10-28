import type { ReactNode } from "react";
import { loesungen, type Loesung } from "./loesungen-daten";
import { Container, IconKachel, SectionHead } from "./ui/Basis";
import { IconHaken, IconPdf, IconPfeilRechts } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import type { LoesungId } from "@/lib/schema";

const vorschauen: Record<LoesungId, ReactNode> = {
  schadenmeldung: <VorschauSchaden />,
  aenderungen: <VorschauAenderung />,
  whatsapp: <VorschauWhatsApp />,
};

// Raster: Desktop 3 Spalten, Tablet jede Karte volle Breite, mobil untereinander
const spalten: Record<Loesung["format"], string> = {
  gross: "md:col-span-2",
  klein: "md:col-span-2 lg:col-span-1",
  breit: "md:col-span-2 lg:col-span-3",
};

const kartenLayout: Record<Loesung["format"], string> = {
  gross: "lg:grid lg:grid-cols-[1fr_1.05fr] lg:gap-8",
  klein: "",
  breit: "lg:grid lg:grid-cols-[0.8fr_1.6fr] lg:gap-10 lg:p-9",
};

export function Loesungen() {
  return (
    <section id="loesungen" aria-labelledby="loesungen-titel" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead
            id="loesungen-titel"
            eyebrow="Lösungen"
            titel="Drei Automationen. Ein Innendienst, der mitdenkt."
            text="Wählen Sie, womit Ihr Büro startet. Wir richten es ein, Sie arbeiten weiter wie gewohnt."
            center
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loesungen.map((l, i) => (
            <li key={l.id} className={`min-w-0 ${spalten[l.format]}`}>
              <Reveal delay={(i % 3) * 0.05} className="h-full">
                <Karte loesung={l} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href="#pilot"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[16px] font-medium underline decoration-line decoration-2 underline-offset-[6px] can-hover:decoration-accent"
          >
            Welche Lösung passt zu Ihrem Büro? Lassen Sie uns sprechen
            <IconPfeilRechts className="size-4 transition-transform motion-safe:group-can-hover:translate-x-0.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}

function Karte({ loesung: l }: { loesung: Loesung }) {
  const gross = l.format !== "klein";
  return (
    <article
      className={`group flex h-full flex-col rounded-[22px] bg-surface p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 ease-out sm:p-7 motion-safe:can-hover:-translate-y-1 can-hover:shadow-[var(--shadow-float)] ${kartenLayout[l.format]}`}
    >
      <div className="flex min-w-0 flex-col">
        <IconKachel
          icon={l.icon}
          className="transition-transform duration-300 ease-out motion-safe:group-can-hover:-rotate-6"
        />
        <h3 className={`mt-6 ${gross ? "text-[26px] sm:text-[30px]" : "text-[21px]"} leading-tight`}>{l.titel}</h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{l.text}</p>
        <ul className="mt-5 space-y-2.5">
          {l.punkte.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[15px]">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#FFE6DB] text-orange-3">
                <IconHaken className="size-3" strokeWidth={2.4} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div
        aria-hidden="true"
        className={`bg-grad-soft mt-7 flex min-w-0 flex-1 items-end justify-center rounded-[16px] p-4 sm:p-5 ${
          gross ? "lg:mt-0 lg:items-center" : ""
        }`}
      >
        {vorschauen[l.id]}
      </div>
    </article>
  );
}

function Mini({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-full rounded-[14px] bg-surface p-3.5 text-[12.5px] shadow-[var(--shadow-float)] ${className}`}>
      {children}
    </div>
  );
}

function VorschauSchaden() {
  return (
    <Mini className="max-w-[400px]">
      <div className="flex items-center justify-between border-b border-line pb-2.5">
        <span className="text-[11px] uppercase tracking-[0.08em] text-ink-2">Entwurf an Versicherer</span>
        <span className="rounded-full bg-[#FFE6DB] px-2 py-0.5 text-[10.5px] font-medium text-[#B23A12]">vollständig</span>
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
    <Mini className="h-full">
      <div className="flex items-center gap-2.5 border-b border-line pb-2.5">
        <span className="bg-grad grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-medium text-white">
          W
        </span>
        <span className="flex-1 font-medium">Herr Weber</span>
        <span className="text-[11px] text-ink-2">WhatsApp</span>
      </div>
      <div className="mt-3 max-w-[88%] rounded-[12px] rounded-bl-[4px] bg-bg px-3 py-2 leading-snug">
        Hallo, mir ist heute einer reingefahren. Was soll ich jetzt machen und wie melde ich den Schaden?
        <span className="mt-1 block text-right text-[10.5px] text-ink-2">14:32</span>
      </div>
      <div className="mt-2.5 ml-auto max-w-[92%] rounded-[12px] rounded-br-[4px] border border-dashed border-ink-2/30 bg-surface-2/60 px-3 py-2 leading-snug">
        <span className="mb-1 inline-block rounded-full bg-[#FFE6DB] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-[#B23A12]">
          KI-Entwurf
        </span>
        <span className="block">
          Das tut uns leid, Herr Weber. Ist jemand verletzt? Wenn nicht: Fotos machen und das Kennzeichen notieren. Den
          Schaden melden Sie direkt hier: [Link]
        </span>
      </div>
      <div className="mt-2.5 flex justify-end gap-2">
        <span className="rounded-[9px] border border-line bg-surface px-3 py-1.5 font-medium">Bearbeiten</span>
        <span className="rounded-[9px] bg-ink px-3 py-1.5 font-medium text-white">Senden</span>
      </div>
    </Mini>
  );
}

// Beispieldaten erfunden, nur zur Veranschaulichung
function VorschauNewsletter() {
  return (
    <Mini className="h-full">
      <div className="flex items-center justify-between gap-2 border-b border-line pb-2.5">
        <span className="font-medium">Newsletter per WhatsApp</span>
        <span className="rounded-full bg-[#FFE6DB] px-2 py-0.5 text-[10.5px] font-medium text-[#B23A12]">geplant</span>
      </div>
      <div className="mt-3 max-w-[94%] rounded-[12px] rounded-bl-[4px] bg-bg px-3 py-2.5 leading-snug">
        Guten Morgen, Frau Becker. Die Unwettersaison beginnt. Ist Ihr Haus gegen Starkregen abgesichert? Wir prüfen
        das gern kurz für Sie.
        <span className="mt-2 block rounded-[8px] border border-line bg-surface py-1.5 text-center font-medium text-[#B23A12]">
          Rückruf anfragen
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[11.5px] text-ink-2">
        <dt>Empfänger:</dt>
        <dd>Kunden mit Einwilligung, Sparte Wohngebäude</dd>
        <dt>Versand:</dt>
        <dd>Dienstag, 9:00 Uhr</dd>
      </dl>
    </Mini>
  );
}

function VorschauWhatsApp() {
  return (
    <div className="grid w-full gap-5 sm:grid-cols-2">
      {[
        { label: "Service", inhalt: <VorschauChat /> },
        { label: "Vertrieb", inhalt: <VorschauNewsletter /> },
      ].map((v) => (
        <div key={v.label} className="flex min-w-0 flex-col">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-ink">{v.label}</p>
          <div className="flex-1">{v.inhalt}</div>
        </div>
      ))}
    </div>
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

