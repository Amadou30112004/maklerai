import { Container, PrimaryButton, SectionHead } from "./ui/Basis";
import { Reveal, staffel } from "./ui/Reveal";

const schritte = [
  {
    titel: "Link öffnen",
    text: "Ihr Kunde klickt auf „Jetzt Schaden melden“ auf Ihrer Website oder bekommt den Link per Mail oder SMS. Das Formular öffnet sich als eigene Seite in Ihrem Design.",
  },
  {
    titel: "Am Handy melden",
    text: "Ihr Kunde meldet am Handy, inklusive Fotos. Das Formular fragt genau die Angaben ab, die der Versicherer für die Sparte braucht.",
  },
  {
    titel: "Prüfen und freigeben",
    text: "Sie erhalten die fertige Schadenmeldung als PDF und einen vorbereiteten E-Mail-Entwurf an den Versicherer. Sie prüfen nur noch und geben frei.",
  },
];

export function Ablauf() {
  return (
    <section id="ablauf" aria-labelledby="ablauf-titel" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead
            id="ablauf-titel"
            eyebrow="So funktioniert die Schadenmeldung"
            titel="Vom Schaden zur fertigen Meldung, ohne Nachfragen."
          />
        </Reveal>

        {/* Zeitleiste: mobil Nummern links mit Linie nach unten, ab md Nummern oben mit Linie nach rechts */}
        <ol data-stagger="" data-anim="" className="ablauf mt-12 grid gap-5 md:grid-cols-3">
          {schritte.map((s, i) => (
            <li
              key={s.titel}
              style={staffel(i)}
              className="relative grid grid-cols-[40px_1fr] gap-4 md:flex md:flex-col md:gap-4"
            >
              <span className="bg-grad relative z-10 grid size-10 place-items-center rounded-full text-[15px] font-medium text-white">
                {i + 1}
              </span>
              {i < schritte.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[19px] top-12 h-[calc(100%-36px)] w-0.5 overflow-hidden rounded-full bg-line md:left-12 md:top-[19px] md:h-0.5 md:w-[calc(100%-36px)]"
                >
                  <span className="ablauf-fuellung bg-grad absolute inset-0" style={staffel(i)} />
                </span>
              )}
              <div className="h-full rounded-[20px] bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-7">
                <span className="text-[12px] uppercase tracking-[0.1em] text-ink-2">Schritt {i + 1}</span>
                <h3 className="mt-2 text-[21px]">{s.titel}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="mt-10 flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-center lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <p className="text-[18px] font-medium tracking-[-0.01em]">Probieren Sie es selbst, am besten am Handy.</p>
              <PrimaryButton href="/demo/schadenmeldung">Demo öffnen</PrimaryButton>
            </div>
            {/* QR-Code zur Demo, damit man sie vom Bildschirm direkt am Handy öffnen kann */}
            <div className="hidden size-[112px] shrink-0 place-items-center rounded-[16px] border border-dashed border-line bg-surface p-3 text-center text-[11px] leading-snug text-ink-2 lg:grid">
              [QR-CODE ZUR DEMO, nach Livegang erzeugen]
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
