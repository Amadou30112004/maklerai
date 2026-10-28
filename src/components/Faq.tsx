import { site } from "@/config/site";
import { Container, SectionHead } from "./ui/Basis";
import { IconPlus } from "./ui/Icons";

const fragen: { f: string; a: string }[] = [
  {
    f: "Ich habe doch schon die App meines Pools.",
    a: `${site.name} ergänzt sie. Viele Kunden laden keine App herunter, ein Link funktioniert sofort. Ohne Maklermandat, ohne Bestandsübertragung, und unabhängig davon, welchen Pool Sie nutzen.`,
  },
  {
    f: "Brauche ich eine Schnittstelle zu meinem Verwaltungsprogramm?",
    a: "Nein. Sie bekommen die Meldung als PDF und als E-Mail-Entwurf und legen sie ab wie gewohnt.",
  },
  {
    f: "Muss mein Kunde eine App installieren?",
    a: "Nein. Der Link öffnet sich im Browser, am Handy oder am Rechner.",
  },
  {
    f: "Wie kommt der Link auf meine Website?",
    a: "Sie bekommen einen fertigen Button „Jetzt Schaden melden“ für Fußzeile, Menü oder Kontaktseite. Er funktioniert mit jedem Website-Baukasten.",
  },
  {
    f: "Für welche Sparten eignet sich die Schadenmeldung?",
    a: "Zum Start für Kfz und die privaten Sachsparten Hausrat, Wohngebäude, Privathaftpflicht und Glas. Weitere Sparten richten wir auf Anfrage ein.",
  },
  {
    f: "Was muss ich beim Datenschutz beachten?",
    a: `Sie nennen ${site.name} in Ihrer Datenschutzerklärung als Auftragsverarbeiter. Den Textbaustein und den AV-Vertrag bekommen Sie von uns.`,
  },
  {
    f: "Was kostet der Start?",
    a: "Der Einstieg ist kostenlos. Im Gegenzug wünschen wir uns ehrliches Feedback aus Ihrem Büroalltag.",
  },
  {
    f: "Wie läuft der Start ab?",
    a: "Im Erstgespräch klären wir, welche Lösung Ihr Büro am meisten entlastet. Danach richten wir sie für Sie ein. Den genauen Zeitplan besprechen wir gemeinsam.",
  },
  {
    f: "Ist ein WhatsApp-Kanal datenschutzkonform?",
    a: "Wir nutzen die offizielle WhatsApp-Business-Plattform, keine privaten Handys. Die datenschutzrechtliche Einordnung für Ihr Büro klären wir vor dem Start gemeinsam mit Ihnen.",
  },
  {
    f: "Darf ich per WhatsApp Newsletter und Angebote verschicken?",
    a: "Ja, an Kunden, die vorher eingewilligt haben. Wie Sie die Einwilligung sauber einholen, zum Beispiel über Ihre Website oder den ersten Chat, richten wir gemeinsam mit Ihnen ein. Die Kosten, die WhatsApp für solche Nachrichten berechnet, besprechen wir im Erstgespräch.",
  },
  {
    f: "Prüft die KI meine Verträge?",
    a: "Nein. Die KI erkennt, sortiert und bereitet vor. Prüfen und entscheiden bleibt bei Ihnen.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titel" className="py-16 sm:py-24">
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
