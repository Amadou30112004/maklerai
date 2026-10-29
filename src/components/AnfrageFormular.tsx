"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type Ref,
} from "react";
import { site } from "@/config/site";
import { pruefeSchritt, type Schritt } from "@/lib/schema";
import { IconHaken, IconPfeilRechts } from "./ui/Icons";

type Daten = {
  vorname: string;
  nachname: string;
  buero: string;
  email: string;
  telefon: string;
  einwilligung: boolean;
  website: string; // Honeypot
};

type Fehler = Partial<Record<keyof Daten, string>>;

const leer: Daten = {
  vorname: "",
  nachname: "",
  buero: "",
  email: "",
  telefon: "",
  einwilligung: false,
  website: "",
};

const titel: Record<Schritt, string> = {
  1: "Buchen Sie Ihren Termin",
  2: "Wie erreichen wir Sie?",
};

// Reihenfolge der Felder je Schritt, damit das erste fehlerhafte Feld den Fokus bekommt
const felder: Record<Schritt, (keyof Daten)[]> = {
  1: ["vorname", "nachname"],
  2: ["buero", "email", "telefon", "einwilligung"],
};

// Alter Inhalt gleitet raus, neuer kommt rein: zusammen knapp 300 ms
const AUS_MS = 130;

// true erst im Browser. Ohne JavaScript bleibt es ein normales Formular mit allen Feldern untereinander.
const abonnieren = () => () => {};
function useMitJs() {
  return useSyncExternalStore(
    abonnieren,
    () => true,
    () => false,
  );
}

