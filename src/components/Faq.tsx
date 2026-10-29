import { site } from "@/config/site";
import { Container, SectionHead } from "./ui/Basis";
import { IconPlus } from "./ui/Icons";

// Höchstens neun Fragen
const fragen: { f: string; a: string }[] = [
  {
    f: "Muss ich etwas umstellen?",
    a: "Nein. Sie bleiben bei VEMA, Ihrem Pool und Ihrer Maklersoftware. Wir setzen dort an, wo trotzdem noch Handarbeit bei Ihnen landet.",
  },
  {
    f: "Ich habe doch schon die App meines Pools.",
    a: "Gut so. Was Ihr Pool schon löst, bauen wir nicht nach. Wir schauen auf die Arbeit, die trotzdem noch von Hand bei Ihnen landet. Kann Ihr Pool etwas schon, sagen wir Ihnen das.",
  },
  {
    f: "Merken meine Kunden etwas davon?",
    a: "Nur, dass es schneller geht. Der Kontakt bleibt bei Ihnen. Wenn Kunden etwas nutzen, dann höchstens einen einfachen Link, keine App.",
  },
  {
    f: "Was passiert, wenn es mir nichts bringt?",
    a: "Dann hören wir auf. Der Start ist kostenlos, und Sie gehen keine Verpflichtung ein.",
  },
  {
    f: "Was kostet der Start, und wie läuft er ab?",
    a: "Der Start ist kostenlos. Im Termin klären wir, wo in Ihrem Innendienst die meiste Handarbeit liegt. Danach richten wir eine einzige Automation ein und testen sie mit Ihnen. Was eine dauerhafte Lösung kostet, besprechen wir offen, bevor Sie sich entscheiden.",
  },
  {
    f: "Brauche ich eine Schnittstelle zu meinem Verwaltungsprogramm?",
    a: "Nein. Sie bekommen die vorbereiteten Vorgänge zum Beispiel als PDF und als E-Mail-Entwurf und legen sie ab wie gewohnt.",
  },
  {
    f: "Was muss ich beim Datenschutz beachten?",
    a: `Sie nennen ${site.name} in Ihrer Datenschutzerklärung als Auftragsverarbeiter. Den Textbaustein und den AV-Vertrag bekommen Sie von uns.`,
  },
  {
    f: "Ist ein WhatsApp-Kanal datenschutzkonform?",
    a: "Wir nutzen die offizielle WhatsApp-Business-Plattform, keine privaten Handys. Die datenschutzrechtliche Einordnung für Ihr Büro klären wir vor dem Start gemeinsam mit Ihnen.",
  },
  {
    f: "Prüft die KI meine Verträge?",
    a: "Nein. Die KI erkennt, sortiert und bereitet vor. Prüfen und entscheiden bleibt bei Ihnen.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titel" className="bg-surface-2 py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead id="faq-titel" eyebrow="FAQ" titel="Häufige Fragen" />
          </div>
          <div className="divide-y divide-line rounded-[22px] bg-surface px-5 shadow-[var(--shadow-soft)] sm:px-7">
            {fragen.map((q) => (
              <details key={q.f} className="faq-eintrag group">
                <summary className="flex min-h-[64px] cursor-pointer items-center justify-between gap-4 py-4 text-[16.5px] font-medium">
                  <h3 className="text-[16.5px] leading-snug tracking-[-0.01em]">{q.f}</h3>
                  <span
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-bg transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    <IconPlus className="size-4" />
                  </span>
                </summary>
                <p className="pb-5 pr-10 text-[15.5px] leading-relaxed text-ink-2">{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
