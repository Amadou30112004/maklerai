import { site } from "@/config/site";
import { AnfrageFormular } from "./AnfrageFormular";
import { Avatar, Container, Eyebrow } from "./ui/Basis";
import { IconChat, IconTelefon } from "./ui/Icons";

export function Erstgespraech() {
  return (
    <section id="pilot" aria-labelledby="pilot-titel" className="py-16 sm:py-24">
      <Container>
        <div className="glow-panel grid grid-cols-1 gap-10 rounded-[28px] p-5 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-14">
          <div className="px-1 pt-3 lg:pt-6">
            <Eyebrow>Erstgespräch</Eyebrow>
            <h2 id="pilot-titel" className="mt-4 text-[34px] leading-[1.05] sm:text-[48px]">
              Entlasten Sie Ihren Innendienst.
            </h2>
            <p className="mt-5 max-w-[460px] text-[17px] leading-relaxed text-ink sm:text-lg">
              Beantworten Sie vier kurze Fragen und buchen Sie direkt Ihren Termin mit {site.person.name}. Kostenlos und
              ohne Vertragsbindung.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Avatar groesse={64} rand />
              <div>
                <p className="text-[17px] font-medium tracking-[-0.02em]">{site.person.name}</p>
                <p className="text-[14.5px] text-ink">Ihr Ansprechpartner im Erstgespräch</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-[15px] font-medium">Lieber direkt sprechen?</p>
              <ul className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <li>
                  <a
                    href={site.person.telefonLink}
                    className="press inline-flex min-h-[44px] items-center gap-2.5 rounded-[12px] bg-white/70 px-4 text-[15px] font-medium can-hover:bg-white"
                  >
                    <IconTelefon className="size-[18px]" />
                    {site.person.telefonAnzeige} anrufen
                  </a>
                </li>
                <li>
                  <a
                    href={site.person.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press inline-flex min-h-[44px] items-center gap-2.5 rounded-[12px] bg-white/70 px-4 text-[15px] font-medium can-hover:bg-white"
                  >
                    <IconChat className="size-[18px]" />
                    Per WhatsApp schreiben
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative min-w-0 rounded-[22px] bg-surface p-5 shadow-[var(--shadow-float)] sm:p-8">
            <AnfrageFormular />
          </div>
        </div>
      </Container>
    </section>
  );
}