function wenigBewegung() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnfrageFormular() {
  const mitJs = useMitJs();
  const [schritt, setSchritt] = useState<Schritt | "fertig">(1);
  const [phase, setPhase] = useState<"ruhe" | "raus">("ruhe");
  const [richtung, setRichtung] = useState<"vor" | "zurueck">("vor");
  const [daten, setDaten] = useState<Daten>(leer);
  const [fehler, setFehler] = useState<Fehler>({});
  const [sendet, setSendet] = useState(false);
  const [sendeFehler, setSendeFehler] = useState("");
  const [hoehe, setHoehe] = useState<number | null>(null);
  const startedAt = useRef(0);
  const kopfRef = useRef<HTMLHeadingElement>(null);
  const innenRef = useRef<HTMLDivElement>(null);
  const letzterSchritt = useRef(schritt);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    startedAt.current = Date.now();
    return () => clearTimeout(timer.current);
  }, []);

  // Höhe der Karte folgt dem Inhalt weich, ohne dass die Seite springt
  useLayoutEffect(() => {
    const el = innenRef.current;
    if (!el || !mitJs) return;
    const ro = new ResizeObserver(([e]) => setHoehe(Math.ceil(e.borderBoxSize[0]?.blockSize ?? e.contentRect.height)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [mitJs]);

  // Beim Schrittwechsel Fokus auf die neue Überschrift, ohne zu scrollen
  useEffect(() => {
    if (letzterSchritt.current === schritt) return;
    letzterSchritt.current = schritt;
    kopfRef.current?.focus({ preventScroll: true });
  }, [schritt]);

  const set = <K extends keyof Daten>(key: K, value: Daten[K]) => {
    setDaten((d) => ({ ...d, [key]: value }));
    setFehler((f) => ({ ...f, [key]: undefined }));
  };

  // Nach Verlassen eines Feldes nur dieses Feld prüfen
  const pruefeFeld = (key: keyof Daten) => {
    if (schritt === "fertig") return;
    const r = pruefeSchritt(schritt, daten);
    setFehler((f) => ({ ...f, [key]: r.ok ? undefined : r.fehler[key] }));
  };

  const wechsel = (ziel: Schritt | "fertig", r: "vor" | "zurueck") => {
    clearTimeout(timer.current);
    if (wenigBewegung()) {
      setSchritt(ziel);
      return;
    }
    setRichtung(r);
    setPhase("raus");
    timer.current = setTimeout(() => {
      setSchritt(ziel);
      setPhase("ruhe");
    }, AUS_MS);
  };

  const absenden = async () => {
    setSendet(true);
    setSendeFehler("");
    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...daten, startedAt: startedAt.current }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { meldung?: string };
        setSendeFehler(
          json.meldung ?? `Das hat leider nicht geklappt. Schreiben Sie mir gern direkt an ${site.person.email}.`,
        );
      }
    } catch {
      setSendeFehler(
        `Keine Verbindung. Ihre Angaben sind nicht angekommen, schreiben Sie mir gern an ${site.person.email}.`,
      );
    } finally {
      setSendet(false);
    }
    // Der Kalender-Button erscheint in jedem Fall
    wechsel("fertig", "vor");
  };

  const weiter = () => {
    if (schritt === "fertig") return;
    const r = pruefeSchritt(schritt, daten);
    if (!r.ok) {
      setFehler(r.fehler);
      const erstes = felder[schritt].find((k) => r.fehler[k]);
      if (erstes) document.getElementById(`feld-${erstes}`)?.focus();
      return;
    }
    setFehler({});
    if (schritt === 2) void absenden();
    else wechsel(2, "vor");
  };

  const zurueck = () => {
    if (schritt !== 2) return;
    setFehler({});
    wechsel(1, "zurueck");
  };

  const animKlasse =
    phase === "raus"
      ? richtung === "vor"
        ? "schritt-raus-vor"
        : "schritt-raus-zurueck"
      : richtung === "vor"
        ? "schritt-rein-vor"
        : "schritt-rein-zurueck";

  // Ohne JavaScript: beide Schritte sichtbar
  const sichtbar = (s: Schritt) => !mitJs || schritt === s;

  return (
    <div className="formular-huelle overflow-hidden" style={mitJs && hoehe !== null ? { height: hoehe } : undefined}>
      <div ref={innenRef}>
        {schritt === "fertig" ? (
          <Abschluss vorname={daten.vorname.trim()} sendeFehler={sendeFehler} kopfRef={kopfRef} className={animKlasse} />
        ) : (
          <form
            noValidate={mitJs}
            action="/api/pilot"
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              weiter();
            }}
          >
            {mitJs && <Fortschritt schritt={schritt} />}

            {/* Honeypot: für Menschen unsichtbar */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={daten.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </label>
            </div>
            {/* Ohne JavaScript gibt es keine Startzeit, der Spam-Schutz läuft dann nur über das versteckte Feld */}
            {!mitJs && <input type="hidden" name="startedAt" value="1" />}

            <div key={schritt} className={mitJs ? animKlasse : ""}>
              {sichtbar(1) && (
                <Abschnitt titel={titel[1]} kopfRef={mitJs ? kopfRef : undefined}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Feld
                      id="vorname"
                      label="Vorname"
                      autoComplete="given-name"
                      enterKeyHint="next"
                      value={daten.vorname}
                      onChange={(v) => set("vorname", v)}
                      onBlur={() => pruefeFeld("vorname")}
                      fehler={fehler.vorname}
                    />
                    <Feld
                      id="nachname"
                      label="Nachname"
                      autoComplete="family-name"
                      enterKeyHint="next"
                      value={daten.nachname}
                      onChange={(v) => set("nachname", v)}
                      onBlur={() => pruefeFeld("nachname")}
                      fehler={fehler.nachname}
                    />
                  </div>
                  {mitJs && (
                    <Knoepfe>
                      <Senden>Weiter</Senden>
                    </Knoepfe>
                  )}
                </Abschnitt>
              )}

              {sichtbar(2) && (
                <Abschnitt titel={titel[2]} kopfRef={mitJs ? kopfRef : undefined} abstand={!mitJs}>
                  <div className="space-y-5">
                    <Feld
                      id="buero"
                      label="Maklerbüro"
                      autoComplete="organization"
                      enterKeyHint="next"
                      value={daten.buero}
                      onChange={(v) => set("buero", v)}
                      onBlur={() => pruefeFeld("buero")}
                      fehler={fehler.buero}
                    />
                    <Feld
                      id="email"
                      label="E-Mail"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      enterKeyHint="next"
                      value={daten.email}
                      onChange={(v) => set("email", v)}
                      onBlur={() => pruefeFeld("email")}
                      fehler={fehler.email}
                    />
                    <Feld
                      id="telefon"
                      label="Telefon"
                      optional
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      enterKeyHint="send"
                      value={daten.telefon}
                      onChange={(v) => set("telefon", v)}
                      onBlur={() => pruefeFeld("telefon")}
                      fehler={fehler.telefon}
                    />
                    <div>
                      <label className="flex min-h-[48px] cursor-pointer items-start gap-3 text-[15px] leading-[1.6]">
                        <input
                          id="feld-einwilligung"
                          type="checkbox"
                          name="einwilligung"
                          required
                          checked={daten.einwilligung}
                          onChange={(e) => set("einwilligung", e.target.checked)}
                          className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-md accent-[#E8501E]"
                          aria-invalid={!!fehler.einwilligung}
                          aria-describedby={fehler.einwilligung ? "einwilligung-fehler" : undefined}
                        />
                        <span>
                          Ich bin einverstanden, dass meine Angaben zur Vorbereitung des Termins verarbeitet werden.
                          Details in der{" "}
                          <Link href="/datenschutz" className="underline underline-offset-4" target="_blank">
                            Datenschutzerklärung
                          </Link>
                          .
                        </span>
                      </label>
                      <FeldFehler id="einwilligung-fehler" text={fehler.einwilligung} />
                    </div>
                  </div>
                  <Knoepfe>
                    {mitJs && <Zurueck onClick={zurueck} />}
                    <Senden disabled={sendet}>{sendet ? "Wird gesendet …" : "Termin auswählen"}</Senden>
                  </Knoepfe>
                </Abschnitt>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Fortschritt({ schritt }: { schritt: Schritt }) {
  return (
    <div className="mb-6">
      <p className="text-[14px] font-medium text-ink-2" aria-live="polite">
        Schritt {schritt} von 2
      </p>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
        <span
          className="fortschritt bg-grad block h-full w-full origin-left rounded-full"
          style={{ transform: `scaleX(${schritt / 2})` }}
        />
      </div>
    </div>
  );
}

function Abschnitt({
  titel,
  kopfRef,
  abstand = false,
  children,
}: {
  titel: string;
  kopfRef?: Ref<HTMLHeadingElement>;
  abstand?: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset className={abstand ? "mt-10 border-t border-line pt-8" : ""}>
      <legend className="sr-only">{titel}</legend>
      <h3 ref={kopfRef} tabIndex={-1} className="mb-6 text-[24px] leading-tight outline-none sm:text-[26px]">
        {titel}
      </h3>
      {children}
    </fieldset>
  );
}

function Abschluss({
  vorname,
  sendeFehler,
  kopfRef,
  className,
}: {
  vorname: string;
  sendeFehler: string;
  kopfRef: Ref<HTMLHeadingElement>;
  className: string;
}) {
  return (
    <div className={`text-center ${className}`} role="status">
      <span className="haken-pop bg-grad mx-auto grid size-16 place-items-center rounded-full text-white shadow-[0_12px_30px_-10px_rgb(232_80_30/0.7)]">
        <IconHaken className="size-8" strokeWidth={2.4} />
      </span>
      <h3 ref={kopfRef} tabIndex={-1} className="mx-auto mt-5 max-w-[400px] text-[26px] leading-tight outline-none">
        Fast geschafft{vorname ? `, ${vorname}` : ""}
      </h3>
      {sendeFehler && (
        <p
          role="alert"
          className="mx-auto mt-4 max-w-[420px] rounded-[12px] bg-[#FFE6DB] px-4 py-3 text-[15px] text-[#8A2A0A]"
        >
          {sendeFehler}
        </p>
      )}
      <p className="mx-auto mt-4 max-w-[420px] text-[17px] leading-[1.6] text-ink-2">
        Wählen Sie jetzt einen freien Termin in meinem Kalender. Im Termin klären wir gemeinsam, welche Möglichkeiten es
        für Ihr Büro gibt.
      </p>
      <a
        href={site.person.terminLink}
        target="_blank"
        rel="noopener"
        className="press glanz mt-7 inline-flex min-h-[60px] w-full items-center justify-between gap-3 rounded-[12px] bg-ink py-2 pl-6 pr-2 text-[17px] font-medium text-white"
      >
        Freien Termin wählen
        <span className="grid size-11 place-items-center rounded-[9px] bg-white text-ink" aria-hidden="true">
          <IconPfeilRechts className="size-4" />
        </span>
        <span className="sr-only"> (öffnet in neuem Tab)</span>
      </a>
      <p className="mt-5 text-[15px] text-ink-2">
        Kein passender Termin dabei? Schreiben Sie mir:{" "}
        <a href={`mailto:${site.person.email}`} className="text-ink underline underline-offset-4">
          {site.person.email}
        </a>
      </p>
    </div>
  );
}

function Knoepfe({ children }: { children: ReactNode }) {
  return <div className="mt-8 flex items-center gap-3">{children}</div>;
}

function Zurueck({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="press min-h-[52px] rounded-[12px] bg-surface-2 px-5 text-[16px] font-medium"
    >
      Zurück
    </button>
  );
}

function Senden({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="press glanz inline-flex min-h-[52px] w-full flex-1 items-center justify-between gap-3 rounded-[12px] bg-ink py-2 pl-5 pr-2 text-[16px] font-medium text-white disabled:opacity-60"
    >
      {children}
      <span className="grid size-9 place-items-center rounded-[9px] bg-white text-ink" aria-hidden="true">
        <IconPfeilRechts className="size-4" />
      </span>
    </button>
  );
}

function Feld({
  id,
  label,
  optional,
  fehler,
  value,
  onChange,
  onBlur,
  type = "text",
  inputMode,
  autoComplete,
  enterKeyHint,
}: {
  id: keyof Daten;
  label: string;
  optional?: boolean;
  fehler?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  enterKeyHint?: "next" | "done" | "send";
}) {
  const feldId = `feld-${id}`;
  return (
    <div className="min-w-0">
      <label htmlFor={feldId} className="text-[16px] font-medium">
        {label} {optional && <span className="font-normal text-ink-2">(optional)</span>}
      </label>
      <input
        id={feldId}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        enterKeyHint={enterKeyHint}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
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
    <p id={id} className="mt-1.5 text-[15px] font-medium text-[#B23A12]">
      {text}
    </p>
  );
}
