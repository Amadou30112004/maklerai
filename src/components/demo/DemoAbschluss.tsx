"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { site } from "@/config/site";
import { anhangName, erzeugeBetreff, erzeugeText, formatDatum, spartenName } from "@/lib/demo/email";
import { BUERO, sichtbareFelder, spartenNach } from "@/lib/demo/sparten";
import type { Meldung } from "@/lib/demo/typen";
import { IconPdf, IconPfeilRechts } from "../ui/Icons";
import { LogoMV } from "./DemoIcons";
import type { Eingang } from "./zustand";

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const betrag = (v: string) => {
  const n = Number(v.trim().replace(/\./g, "").replace(",", "."));
  return v.trim() && Number.isFinite(n) ? euro.format(n) : "";
};

const wertText = (w: unknown) => (Array.isArray(w) ? w.join(", ") : String(w ?? ""));

// Hinweise, die der Kunde im Formular gesehen hat
function gezeigteHinweise(m: Meldung) {
  if (!m.sparte) return [];
  const sparte = spartenNach[m.sparte];
  const liste = sichtbareFelder(sparte, m.felder).flatMap((f) =>
    (f.hinweise ?? []).filter((h) => h.bei === m.felder[f.id]).map((h) => h.text),
  );
  if (sparte.abschnittHinweis) liste.push(sparte.abschnittHinweis);
  return liste;
}

export function KundenSicht({ m }: { m: Meldung }) {
  const abschleppen = m.sparte === "kfz" && m.felder.fahrbereit === "Nein";
  return (
    <div className="text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--marke)] text-white">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      </div>
      <p className="mt-4 text-[22px] font-medium leading-tight tracking-[-0.02em]">
        Danke, {m.vorname.trim()}. Ihre Meldung ist bei uns eingegangen.
      </p>
      <p className="mt-2 text-[16px]">Wir melden uns innerhalb eines Werktags bei Ihnen.</p>
      <p className="mt-1 text-[13px] text-ink-2">(Text legt Ihr Büro fest)</p>
      {abschleppen && (
        <p className="mt-4 rounded-[12px] bg-[#FFF3E0] px-4 py-3 text-[15px] text-[#6B3A00]">
          Brauchen Sie einen Abschleppdienst? Rufen Sie uns an.
        </p>
      )}
    </div>
  );
}

