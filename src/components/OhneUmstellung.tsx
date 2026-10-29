import { site } from "@/config/site";
import { Container, Leuchten, SectionHead } from "./ui/Basis";
import { IconBildschirm, IconDatenbank, IconPersoenlich, IconSchild } from "./ui/Icons";
import { Reveal, staffel } from "./ui/Reveal";

const punkte = [
  { icon: IconBildschirm, titel: "Keine neue Software für Ihr Team" },
  { icon: IconDatenbank, titel: "Kein Umzug Ihrer Daten" },
  { icon: IconPersoenlich, titel: "Ihr Kundenkontakt bleibt persönlich" },
  { icon: IconSchild, titel: "Sie behalten die Kontrolle" },
];

// Dunkler, kurzer Abschnitt als Kontrast zur hellen Seite
export function OhneUmstellung() {
  return (
    <section
      id="ohne-umstellung"
      aria-labelledby="ohne-umstellung-titel"
      className="relative overflow-hidden bg-[#121212] py-12 text-white sm:py-16"
    >
      <Leuchten className="dunkel-leuchten -right-32 -top-40 size-[380px] sm:size-[520px]" />
      <Container className="relative">
        <Reveal>
          <SectionHead
            id="ohne-umstellung-titel"
            eyebrow="Ohne Umstellung"
            titel="Sie bleiben bei dem, was Sie haben."
            text="Ob VEMA, Pool-App, Maklersoftware oder eigene Ablage: Sie wechseln nichts. Wir setzen dort an, wo trotzdem noch Handarbeit bei Ihnen landet."
            dunkel
          />
        </Reveal>

        <ul data-stagger="" className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          {punkte.map((p, i) => (
            <li key={p.titel} style={staffel(i)}>
              <div className="flex h-full flex-col gap-3 rounded-[18px] border border-white/[0.08] bg-[#1C1C1C] p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                <span className="bg-grad grid size-11 shrink-0 place-items-center rounded-[13px] text-white shadow-[0_10px_28px_-10px_rgb(255_95_58/0.7)]">
                  <p.icon className="size-[22px]" />
                </span>
                <h3 className="text-[17px] leading-snug sm:text-[18px]">{p.titel}</h3>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[15px] leading-[1.6] text-[#D9D6D0]">
          <span className="font-medium text-white">Kundendaten gehören nicht aufs Privathandy:</span>{" "}
          {site.datenschutzVersprechen.join(" · ")}
        </p>
      </Container>
    </section>
  );
}
