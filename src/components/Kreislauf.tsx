import { Container, Eyebrow } from "./ui/Basis";
import { Reveal, staffel } from "./ui/Reveal";

const stationen = [
  { nr: "1", titel: "Kunde meldet unvollständig", text: "Fotos fehlen, Schadentag unklar." },
  { nr: "2", titel: "Büro fragt nach", text: "Anruf, Mail, Messenger." },
  { nr: "3", titel: "Versicherer fordert nach", text: "Vertragsnummer, Belege, Details." },
];

// Bögen zwischen den Stationen (oben 270°, rechts unten 30°, links unten 150°) und die Pfeilspitzen an ihrem Ende
const boegen = [
  { d: "M 248 58 A 150 150 0 0 1 340 140", spitze: "M 339.6 139.1 L 340 140" },
  { d: "M 300 312 A 150 150 0 0 1 100 312", spitze: "M 100.9 312.4 L 100 312" },
  { d: "M 60 140 A 150 150 0 0 1 152 58", spitze: "M 151.1 58.4 L 152 58" },
];

const positionen = [
  "left-1/2 top-[12.5%]",
  "left-[82.5%] top-[68.75%]",
  "left-[17.5%] top-[68.75%]",
];

export function Kreislauf() {
  return (
    <section aria-labelledby="kreislauf-titel" className="py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Das Problem</Eyebrow>
            <h2 id="kreislauf-titel" className="mt-4 text-[32px] leading-[1.08] sm:text-[44px]">
              Eine unvollständige Meldung, und das Hin und Her beginnt.
            </h2>
            <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
              Drei Fotos per WhatsApp, die Vertragsnummer fehlt, der Schadentag ist unklar. Sie fragen beim Kunden nach,
              der Versicherer fragt bei Ihnen nach. Bis die Meldung vollständig ist, vergehen Tage.
            </p>
          </Reveal>

          <div>
            <KreisVisual />
            <ol className="sr-only">
              {stationen.map((s) => (
                <li key={s.nr}>{s.titel}</li>
              ))}
              <li>zurück zum Kunden</li>
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

function KreisVisual() {
  // Drei Stationen auf einem Kreis, verbunden mit Pfeilen im Uhrzeigersinn
  return (
    <div data-anim="" aria-hidden="true" className="kreis relative mx-auto aspect-square w-full max-w-[460px]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="kreis-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFB36B" />
            <stop offset="55%" stopColor="#FF5F3A" />
            <stop offset="100%" stopColor="#E8501E" />
          </linearGradient>
          <marker id="pfeil" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1 1l6 4-6 4" fill="none" stroke="#E8501E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <circle cx="200" cy="200" r="150" fill="none" stroke="#E2DED6" strokeWidth="1.5" strokeDasharray="3 7" />
        {boegen.map((b, i) => (
          <g key={b.d} style={staffel(i)}>
            <path
              d={b.d}
              pathLength={1}
              className="kreis-bogen"
              fill="none"
              stroke="url(#kreis-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d={b.spitze} className="kreis-spitze" fill="none" stroke="none" markerEnd="url(#pfeil)" />
          </g>
        ))}
        <circle cx="200" cy="200" r="78" fill="url(#kreis-grad)" opacity="0.1" />
      </svg>

      <div className="absolute left-1/2 top-[44%] w-[40%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[22px] font-medium leading-tight tracking-[-0.03em] sm:text-[32px]">Hin und Her</p>
        <p className="mt-1.5 text-[11px] leading-snug text-ink-2 sm:text-[13px]">bis alles vollständig ist</p>
      </div>

      {stationen.map((s, i) => (
        <div key={s.nr} className={`absolute -translate-x-1/2 -translate-y-1/2 ${positionen[i]} w-[38%] max-w-[190px] sm:w-[44%]`}>
          <div
            style={staffel(i)}
            className="kreis-station rounded-[16px] bg-surface p-3 shadow-[var(--shadow-float)] sm:p-3.5"
          >
            <span className="bg-grad grid size-6 place-items-center rounded-full text-[11px] font-medium text-white">
              {s.nr}
            </span>
            <p className="mt-2 text-[12px] font-medium leading-snug sm:text-[13px]">{s.titel}</p>
            <p className="mt-1 hidden text-[11.5px] leading-snug text-ink-2 sm:block">{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
