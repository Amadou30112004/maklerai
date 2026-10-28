import { site } from "@/config/site";
import { AnfrageFormular } from "./AnfrageFormular";
import { Avatar, Container, Eyebrow } from "./ui/Basis";

export function Erstgespraech() {
  return (
    <section id="pilot" aria-labelledby="pilot-titel" className="py-16 sm:py-24">
      <Container>
        <div className="glow-panel grid gap-10 rounded-[28px] p-5 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-14">
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
          </div>
          <div className="relative rounded-[22px] bg-surface p-5 shadow-[var(--shadow-float)] sm:p-8">
            <AnfrageFormular />
          </div>
        </div>
      </Container>
    </section>
  );
}
