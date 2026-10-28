import { site } from "@/config/site";
import { Container, SectionHead } from "./ui/Basis";
import { IconEU, IconKeinTraining, IconTrennung, IconVertrag } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const icons = [IconEU, IconVertrag, IconTrennung, IconKeinTraining];

export function Datenschutz() {
  return (
    <section aria-labelledby="datenschutz-titel" className="py-16 sm:py-24">
      <Container>
        <div className="rounded-[28px] bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <SectionHead
                id="datenschutz-titel"
                eyebrow="Datenschutz"
                titel="Datenschutz, wie Schadendaten ihn brauchen"
                text="Schadenfotos und Kundendaten gehören nicht in private Chats."
              />
            </Reveal>
            <ul className="grid grid-cols-2 gap-4">
              {site.datenschutzVersprechen.map((v, i) => {
                const Icon = icons[i];
                return (
                  <li key={v}>
                    <Reveal delay={i * 0.04} className="h-full">
                      <div className="flex h-full flex-col items-center rounded-[20px] bg-bg p-5 text-center">
                        <span className="grid size-16 place-items-center rounded-full bg-surface ring-1 ring-line">
                          <span className="bg-grad grid size-11 place-items-center rounded-full text-white">
                            <Icon className="size-5" />
                          </span>
                        </span>
                        <span className="mt-3 text-[14.5px] font-medium leading-snug">{v}</span>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
