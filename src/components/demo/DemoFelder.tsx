"use client";

import type { ReactNode } from "react";
import { istPflicht } from "@/lib/demo/sparten";
import type { Feld, FeldWert, Felder } from "@/lib/demo/typen";
import { feldDomId } from "@/lib/demo/typen";
import { IconInfo, IconWarnung } from "./DemoIcons";

export function FeldFehler({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 text-[14px] font-medium text-[#A3271A]">
      {text}
    </p>
  );
}

export function Hinweis({ children, warnung = false }: { children: ReactNode; warnung?: boolean }) {
  const Icon = warnung ? IconWarnung : IconInfo;
  return (
    <p
      className={`mt-2.5 flex gap-2.5 rounded-[12px] px-3.5 py-3 text-[14.5px] leading-snug ${
        warnung ? "bg-[#FFF3E0] text-[#6B3A00]" : "bg-[color-mix(in_srgb,var(--marke)_8%,white)] text-[#1d2733]"
      }`}
    >
      <Icon className="mt-px size-[18px] shrink-0" />
      <span>{children}</span>
    </p>
  );
}

const optional = <span className="font-normal text-ink-2"> (optional)</span>;

type Gemeinsam = {
  feldKey: string;
  label: string;
  pflicht: boolean;
  fehler?: string;
  hilfe?: string;
  onBlur?: () => void;
};

// Auswahl als große Kacheln, eine (radio) oder mehrere (checkbox)
export function Kacheln({
  feldKey,
  label,
  pflicht,
  fehler,
  hilfe,
  optionen,
  wert,
  mehrfach = false,
  onChange,
  spalten = 2,
}: Gemeinsam & {
  optionen: readonly string[];
  wert: FeldWert | undefined;
  mehrfach?: boolean;
  onChange: (w: FeldWert) => void;
  spalten?: 1 | 2;
}) {
  const id = feldDomId(feldKey);
  const gewaehlt = (o: string) => (Array.isArray(wert) ? wert.includes(o) : wert === o);
  const kurz = optionen.every((o) => o.length <= 12);
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-invalid={!!fehler}
      aria-describedby={fehler ? `${id}-fehler` : undefined}
      className="outline-none"
    >
      <legend className="text-[15.5px] font-medium leading-snug">
        {label}
        {!pflicht && optional}
      </legend>
      {hilfe && <p className="mt-1 text-[14px] text-ink-2">{hilfe}</p>}
      <div className={`mt-2.5 grid gap-2 ${spalten === 2 || kurz ? "grid-cols-2" : "grid-cols-1"}`}>
        {optionen.map((o) => {
          const an = gewaehlt(o);
          return (
            <label
              key={o}
              className={`demo-kachel press relative flex min-h-[52px] cursor-pointer select-none items-center gap-2.5 rounded-[14px] border px-3.5 py-2.5 text-[15px] leading-snug ${
                an ? "demo-kachel-an" : ""
              }`}
            >
              <input
                type={mehrfach ? "checkbox" : "radio"}
                name={id}
                checked={an}
                onChange={() => {
                  if (!mehrfach) return onChange(o);
                  const liste = Array.isArray(wert) ? wert : [];
                  onChange(an ? liste.filter((x) => x !== o) : [...liste, o]);
                }}
                className="sr-only"
              />
              <span className="flex-1">{o}</span>
              {mehrfach && (
                <span className="demo-haken grid size-5 shrink-0 place-items-center rounded-[6px] border" aria-hidden="true">
                  {an && (
                    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth={2.2}>
                      <path d="m2.5 6.3 2.4 2.3 4.6-5" />
                    </svg>
                  )}
                </span>
              )}
            </label>
          );
        })}
      </div>
      <FeldFehler id={`${id}-fehler`} text={fehler} />
    </fieldset>
  );
}

