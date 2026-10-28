import { Container, IconKachel } from "./ui/Basis";
import { IconChat, IconEuro, IconTeam, IconUhr } from "./ui/Icons";
import { staffel } from "./ui/Reveal";

const vorteile = [
  {
    icon: IconUhr,
    titel: "Zeit sparen",
    text: "Kein Abtippen, kein Zusammensuchen von Fotos und Angaben.",
  },
  {
    icon: IconEuro,
    titel: "Kosten sparen",
    text: "Weniger Arbeitszeit pro Schaden. Rechnen Sie es unten für Ihr Büro aus.",
  },
  {
    icon: IconChat,
    titel: "Weniger Rückfragen",
    text: "Vollständige Meldungen nach den Anforderungen der Versicherer, von Anfang an.",
  },
  {
    icon: IconTeam,
    titel: "Mitarbeiter entlasten",
    text: "Ihr Innendienst prüft und gibt frei, statt hinterherzutelefonieren.",
  },
];

export function Vorteile() {
  return (
    <section aria-label="Vorteile" className="py-12 sm:py-16">
      <Container>
        <ul data-stagger="" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {vorteile.map((v, i) => (
            <li key={v.titel} style={staffel(i)}>
              <div className="h-full rounded-[20px] bg-surface p-6 shadow-[var(--shadow-soft)]">
                <IconKachel icon={v.icon} klein />
                <h3 className="mt-5 text-[19px]">{v.titel}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
