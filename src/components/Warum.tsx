import { site } from "@/config/site";
import { Container, IconKachel, SectionHead } from "./ui/Basis";
import { IconKompass, IconPinsel, IconVertrag } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const punkte = [
  {
    icon: IconKompass,
    titel: "Poolunabhängig",
    text: "Kein Maklermandat, keine Bestandsübertragung. Bleibt auch, wenn Sie den Pool wechseln.",
  },
  {
    icon: IconVertrag,
    titel: "Versicherergerecht",
    text: "Pflichtangaben je Sparte, abgestimmt auf die Anforderungen der Versicherer.",
  },
  {
    icon: IconPinsel,
    titel: "Ihr Design",
    text: "Ihr Logo, Ihre Farben, Ihr Büroname. Ihr Kunde sieht Ihr Büro.",
  },
];

export function Warum() {
  return (
    <section aria-labelledby="warum-titel" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead id="warum-titel" eyebrow="Unterschied" titel={`Warum ${site.name}`} />
        </Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {punkte.map((p, i) => (
            <li key={p.titel}>
              <Reveal delay={i * 0.05} className="h-full">
                <div className="h-full rounded-[20px] border border-line bg-surface/60 p-6 sm:p-7">
                  <IconKachel icon={p.icon} klein />
                  <h3 className="mt-5 text-[21px]">{p.titel}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{p.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
