"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/config/site";
import {
  bueroGroessen,
  schritt1Schema,
  schritt2Schema,
  schwerpunkte,
  type LoesungId,
} from "@/lib/schema";
import { loesungen } from "./loesungen-daten";
import { Avatar } from "./ui/Basis";
import { IconHaken, IconPfeilRechts } from "./ui/Icons";

type Daten = {
  groesse: string;
  schwerpunkt: string;
  interessen: LoesungId[];
  zeitfresser: string;
  name: string;
  buero: string;
  email: string;
  telefon: string;
  einwilligung: boolean;
  website: string; // Honeypot
};

type Fehler = Partial<Record<keyof Daten | "allgemein", string>>;

const leer: Daten = {
  groesse: "",
  schwerpunkt: "",
  interessen: [],
  zeitfresser: "",
  name: "",
  buero: "",
  email: "",
  telefon: "",
  einwilligung: false,
  website: "",
};

function fehlerAus(issues: { path: PropertyKey[]; message: string }[]): Fehler {
  const f: Fehler = {};
  for (const i of issues) {
    const key = String(i.path[0]) as keyof Fehler;
    if (!f[key]) f[key] = i.message;
  }
  return f;
}

export function AnfrageFormular() {
  const [schritt, setSchritt] = useState<1 | 2 | "fertig">(1);
  const [daten, setDaten] = useState<Daten>(leer);
  const [fehler, setFehler] = useState<Fehler>({});
  const [sendet, setSendet] = useState(false);
  const startedAt = useRef(0);
  const kopfRef = useRef<HTMLDivElement>(null);
  const letzterSchritt = useRef(schritt);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Beim Schrittwechsel Fokus auf den Kopf, damit Screenreader und Tastatur mitkommen
  useEffect(() => {
    if (letzterSchritt.current === schritt) return;
    letzterSchritt.current = schritt;
    kopfRef.current?.focus({ preventScroll: true });
    kopfRef.current?.scrollIntoView({ block: "nearest" });
  }, [schritt]);

  const set = <K extends keyof Daten>(key: K, value: Daten[K]) => {
    setDaten((d) => ({ ...d, [key]: value }));
    setFehler((f) => ({ ...f, [key]: undefined, allgemein: undefined }));
  };

  const toggleInteresse = (id: LoesungId) =>
    set(
      "interessen",
      daten.interessen.includes(id) ? daten.interessen.filter((x) => x !== id) : [...daten.interessen, id],
    );

  const weiter = () => {
    const r = schritt1Schema.safeParse(daten);
    if (!r.success) {
      setFehler(fehlerAus(r.error.issues));
      return;
    }
    setFehler({});
    setSchritt(2);
  };

  const absenden = async () => {
    const r = schritt2Schema.safeParse(daten);
    if (!r.success) {
      setFehler(fehlerAus(r.error.issues));
      return;
    }
    setSendet(true);
    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...daten, startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { fehler?: Fehler; meldung?: string };
      if (!res.ok) {
        setFehler(json.fehler ?? { allgemein: json.meldung ?? "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut." });
        return;
      }
      setSchritt("fertig");
    } catch {
      setFehler({ allgemein: "Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut." });
    } finally {
      setSendet(false);
    }
  };

  if (schritt === "fertig") {
    const vorname = daten.name.trim().split(/\s+/)[0];
    return (
      <div ref={kopfRef} tabIndex={-1} className="text-center outline-none" role="status">
        <div className="flex justify-center">
          <Avatar groesse={72} />
        </div>
        <h3 className="mx-auto mt-5 max-w-[380px] text-[24px] leading-tight">
          Danke, {vorname}. Wählen Sie jetzt Ihren Wunschtermin mit {site.person.name}.
        </h3>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="press mt-7 inline-flex min-h-[56px] w-full items-center justify-between gap-3 rounded-[12px] bg-ink py-2 pl-6 pr-2 text-[17px] font-medium text-white"
        >
          Termin auswählen
          <span className="grid size-10 place-items-center rounded-[9px] bg-white text-ink" aria-hidden="true">
            <IconPfeilRechts className="size-4" />
          </span>
          <span className="sr-only"> (öffnet in neuem Tab)</span>
        </a>
        <p className="mt-5 text-[14px] text-ink-2">
          Lieber per Mail?{" "}
          <a href={`mailto:${site.person.email}`} className="text-ink underline underline-offset-4">
            {site.person.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (schritt === 1) weiter();
        else void absenden();
      }}
    >
      <div ref={kopfRef} tabIndex={-1} className="outline-none">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-medium text-ink-2" aria-live="polite">
            Schritt {schritt} von 2
          </p>
          <p className="text-[13px] text-ink-2">{schritt === 1 ? "Kurz zu Ihrem Büro" : "Ihre Kontaktdaten"}</p>
        </div>
        <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
          <span className="bg-grad h-1.5 flex-1 rounded-full" />
          <span className={`h-1.5 flex-1 rounded-full ${schritt === 2 ? "bg-grad" : "bg-surface-2"}`} />
        </div>
      </div>

      {/* Honeypot: für Menschen unsichtbar */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={daten.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </label>
      </div>

      {schritt === 1 ? (
        <div className="mt-7 space-y-7">
          <Gruppe legend="Wie groß ist Ihr Büro?" fehler={fehler.groesse} id="groesse">
            <div className="grid grid-cols-2 gap-2">
              {bueroGroessen.map((g) => (
                <Kachel key={g} name="groesse" type="radio" checked={daten.groesse === g} onChange={() => set("groesse", g)}>
                  {g}
                </Kachel>
              ))}
            </div>
          </Gruppe>

          <Gruppe legend="Wo liegt Ihr Schwerpunkt?" fehler={fehler.schwerpunkt} id="schwerpunkt">
            <div className="flex flex-wrap gap-2 [&>label]:flex-auto">
              {schwerpunkte.map((s) => (
                <Kachel key={s} name="schwerpunkt" type="radio" checked={daten.schwerpunkt === s} onChange={() => set("schwerpunkt", s)}>
                  {s}
                </Kachel>
              ))}
            </div>
          </Gruppe>

          <Gruppe
            legend="Welche Verbesserungen interessieren Sie am meisten?"
            hinweis="Mehrfachauswahl möglich"
            fehler={fehler.interessen}
            id="interessen"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {loesungen.map((l) => (
                <Kachel
                  key={l.id}
                  name="interessen"
                  type="checkbox"
                  checked={daten.interessen.includes(l.id)}
                  onChange={() => toggleInteresse(l.id)}
                  icon={<l.icon className="size-[18px]" />}
                >
                  {l.kurz}
                </Kachel>
              ))}
            </div>
          </Gruppe>

          <div>
            <label htmlFor="zeitfresser" className="text-[15px] font-medium">
              Was kostet Sie im Büro am meisten Zeit? <span className="font-normal text-ink-2">(optional)</span>
            </label>
            <textarea
              id="zeitfresser"
              rows={3}
              value={daten.zeitfresser}
              onChange={(e) => set("zeitfresser", e.target.value)}
              className="feld mt-2 resize-y"
              aria-invalid={!!fehler.zeitfresser}
              aria-describedby={fehler.zeitfresser ? "zeitfresser-fehler" : undefined}
            />
            <FeldFehler id="zeitfresser-fehler" text={fehler.zeitfresser} />
          </div>

          <Senden>Weiter</Senden>
        </div>
      ) : (
        <div className="mt-7 space-y-5">
          <Feld id="name" label="Name" autoComplete="name" value={daten.name} onChange={(v) => set("name", v)} fehler={fehler.name} />
          <Feld
            id="buero"
            label="Maklerbüro"
            autoComplete="organization"
            value={daten.buero}
            onChange={(v) => set("buero", v)}
            fehler={fehler.buero}
          />
          <Feld
            id="email"
            label="E-Mail"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={daten.email}
            onChange={(v) => set("email", v)}
            fehler={fehler.email}
          />
          <Feld
            id="telefon"
            label="Telefon"
            optional
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={daten.telefon}
            onChange={(v) => set("telefon", v)}
            fehler={fehler.telefon}
          />

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-relaxed">
              <input
                type="checkbox"
                checked={daten.einwilligung}
                onChange={(e) => set("einwilligung", e.target.checked)}
                className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-md accent-[#121212]"
                aria-invalid={!!fehler.einwilligung}
                aria-describedby={fehler.einwilligung ? "einwilligung-fehler" : undefined}
              />
              <span>
                Ich bin einverstanden, dass meine Angaben zur Vorbereitung des Gesprächs verarbeitet werden. Details in
                der{" "}
                <Link href="/datenschutz" className="underline underline-offset-4" target="_blank">
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </label>
            <FeldFehler id="einwilligung-fehler" text={fehler.einwilligung} />
          </div>

          {fehler.allgemein && (
            <p role="alert" className="rounded-[12px] bg-[#FFE6DB] px-4 py-3 text-[14.5px] text-[#8A2A0A]">
              {fehler.allgemein}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setFehler({});
                setSchritt(1);
              }}
              className="press min-h-[52px] rounded-[12px] bg-surface-2 px-5 text-[16px] font-medium"
            >
              Zurück
            </button>
            <Senden disabled={sendet}>{sendet ? "Wird gesendet …" : "Weiter zur Terminwahl"}</Senden>
          </div>
        </div>
      )}
    </form>
  );
}

function Senden({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="press inline-flex min-h-[52px] flex-1 items-center justify-between gap-3 rounded-[12px] bg-ink py-2 pl-5 pr-2 text-[16px] font-medium text-white disabled:opacity-60 w-full"
    >
      {children}
      <span className="grid size-9 place-items-center rounded-[9px] bg-white text-ink" aria-hidden="true">
        <IconPfeilRechts className="size-4" />
      </span>
    </button>
  );
}

function Gruppe({
  legend,
  hinweis,
  fehler,
  id,
  children,
}: {
  legend: string;
  hinweis?: string;
  fehler?: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <fieldset aria-describedby={fehler ? `${id}-fehler` : undefined} aria-invalid={!!fehler}>
      <legend className="text-[15px] font-medium">
        {legend} {hinweis && <span className="font-normal text-ink-2">({hinweis})</span>}
      </legend>
      <div className="mt-2.5">{children}</div>
      <FeldFehler id={`${id}-fehler`} text={fehler} />
    </fieldset>
  );
}

function Kachel({
  name,
  type,
  checked,
  onChange,
  icon,
  children,
}: {
  name: string;
  type: "radio" | "checkbox";
  checked: boolean;
  onChange: () => void;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label
      className={`press relative flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-[14px] border px-3.5 py-2.5 text-[14.5px] leading-snug transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
        checked ? "border-ink bg-ink text-white" : "border-line bg-surface can-hover:border-ink/40"
      }`}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      {icon && (
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-[10px] ${
            checked ? "bg-white/15 text-white" : "bg-grad text-white"
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {type === "checkbox" && (
        <span
          className={`grid size-5 shrink-0 place-items-center rounded-full ${checked ? "bg-white text-ink" : "border border-line"}`}
          aria-hidden="true"
        >
          {checked && <IconHaken className="size-3" strokeWidth={2.6} />}
        </span>
      )}
    </label>
  );
}

function Feld({
  id,
  label,
  optional,
  fehler,
  value,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  optional?: boolean;
  fehler?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[15px] font-medium">
        {label} {optional && <span className="font-normal text-ink-2">(optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={!optional}
        aria-invalid={!!fehler}
        aria-describedby={fehler ? `${id}-fehler` : undefined}
        className="feld mt-2"
      />
      <FeldFehler id={`${id}-fehler`} text={fehler} />
    </div>
  );
}

function FeldFehler({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 text-[14px] font-medium text-[#B23A12]">
      {text}
    </p>
  );
}
