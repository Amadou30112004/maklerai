import { Container, SectionHead } from "./ui/Basis";
import { Reveal } from "./ui/Reveal";

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

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {schritte.map((s, i) => (
            <li key={s.titel}>
              <Reveal delay={i * 0.05} className="h-full">
                <div className="relative h-full rounded-[20px] bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="bg-grad grid size-10 place-items-center rounded-full text-[15px] font-medium text-white">
                      {i + 1}
                    </span>
                    <span className="text-[12px] uppercase tracking-[0.1em] text-ink-2">Schritt {i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-[21px]">{s.titel}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
