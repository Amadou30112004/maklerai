import { Container, Eyebrow, PrimaryButton } from "./ui/Basis";
import { IconDokumentBlitz, IconFoto, IconPdf } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const sparten = ["Hausrat", "Wohngebäude", "Privathaftpflicht", "Glas", "weitere auf Anfrage"];

export function Hero() {
  return (
    <section aria-labelledby="hero-titel" className="pb-16 pt-10 sm:pt-16">
      <Container>
        <div className="mx-auto max-w-[860px] text-center">
          <div>
            <Eyebrow>Digitalisierung für Maklerbüros</Eyebrow>
            <h1
              id="hero-titel"
              className="mt-6 text-[40px] leading-[1.02] sm:text-[60px] lg:text-[72px]"
            >
              Wir digitalisieren den Innendienst Ihres Maklerbüros.
            </h1>
            <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
              Weniger Handarbeit, mehr Zeit für Beratung. Schadenmeldungen, Kundenanfragen und Dokumente
              laufen automatisch, Ihr Team prüft nur noch und gibt frei.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <PrimaryButton href="#pilot" size="lg">
                Kostenloses Erstgespräch
              </PrimaryButton>
              <p className="text-[13px] text-ink-2">
                Kostenloses Erstgespräch · ohne Vertragsbindung · persönlich betreut
              </p>
            </div>
          </div>
        </div>

        <Reveal delay={0.08}>
          <div className="glow-panel relative mt-14 overflow-hidden rounded-[28px] px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
            <div className="grid items-center gap-5 md:grid-cols-3 md:gap-6">
              <WebsiteKarte />
              <HandyKarte />
              <MailKarte />
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-[13px] text-ink-2">Schadenmeldung für</span>
          {sparten.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-ink"
            >
              {s}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Fensterleiste({ titel }: { titel: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
      <span className="size-2 rounded-full bg-surface-2" />
      <span className="size-2 rounded-full bg-surface-2" />
      <span className="size-2 rounded-full bg-surface-2" />
      <span className="ml-2 truncate rounded-full bg-bg px-2.5 py-0.5 text-[10px] text-ink-2">{titel}</span>
    </div>
  );
}

function WebsiteKarte() {
  return (
    <div
      aria-hidden="true"
      className="rounded-[18px] bg-surface shadow-[var(--shadow-float)] md:-rotate-2 md:translate-y-4"
    >
      <Fensterleiste titel="www.ihr-maklerbuero.de" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-20 rounded-full bg-ink/80" />
          <div className="flex gap-2">
            <span className="h-2 w-8 rounded-full bg-surface-2" />
            <span className="h-2 w-8 rounded-full bg-surface-2" />
            <span className="h-2 w-8 rounded-full bg-surface-2" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <span className="block h-3.5 w-4/5 rounded-full bg-ink/85" />
          <span className="block h-3.5 w-3/5 rounded-full bg-ink/85" />
          <span className="block h-2 w-11/12 rounded-full bg-surface-2" />
          <span className="block h-2 w-3/4 rounded-full bg-surface-2" />
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-accent px-3.5 py-2.5 text-[13px] font-medium text-white">
          <IconDokumentBlitz className="size-4" />
          Jetzt Schaden melden
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <span className="h-12 rounded-[10px] bg-bg" />
          <span className="h-12 rounded-[10px] bg-bg" />
          <span className="h-12 rounded-[10px] bg-bg" />
        </div>
      </div>
    </div>
  );
}

function HandyKarte() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[290px] md:-translate-y-3">
      <div className="rounded-[34px] bg-ink p-2 shadow-[var(--shadow-float)]">
        <div className="rounded-[27px] bg-surface px-4 pb-5 pt-3">
          <div className="mx-auto h-1.5 w-16 rounded-full bg-surface-2" />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[13px] font-medium">Schaden melden</span>
            <span className="text-[11px] text-ink-2">Schritt 2 von 3</span>
          </div>
          <div className="mt-2 flex gap-1">
            <span className="h-1 flex-1 rounded-full bg-accent" />
            <span className="h-1 flex-1 rounded-full bg-accent" />
            <span className="h-1 flex-1 rounded-full bg-surface-2" />
          </div>
          <MiniFeld label="Sparte" wert="Hausrat" />
          <MiniFeld label="Was ist passiert?" wert="Wasser aus der Waschmaschine, Laminat im Flur ist aufgequollen." mehrzeilig />
          <MiniFeld label="Schadentag" wert="14.03." />
          <p className="mt-3 text-[11px] text-ink-2">Fotos</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            <span className="bg-grad-soft grid aspect-square place-items-center rounded-[10px] text-orange-3">
              <IconFoto className="size-4" />
            </span>
            <span className="bg-grad-soft grid aspect-square place-items-center rounded-[10px] text-orange-3">
              <IconFoto className="size-4" />
            </span>
            <span className="grid aspect-square place-items-center rounded-[10px] border border-dashed border-line text-[18px] text-ink-2">
              +
            </span>
          </div>
          <div className="mt-4 rounded-[10px] bg-ink py-2.5 text-center text-[12px] font-medium text-white">
            Weiter
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniFeld({ label, wert, mehrzeilig = false }: { label: string; wert: string; mehrzeilig?: boolean }) {
  return (
    <div className="mt-3">
      <p className="text-[11px] text-ink-2">{label}</p>
      <div
        className={`mt-1 rounded-[9px] border border-line bg-bg px-2.5 py-2 text-[12px] leading-snug ${
          mehrzeilig ? "min-h-[48px]" : ""
        }`}
      >
        {wert}
      </div>
    </div>
  );
}

function MailKarte() {
  return (
    <div
      aria-hidden="true"
      className="rounded-[18px] bg-surface shadow-[var(--shadow-float)] md:rotate-2 md:translate-y-6"
    >
      <Fensterleiste titel="Entwurf" />
      <div className="space-y-2.5 p-5 text-[12px]">
        <MailZeile label="An" wert="schaden@versicherer.de" />
        <MailZeile label="Betreff" wert="Schadenmeldung Hausrat, Vertrag [NR]" />
        <div className="space-y-1.5 pt-2">
          <span className="block h-2 w-full rounded-full bg-surface-2" />
          <span className="block h-2 w-11/12 rounded-full bg-surface-2" />
          <span className="block h-2 w-4/5 rounded-full bg-surface-2" />
          <span className="block h-2 w-2/3 rounded-full bg-surface-2" />
        </div>
        <div className="flex items-center gap-2.5 rounded-[12px] border border-line p-2.5">
          <span className="bg-grad grid size-8 place-items-center rounded-[9px] text-white">
            <IconPdf className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">Schadenmeldung_Hausrat.pdf</p>
            <p className="text-[11px] text-ink-2">inkl. 4 Fotos</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <span className="rounded-[10px] bg-surface-2 px-3 py-2 text-[12px]">Bearbeiten</span>
          <span className="rounded-[10px] bg-ink px-3.5 py-2 text-[12px] font-medium text-white">Freigeben</span>
        </div>
      </div>
    </div>
  );
}

function MailZeile({ label, wert }: { label: string; wert: string }) {
  return (
    <div className="flex gap-2 border-b border-line pb-2">
      <span className="w-12 shrink-0 text-ink-2">{label}</span>
      <span className="truncate font-medium">{wert}</span>
    </div>
  );
}
