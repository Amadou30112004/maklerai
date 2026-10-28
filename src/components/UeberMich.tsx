import { site } from "@/config/site";
import { Avatar, Container, Eyebrow, PrimaryButton } from "./ui/Basis";
import { Reveal } from "./ui/Reveal";

export function UeberMich() {
  return (
    <section aria-labelledby="ueber-titel" className="py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Über mich</Eyebrow>
            <h2 id="ueber-titel" className="mt-4 text-[32px] leading-[1.08] sm:text-[44px]">
              Ich arbeite selbst im Innendienst.
            </h2>
            <p className="mt-5 max-w-[580px] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
              Ich bin {site.person.name} und arbeite selbst im Innendienst eines Maklerbüros. Ich kenne das: Der Kunde
              schickt drei Fotos per WhatsApp, die Vertragsnummer fehlt, und der Versicherer will noch die Rechnung.
              Diese Werkzeuge baue ich, weil sie mir selbst im Alltag gefehlt haben.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[22px] bg-surface p-6 shadow-[var(--shadow-float)] sm:p-7">
              <div className="flex items-center gap-4">
                <Avatar groesse={64} />
                <div className="min-w-0">
                  <p className="text-[18px] font-medium tracking-[-0.02em]">{site.person.name}</p>
                  <a
                    href={`mailto:${site.person.email}`}
                    className="inline-flex min-h-[32px] items-center text-[15px] text-ink-2 underline decoration-line underline-offset-4 can-hover:text-ink"
                  >
                    {site.person.email}
                  </a>
                  <br />
                  <a
                    href={site.person.telefonLink}
                    className="inline-flex min-h-[32px] items-center text-[15px] text-ink-2 underline decoration-line underline-offset-4 can-hover:text-ink"
                  >
                    {site.person.telefonAnzeige}
                  </a>
                </div>
              </div>
              <div className="mt-6 border-t border-line pt-6">
                <PrimaryButton href="#pilot" className="w-full justify-between">
                  Termin vereinbaren
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
