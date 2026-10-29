import { site } from "@/config/site";
import { AnfrageFormular } from "./AnfrageFormular";
import { Avatar, Container, Eyebrow, Leuchten } from "./ui/Basis";
import { IconMail } from "./ui/Icons";

// ID bleibt #pilot, weil bestehende Links darauf zeigen
export function Termin() {
  return (
    <section id="pilot" aria-labelledby="pilot-titel" className="overflow-x-clip py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="pt-2 lg:pt-6">
            <Eyebrow>Termin</Eyebrow>
            <h2 id="pilot-titel" className="mt-4 text-[34px] leading-[1.05] sm:text-[48px]">
              Prüfen wir gemeinsam Ihre Möglichkeiten.
            </h2>
            <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
              Vereinbaren Sie einen Termin. In 30 Minuten schauen wir auf Ihren Innendienst, und ich sage Ihnen ehrlich,
              was sich automatisieren lässt und was nicht.
            </p>

            <div className="mt-10 rounded-[22px] bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-7">
              <div className="flex items-center gap-4">
                <Avatar groesse={56} />
                <div className="min-w-0">
                  <p className="text-[17px] font-medium tracking-[-0.02em]">{site.person.name}</p>
                  <p className="text-[14.5px] text-ink-2">Ihr Ansprechpartner im Termin</p>
                </div>
              </div>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-2">
                Ich arbeite selbst im Innendienst eines Maklerbüros. Ich kenne das: Der Kunde schickt drei Fotos per
                WhatsApp, die Vertragsnummer fehlt, und der Versicherer will noch die Rechnung. Diese Werkzeuge baue ich,
                weil sie mir selbst im Alltag gefehlt haben.
              </p>
              <a
                href={`mailto:${site.person.email}`}
                className="press mt-5 inline-flex min-h-[44px] items-center gap-2.5 rounded-[12px] bg-bg px-4 text-[15px] font-medium can-hover:bg-surface-2"
              >
                <IconMail className="size-[18px]" />
                {site.person.email}
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            <Leuchten className="termin-leuchten -inset-y-8 inset-x-0 sm:-inset-x-6 lg:-inset-14" />
            <div className="relative rounded-[22px] bg-surface p-5 shadow-[var(--shadow-float)] sm:p-8">
              <AnfrageFormular />
            </div>
            <div className="relative mt-5 flex flex-col items-center gap-1.5 text-center text-[13.5px] text-ink-2">
              <p>Kostenlos · 30 Minuten · Ohne Verpflichtung</p>
              <p>
                Lieber gleich in den Kalender?{" "}
                <a
                  href={site.person.terminLink}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-[44px] items-center font-medium text-ink underline underline-offset-4"
                >
                  Termin direkt wählen
                  <span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
