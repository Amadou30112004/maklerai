import { Container, SectionHead } from "./ui/Basis";
import { IconHaken } from "./ui/Icons";
import { Reveal, staffel } from "./ui/Reveal";

const schritte = [
  {
    titel: "Termin",
    text: "30 Minuten, kostenlos. Sie erzählen, wo im Innendienst die meiste Handarbeit liegt, und wir prüfen Ihre Möglichkeiten.",
  },
  {
    titel: "Einrichtung",
    text: "Wir richten eine einzige Automation für Ihr Büro ein. Erst wenn Sie mit dem Test zufrieden sind, geht sie in den Alltag.",
  },
  {
    titel: "Ihre Entscheidung",
    text: "Spart es Ihnen keine Zeit, sagen wir das ehrlich und hören auf. Für Sie entstehen dabei keine Kosten.",
  },
];

const danach = [
  "Ich melde mich innerhalb von zwei Werktagen persönlich bei Ihnen.",
  "Wir vereinbaren einen Termin, am Telefon oder bei Ihnen vor Ort.",
  "Sie bekommen danach eine kurze Zusammenfassung, was sich für Ihr Büro lohnt.",
];

export function Start() {
  return (
    <section id="start" aria-labelledby="start-titel" className="bg-surface-2 py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead id="start-titel" eyebrow="Start" titel="Eine Sache zuerst. Dann sehen Sie, ob es hilft." />
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
                <h3 className="text-[21px]">{s.titel}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="mt-8 rounded-[20px] border border-line bg-surface p-6 sm:p-8">
            <h3 className="text-[19px]">Was nach Ihrer Anfrage passiert</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-6">
              {danach.map((z) => (
                <li key={z} className="flex items-start gap-3 text-[15.5px] leading-relaxed">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#FFE6DB] text-orange-3">
                    <IconHaken className="size-3.5" strokeWidth={2.4} />
                  </span>
                  {z}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
