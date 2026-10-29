import { site } from "@/config/site";
import { Avatar, Container, Leuchten, SectionHead } from "./ui/Basis";
import {
  IconBildschirm,
  IconDatenbank,
  IconEU,
  IconKeinTraining,
  IconPersoenlich,
  IconSchild,
  IconTrennung,
  IconVertrag,
} from "./ui/Icons";
import { Reveal, staffel } from "./ui/Reveal";

const punkte = [
  {
    icon: IconBildschirm,
    titel: "Keine neue Software für Ihr Team",
    text: "Ihre Abläufe bleiben, wie Sie sie kennen.",
  },
  { icon: IconDatenbank, titel: "Kein Umzug Ihrer Daten", text: "Wir bauen Ihren Bestand nicht um." },
  {
    icon: IconPersoenlich,
    titel: "Ihr Kundenkontakt bleibt persönlich",
    text: "Keine automatischen Anrufe oder Serienbriefe. Wir arbeiten im Hintergrund, Sie bleiben das Gesicht für Ihre Kunden.",
  },
  { icon: IconSchild, titel: "Sie behalten die Kontrolle", text: "Die KI bereitet vor, Ihr Team prüft und gibt frei." },
];

const abzeichenIcons = [IconEU, IconVertrag, IconTrennung, IconKeinTraining];

// Dunkler Abschnitt als Kontrast zur hellen Seite
export function OhneUmstellung() {
  return (
    <section
      id="ohne-umstellung"
      aria-labelledby="ohne-umstellung-titel"
      className="relative overflow-hidden bg-[#121212] py-16 text-white sm:py-24"
    >
      <Leuchten className="dunkel-leuchten -right-32 -top-40 size-[420px] sm:size-[560px]" />
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

        <ul data-stagger="" className="mt-12 grid gap-4 md:grid-cols-2">
          {punkte.map((p, i) => (
            <li key={p.titel} style={staffel(i)}>
              <div className="flex h-full gap-5 rounded-[20px] border border-white/[0.08] bg-[#1C1C1C] p-6 sm:p-7">
                <span className="bg-grad grid size-12 shrink-0 place-items-center rounded-[14px] text-white shadow-[0_10px_28px_-10px_rgb(255_95_58/0.7)]">
                  <p.icon className="size-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[20px] leading-snug">{p.titel}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-[#D9D6D0]">{p.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid items-center gap-8 border-t border-white/[0.08] pt-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h3 className="text-[26px] leading-tight sm:text-[32px]">Kundendaten gehören nicht aufs Privathandy.</h3>
          </Reveal>
          <ul data-stagger="" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {site.datenschutzVersprechen.map((v, i) => {
              const Icon = abzeichenIcons[i];
              return (
                <li key={v} style={staffel(i)}>
                  <div className="flex h-full flex-col items-center rounded-[18px] bg-white/[0.06] p-4 text-center ring-1 ring-white/10">
                    <span className="grid size-14 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
                      <span className="bg-grad grid size-10 place-items-center rounded-full text-white">
                        <Icon className="size-5" />
                      </span>
                    </span>
                    <span className="mt-3 text-[14px] font-medium leading-snug text-white">{v}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal>
          <div className="mt-12 flex items-center gap-4">
            <Avatar groesse={48} />
            <p className="max-w-[560px] text-[15.5px] leading-relaxed text-[#D9D6D0]">
              <span className="font-medium text-white">{site.person.name}:</span> Ich arbeite selbst im Makler-Innendienst
              und baue, was mir dort gefehlt hat.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
