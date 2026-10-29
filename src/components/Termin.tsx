import { site } from "@/config/site";
import { AnfrageFormular } from "./AnfrageFormular";
import { Avatar, Container, Eyebrow, Leuchten } from "./ui/Basis";
import { IconMail } from "./ui/Icons";

const schritte = [
  { titel: "Termin", text: "30 Minuten, kostenlos." },
  { titel: "Einrichtung", text: "Eine Sache zuerst, erst nach Ihrem Test im Alltag." },
  { titel: "Ihre Entscheidung", text: "Hilft es nicht, hören wir auf, ohne Kosten für Sie." },
];

// ID bleibt #pilot, weil bestehende Links darauf zeigen.
// Desktop: links Text, Schritte, Person, rechts das Formular. Mobil: Text, Formular, danach Schritte und Person.
export function Termin() {
  return (
    <section id="pilot" aria-labelledby="pilot-titel" className="overflow-x-clip py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-x-16 lg:gap-y-8">
          <div className="lg:col-start-1 lg:row-start-1 lg:pt-4">
            <Eyebrow>Termin</Eyebrow>
            <h2 id="pilot-titel" className="mt-4 text-[34px] leading-[1.05] sm:text-[48px]">
              Prüfen wir gemeinsam Ihre Möglichkeiten.
            </h2>
            <p className="mt-5 max-w-[500px] text-[17px] leading-[1.6] text-ink-2 lg:text-[18px]">
              Vereinbaren Sie einen Termin. In 30 Minuten schauen wir auf Ihren Innendienst, und ich sage Ihnen ehrlich,
              was sich automatisieren lässt und was nicht.
            </p>
          </div>

          <div className="relative min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Leuchten className="termin-leuchten -inset-y-8 inset-x-0 sm:-inset-x-6 lg:-inset-14" />
            <div className="relative rounded-[22px] bg-surface p-5 shadow-[var(--shadow-float)] sm:p-8">
              <AnfrageFormular />
            </div>
            <div className="relative mt-5 flex flex-col items-center gap-1.5 text-center text-[15px] leading-[1.6] text-ink-2">
              <p>Ich melde mich innerhalb von zwei Werktagen persönlich bei Ihnen.</p>
              <p className="text-[14px]">Kostenlos · 30 Minuten · Ohne Verpflichtung</p>
              <p className="text-[14px]">
                Lieber gleich in den Kalender?{" "}
                <a
                  href={site.person.terminLink}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-[48px] items-center font-medium text-ink underline underline-offset-4"
                >
                  Termin direkt wählen
                  <span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:col-start-1 lg:row-start-2">
            <ol className="space-y-3">
              {schritte.map((s, i) => (
                <li key={s.titel} className="flex items-start gap-3.5">
                  <span className="bg-grad grid size-8 shrink-0 place-items-center rounded-full text-[15px] font-medium text-white">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-[17px] leading-[1.6] lg:text-[18px]">
                    <span className="font-medium">{s.titel}:</span> <span className="text-ink-2">{s.text}</span>
                  </p>
                </li>
              ))}
            </ol>

            <div className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6">
              <div className="flex items-center gap-4">
                <Avatar groesse={56} />
                <div className="min-w-0">
                  <p className="text-[17px] font-medium tracking-[-0.02em]">{site.person.name}</p>
                  <p className="text-[15px] text-ink-2">Ihr Ansprechpartner im Termin</p>
                </div>
              </div>
              <p className="mt-4 text-[17px] leading-[1.6] text-ink-2">
                Ich arbeite selbst im Innendienst eines Maklerbüros und baue die Werkzeuge, die mir dort gefehlt haben.
              </p>
              <a
                href={`mailto:${site.person.email}`}
                className="press mt-4 inline-flex min-h-[48px] items-center gap-2.5 rounded-[12px] bg-bg px-4 text-[16px] font-medium can-hover:bg-surface-2"
              >
                <IconMail className="size-[18px]" />
                {site.person.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