export function TextFeld({
  feldKey,
  label,
  pflicht,
  fehler,
  hilfe,
  onBlur,
  wert,
  onChange,
  mehrzeilig = false,
  zusatz,
  ...attr
}: Gemeinsam & {
  wert: string;
  onChange: (w: string) => void;
  mehrzeilig?: boolean;
  zusatz?: ReactNode;
  type?: string;
  inputMode?: "numeric" | "decimal" | "text" | "tel" | "email";
  autoComplete?: string;
  autoCapitalize?: string;
  placeholder?: string;
  enterKeyHint?: "next" | "done" | "enter" | "send";
  max?: string;
  min?: string;
  spellCheck?: boolean;
  maxLength?: number;
}) {
  const id = feldDomId(feldKey);
  const beschreibung = [hilfe ? `${id}-hilfe` : "", fehler ? `${id}-fehler` : ""].filter(Boolean).join(" ") || undefined;
  const gemeinsam = {
    id,
    name: id,
    value: wert,
    onBlur,
    "aria-invalid": !!fehler,
    "aria-describedby": beschreibung,
    required: pflicht,
    className: `demo-feld ${mehrzeilig ? "min-h-[120px] resize-y" : ""}`,
  };
  return (
    <div>
      <label htmlFor={id} className="text-[15.5px] font-medium leading-snug">
        {label}
        {!pflicht && optional}
      </label>
      {hilfe && (
        <p id={`${id}-hilfe`} className="mt-1 text-[14px] leading-snug text-ink-2">
          {hilfe}
        </p>
      )}
      <div className="mt-2">
        {mehrzeilig ? (
          <textarea {...gemeinsam} {...attr} rows={4} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input {...gemeinsam} {...attr} onChange={(e) => onChange(e.target.value)} />
        )}
      </div>
      {zusatz}
      <FeldFehler id={`${id}-fehler`} text={fehler} />
    </div>
  );
}

// Rendert ein Sparten-Feld aus den Daten in sparten.ts
export function FeldAusDaten({
  feld,
  felder,
  fehler,
  onChange,
  onBlur,
}: {
  feld: Feld;
  felder: Felder;
  fehler?: string;
  onChange: (w: FeldWert) => void;
  onBlur: () => void;
}) {
  const key = `f.${feld.id}`;
  const pflicht = istPflicht(feld, felder);
  const wert = felder[feld.id];
  const hinweis = feld.hinweise?.find((h) => h.bei === wert);

  let inhalt: ReactNode;
  if (feld.typ === "auswahl" || feld.typ === "mehrfach") {
    inhalt = (
      <Kacheln
        feldKey={key}
        label={feld.label}
        pflicht={pflicht}
        fehler={fehler}
        hilfe={feld.hilfe}
        optionen={feld.optionen ?? []}
        wert={wert}
        mehrfach={feld.typ === "mehrfach"}
        spalten={(feld.optionen ?? []).some((o) => o.length > 18) ? 1 : 2}
        onChange={onChange}
      />
    );
  } else {
    inhalt = (
      <TextFeld
        feldKey={key}
        label={feld.label}
        pflicht={pflicht}
        fehler={fehler}
        hilfe={feld.hilfe}
        wert={String(wert ?? "")}
        onBlur={onBlur}
        onChange={(w) => onChange(feld.grossbuchstaben ? w.toUpperCase() : w)}
        mehrzeilig={feld.typ === "textarea"}
        placeholder={feld.platzhalter}
        inputMode={feld.typ === "zahl" ? "numeric" : feld.inputMode}
        autoComplete={feld.autoComplete ?? "off"}
        autoCapitalize={feld.grossbuchstaben ? "characters" : "sentences"}
        spellCheck={feld.grossbuchstaben ? false : undefined}
        maxLength={feld.typ === "zahl" ? 5 : 200}
      />
    );
  }

  return (
    <div>
      {inhalt}
      {hinweis && <Hinweis warnung>{hinweis.text}</Hinweis>}
    </div>
  );
}
