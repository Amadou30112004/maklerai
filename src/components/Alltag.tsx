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

export function Alltag() {
  return (
    <section id="alltag" aria-labelledby="alltag-titel" className="bg-surface-2 py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead
            id="alltag-titel"
            eyebrow="Innendienst"
            titel="Beim Kunden sind Sie schnell. Danach wartet der Schreibtisch."
            center
          />
        </Reveal>

        <ul data-stagger="" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kacheln.map((k, i) => (
            <li key={k.titel} style={staffel(i)}>
              <div className="alltag-kachel group h-full rounded-[20px] bg-surface p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 ease-out motion-safe:can-hover:-translate-y-1 can-hover:shadow-[var(--shadow-float)]">
                <span className="relative inline-grid">
                  <span aria-hidden="true" className="alltag-schein pointer-events-none absolute -inset-3 rounded-full" />
                  <span className="alltag-icon bg-grad relative grid size-11 place-items-center rounded-[13px] text-white shadow-[0_8px_20px_-8px_rgb(232_80_30/0.6)]">
                    <k.icon className="size-[22px]" />
                  </span>
                </span>
                <h3 className="mt-5 text-[19px]">{k.titel}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-2">{k.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mx-auto mt-12 max-w-[640px] text-center text-[21px] font-medium leading-snug tracking-[-0.02em] sm:text-[24px]">
            Diese Zeit fehlt Ihnen beim Kunden. Genau die holen wir zurück.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