export function BueroSicht({ m, eingang }: { m: Meldung; eingang: Eingang }) {
  const [reiter, setReiter] = useState<"pdf" | "mail">("pdf");
  const id = useId();
  const reiterListe = [
    { key: "pdf" as const, label: "Schadenmeldung (PDF)" },
    { key: "mail" as const, label: "E-Mail an den Versicherer" },
  ];
  return (
    <section aria-labelledby={`${id}-titel`} className="demo-buero rounded-[24px] bg-bg p-4 sm:p-6">
      <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] shadow-[var(--shadow-soft)]">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        Sicht Ihres Büros
      </p>
      <h2 id={`${id}-titel`} className="mt-3 text-[26px] leading-tight sm:text-[30px]">
        Und das bekommt Ihr Büro
      </h2>
      <div role="tablist" aria-label="Ergebnis für das Büro" className="mt-4 grid grid-cols-2 gap-1 rounded-[14px] bg-surface-2 p-1">
        {reiterListe.map((r) => (
          <button
            key={r.key}
            role="tab"
            id={`${id}-${r.key}`}
            aria-selected={reiter === r.key}
            aria-controls={`${id}-${r.key}-panel`}
            onClick={() => setReiter(r.key)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const n = reiter === "pdf" ? "mail" : "pdf";
                setReiter(n);
                document.getElementById(`${id}-${n}`)?.focus();
              }
            }}
            tabIndex={reiter === r.key ? 0 : -1}
            className={`min-h-[44px] rounded-[11px] px-2 text-[14px] font-medium leading-tight ${
              reiter === r.key ? "bg-surface shadow-[var(--shadow-soft)]" : "text-ink-2"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div id={`${id}-pdf-panel`} role="tabpanel" aria-labelledby={`${id}-pdf`} hidden={reiter !== "pdf"} className="mt-4">
        <PdfVorschau m={m} eingang={eingang} />
      </div>
      <div id={`${id}-mail-panel`} role="tabpanel" aria-labelledby={`${id}-mail`} hidden={reiter !== "mail"} className="mt-4">
        <EmailEntwurf m={m} />
      </div>
    </section>
  );
}

function Abschnitt({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <section className="mt-[3.2cqw] break-inside-avoid">
      <h3 className="border-b border-[#d9d9d9] pb-[0.8cqw] text-[2.4cqw] font-semibold uppercase tracking-[0.08em] text-[#333]">
        {titel}
      </h3>
      <div className="mt-[1.2cqw]">{children}</div>
    </section>
  );
}

function Zeilen({ daten }: { daten: [string, string][] }) {
  return (
    <dl className="grid grid-cols-[34%_1fr] gap-x-[2cqw] gap-y-[0.8cqw] text-[2.3cqw] leading-snug">
      {daten
        .filter(([, w]) => w)
        .map(([k, w]) => (
          <div key={k} className="contents">
            <dt className="text-[#555]">{k}</dt>
            <dd className="whitespace-pre-wrap text-[#111]">{w}</dd>
          </div>
        ))}
    </dl>
  );
}

// A4-Vorschau als HTML. Schriftgrößen in cqw, damit die Seite auf jeder Breite gleich aussieht.
function PdfVorschau({ m, eingang }: { m: Meldung; eingang: Eingang }) {
  const sparte = m.sparte ? spartenNach[m.sparte] : null;
  const zeit = new Date(eingang.zeit);
  const hinweise = gezeigteHinweise(m);
  return (
    <div>
      <div className="druck-rahmen [container-type:inline-size] mx-auto w-full max-w-[640px]">
        <article className="druck-seite aspect-[1/1.414] bg-white p-[6cqw] text-[#111] shadow-[0_2px_4px_rgb(0_0_0/0.06),0_20px_40px_-20px_rgb(0_0_0/0.3)]">
          <header className="flex items-start justify-between gap-[3cqw] border-b-2 border-[var(--marke)] pb-[2.4cqw]">
            <div className="flex items-center gap-[2cqw]">
              <LogoMV className="size-[8cqw]" />
              <div>
                <p className="text-[3cqw] font-semibold leading-tight">{BUERO.name}</p>
                <p className="text-[2cqw] text-[#555]">{BUERO.anschrift}</p>
              </div>
            </div>
            <div className="text-right text-[2cqw] leading-relaxed text-[#555]">
              <p>
                Eingang {zeit.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })},{" "}
                {zeit.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
              </p>
              <p className="font-medium text-[#111]">{eingang.nummer}</p>
            </div>
          </header>
          <h2 className="mt-[3.6cqw] text-[4.4cqw] font-semibold tracking-[-0.02em]">Schadenmeldung {spartenName(m)}</h2>

          <Abschnitt titel="Versicherungsnehmer">
            <Zeilen
              daten={[
                ["Name", `${m.vorname.trim()} ${m.nachname.trim()}`],
                ["Telefon", m.telefon],
                ["E-Mail", m.email],
                ["Rückruf gewünscht", m.sparte === "kfz" ? m.rueckruf : ""],
              ]}
            />
          </Abschnitt>
          <Abschnitt titel="Vertrag">
            <Zeilen daten={[["Vertragsnummer", m.vertragsnummer.trim() || "wird nachgereicht"]]} />
          </Abschnitt>
          <Abschnitt titel="Schaden">
            <Zeilen
              daten={[
                ["Schadentag", formatDatum(m.schadentag)],
                ["Uhrzeit ungefähr", m.uhrzeit ? `${m.uhrzeit} Uhr` : ""],
                ["Schadenort", sparte?.versicherungsort && m.gleicheAdresse ? "Versicherungsort laut Vertrag" : m.schadenort],
                ["Was ist passiert?", m.beschreibung.trim()],
              ]}
            />
          </Abschnitt>
          {sparte && (
            <Abschnitt titel={`Angaben ${sparte.name}`}>
              <Zeilen daten={sichtbareFelder(sparte, m.felder).map((f) => [f.label, wertText(m.felder[f.id])])} />
            </Abschnitt>
          )}
          {m.gegenstaende.length > 0 && sparte?.gegenstaende && (
            <Abschnitt titel="Gegenstände">
              <table className="w-full text-left text-[2.2cqw]">
                <thead className="text-[#555]">
                  <tr>
                    <th className="pb-[0.8cqw] font-normal">Bezeichnung</th>
                    <th className="pb-[0.8cqw] font-normal">Anschaffung</th>
                    <th className="pb-[0.8cqw] text-right font-normal">Neupreis ca.</th>
                  </tr>
                </thead>
                <tbody>
                  {m.gegenstaende.map((g) => (
                    <tr key={g.id} className="border-t border-[#eee]">
                      <td className="py-[0.8cqw]">{g.bezeichnung}</td>
                      <td className="py-[0.8cqw]">{g.jahr}</td>
                      <td className="py-[0.8cqw] text-right tabular-nums">{betrag(g.neupreis)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Abschnitt>
          )}
          <Abschnitt titel={`Fotos (${m.fotos.length})`}>
            {m.fotos.length ? (
              <div className="grid grid-cols-4 gap-[1.4cqw]">
                {m.fotos.map((f) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={f.id} src={f.url} alt={f.name} className="aspect-square w-full rounded-[0.8cqw] object-cover" />
                ))}
              </div>
            ) : (
              <p className="text-[2.3cqw] text-[#555]">Keine Fotos, Kaufbeleg wird gegebenenfalls nachgereicht.</p>
            )}
          </Abschnitt>
          {hinweise.length > 0 && (
            <Abschnitt titel="Hinweise an den Kunden">
              <ul className="list-disc space-y-[0.6cqw] pl-[3cqw] text-[2.3cqw]">
                {hinweise.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Abschnitt>
          )}
          <p className="mt-[4cqw] flex items-center gap-[1.4cqw] rounded-[1cqw] bg-[#F1F5F2] px-[2cqw] py-[1.4cqw] text-[2.3cqw] font-medium text-[#1E4D33]">
            <svg viewBox="0 0 12 12" className="size-[2.6cqw]" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="m2.5 6.3 2.4 2.3 4.6-5" />
            </svg>
            Vollständigkeit geprüft: alle Pflichtangaben vorhanden
          </p>
        </article>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => window.print()}
          className="press inline-flex min-h-[48px] items-center gap-2 rounded-[12px] bg-ink px-5 text-[15px] font-medium text-white"
        >
          <IconPdf className="size-[18px]" />
          Als PDF speichern
        </button>
      </div>
    </div>
  );
}

function EmailEntwurf({ m }: { m: Meldung }) {
  const [text, setText] = useState(() => erzeugeText(m));
  const [bearbeiten, setBearbeiten] = useState(false);
  const [freigegeben, setFreigegeben] = useState(false);
  const id = useId();
  return (
    <div className="rounded-[18px] bg-surface p-4 text-[14.5px] shadow-[var(--shadow-soft)] sm:p-5">
      <dl className="space-y-2 border-b border-line pb-3">
        <div className="flex gap-3">
          <dt className="w-16 shrink-0 text-ink-2">An</dt>
          <dd className="min-w-0 break-all font-medium">{BUERO.versichererMail}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-16 shrink-0 text-ink-2">Betreff</dt>
          <dd className="min-w-0 font-medium">{erzeugeBetreff(m)}</dd>
        </div>
      </dl>
      {bearbeiten ? (
        <>
          <label htmlFor={`${id}-text`} className="sr-only">
            Text der E-Mail
          </label>
          <textarea
            id={`${id}-text`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            className="demo-feld mt-3 resize-y leading-relaxed"
          />
        </>
      ) : (
        <p className="mt-3 whitespace-pre-wrap leading-relaxed">{text}</p>
      )}
      <div className="mt-3 flex items-center gap-2.5 rounded-[12px] border border-line p-2.5">
        <span className="bg-grad grid size-9 shrink-0 place-items-center rounded-[10px] text-white">
          <IconPdf className="size-[18px]" />
        </span>
        <span className="min-w-0 break-all font-medium">{anhangName(m)}</span>
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => setBearbeiten((b) => !b)}
          className="press min-h-[44px] rounded-[11px] border border-line bg-surface px-4 font-medium"
        >
          {bearbeiten ? "Fertig" : "Bearbeiten"}
        </button>
        <button
          type="button"
          onClick={() => setFreigegeben(true)}
          className="press min-h-[44px] rounded-[11px] bg-ink px-5 font-medium text-white"
        >
          Freigeben
        </button>
      </div>
      <div aria-live="polite">
        {freigegeben && (
          <p className="mt-3 rounded-[12px] bg-[#FFE6DB] px-4 py-3 text-[14.5px] text-[#7A2A10]">
            In Ihrem Büro geht die E-Mail jetzt an den Versicherer. In dieser Demo wird nichts versendet.
          </p>
        )}
      </div>
    </div>
  );
}

export function AbschlussAktionen({ onNeu }: { onNeu: () => void }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
      <button
        type="button"
        onClick={onNeu}
        className="press min-h-[52px] rounded-[12px] bg-surface-2 px-5 text-[16px] font-medium"
      >
        Neue Demo starten
      </button>
      <Link
        href="/#pilot"
        className="press inline-flex min-h-[52px] items-center justify-between gap-3 rounded-[12px] bg-ink py-2 pl-5 pr-2 text-[16px] font-medium text-white"
      >
        Termin vereinbaren
        <span className="grid size-9 place-items-center rounded-[9px] bg-white text-ink" aria-hidden="true">
          <IconPfeilRechts className="size-4" />
        </span>
      </Link>
    </div>
  );
}

export const technikZeile = `Technik: ${site.name}`;
