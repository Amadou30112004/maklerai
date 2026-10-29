import { Container, SectionHead } from "./ui/Basis";
import { IconBriefe, IconFragen, IconKanaele, IconLupe, IconNachhaken, IconTastatur } from "./ui/Icons";
import { Reveal, staffel } from "./ui/Reveal";

const kacheln = [
  { icon: IconTastatur, titel: "Abtippen", text: "Angaben aus Mails, Fotos und Zetteln landen von Hand im System." },
  { icon: IconNachhaken, titel: "Nachhaken", text: "Es fehlt eine Unterlage, also noch ein Anruf, noch eine Mail." },
  { icon: IconLupe, titel: "Suchen", text: "Die richtige Police steckt irgendwo im Kundenordner." },
  { icon: IconBriefe, titel: "Änderungen", text: "Eine neue Adresse heißt Post an jeden Versicherer einzeln." },
  {
    icon: IconFragen,
    titel: "Immer dieselben Fragen",
    text: "Kunden fragen per Telefon und WhatsApp, was im Vertrag steht.",
  },
  { icon: IconKanaele, titel: "Verstreute Kanäle", text: "Mail, Telefon, WhatsApp, Post. Nichts liegt an einem Ort." },
];

// Desktop 3 × 2 Karten, mobil eine schlichte Liste ohne Kartenrahmen
export function Alltag() {
  return (
    <section id="alltag" aria-labelledby="alltag-titel" className="bg-surface-2 py-14 sm:py-16">
      <Container>
        <Reveal>
          <SectionHead
            id="alltag-titel"
            eyebrow="Innendienst"
            titel="Beim Kunden sind Sie schnell. Danach wartet der Schreibtisch."
            center
          />
        </Reveal>

        <ul
          data-stagger=""
          className="mt-8 divide-y divide-line sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-4 sm:divide-y-0 lg:grid-cols-3"
        >
          {kacheln.map((k, i) => (
            <li key={k.titel} style={staffel(i)}>
              <div className="alltag-kachel group h-full py-5 sm:rounded-[20px] sm:bg-surface sm:p-5 sm:shadow-[var(--shadow-soft)] sm:transition-[transform,box-shadow] sm:duration-300 sm:ease-out motion-safe:sm:can-hover:-translate-y-1 sm:can-hover:shadow-[var(--shadow-float)]">
                <div className="flex items-center gap-3.5">
                  <span className="relative inline-grid shrink-0">
                    <span aria-hidden="true" className="alltag-schein pointer-events-none absolute -inset-3 rounded-full" />
                    <span className="alltag-icon bg-grad relative grid size-10 place-items-center rounded-[12px] text-white shadow-[0_8px_20px_-8px_rgb(232_80_30/0.6)]">
                      <k.icon className="size-5" />
                    </span>
                  </span>
                  <h3 className="text-[19px] leading-snug">{k.titel}</h3>
                </div>
                <p className="mt-2.5 text-[17px] leading-[1.6] text-ink-2 lg:text-[18px]">{k.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mx-auto mt-8 max-w-[640px] text-center text-[20px] font-medium leading-snug tracking-[-0.02em] sm:mt-10 sm:text-[24px]">
            Diese Zeit fehlt Ihnen beim Kunden. Genau die holen wir zurück.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
