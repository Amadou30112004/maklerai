"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { beispielMeldung, extremMeldung } from "@/lib/demo/beispieldaten";
import { formatDatum, meldungsnummer, spartenName } from "@/lib/demo/email";
import { fehlerSchritt, isoDatum } from "@/lib/demo/schema";
import { BUERO, sichtbareFelder, sparten, spartenNach } from "@/lib/demo/sparten";
import type { Fehler, Foto, Schritt } from "@/lib/demo/typen";
import { MAX_FOTOS, MAX_GEGENSTAENDE, feldDomId } from "@/lib/demo/typen";
import { pruefeVollstaendigkeit } from "@/lib/demo/vollstaendigkeit";
import { AbschlussAktionen, BueroSicht, KundenSicht, technikZeile } from "./DemoAbschluss";
import { FeldAusDaten, FeldFehler, Hinweis, Kacheln, TextFeld } from "./DemoFelder";
import { IconKamera, IconMuell, LogoMV, spartenIcons } from "./DemoIcons";
import { FARBEN, istFarbe, neueId, reducer, startZustand, type Ansicht, type Farbe } from "./zustand";

const ERKLAERUNG: Record<Ansicht, string> = {
  0: "Ihr Kunde öffnet den Link von Ihrer Website, aus einer Mail oder per WhatsApp. Er sieht Ihr Büro, Ihr Logo, Ihre Farben.",
  1: "Je nach Sparte fragt das Formular andere Angaben ab. Weitere Sparten richten wir für Ihr Büro ein.",
  2: "Hier entstehen sonst die Rückfragen. Das Formular fragt genau ab, was der Versicherer für diese Sparte braucht, und gibt Ihrem Kunden passende Hinweise.",
  3: "Fotos kommen direkt vom Handy, nicht verstreut per Mail oder Messenger.",
  4: "Kontaktdaten und Vertragsnummer landen direkt in der Meldung. Nichts muss abgetippt werden.",
  5: "Fehlt etwas, sieht Ihr Kunde es sofort, bevor er absendet. Bei Ihnen kommt nur Vollständiges an.",
  6: "Sie prüfen, passen bei Bedarf an und geben frei. Die Entscheidung bleibt bei Ihnen.",
};

const TITEL: Record<Ansicht, string> = {
  0: "Schaden melden",
  1: "Worum geht es?",
  2: "Was ist passiert?",
  3: "Fotos hinzufügen",
  4: "Ihre Angaben",
  5: "Prüfen und absenden",
  6: "Vielen Dank",
};

// Erzeugt neutrale Beispielbilder per Canvas, keine Stockfotos
async function beispielFotos(anzahl: number): Promise<Foto[]> {
  const fotos: Foto[] = [];
  for (let i = 1; i <= anzahl; i++) {
    const c = document.createElement("canvas");
    c.width = 960;
    c.height = 720;
    const g = c.getContext("2d");
    if (!g) continue;
    const verlauf = g.createLinearGradient(0, 0, 960, 720);
    verlauf.addColorStop(0, ["#d9dde2", "#e4ddd3", "#d6dfd9"][i % 3]);
    verlauf.addColorStop(1, ["#aeb6bf", "#c2b5a3", "#a9bab0"][i % 3]);
    g.fillStyle = verlauf;
    g.fillRect(0, 0, 960, 720);
    g.fillStyle = "rgba(255,255,255,0.85)";
    g.font = "600 64px system-ui, sans-serif";
    g.textAlign = "center";
    g.fillText(`Beispielfoto ${i}`, 480, 380);
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.8));
    if (blob) fotos.push({ id: neueId(), url: URL.createObjectURL(blob), name: `Beispielfoto ${i}` });
  }
  return fotos;
}

const keinAbo = () => () => {};
const farbeAusAdresse = () => new URLSearchParams(window.location.search).get("farbe");

export function DemoApp() {
  const [z, dispatch] = useReducer(reducer, null, startZustand);
  // Beim Hydrieren gilt Blau, danach die Farbe aus ?farbe=, bis eine Farbe gewählt wird
  const urlFarbe = useSyncExternalStore(keinAbo, farbeAusAdresse, () => null);
  const farbe: Farbe = z.farbe ?? (istFarbe(urlFarbe) ? urlFarbe : "blau");
  const { m, ansicht } = z;
  const sparte = m.sparte ? spartenNach[m.sparte] : null;
  const titelRef = useRef<HTMLHeadingElement>(null);
  const kopfRef = useRef<HTMLDivElement>(null);
  const fokusNach = useRef<string | null>(null);
  const letzteAnsicht = useRef(ansicht);
  const fotosRef = useRef(m.fotos);
  const [fotoHinweis, setFotoHinweis] = useState("");

  useEffect(() => {
    fotosRef.current = m.fotos;
  }, [m.fotos]);

  // Beim Verlassen der Seite alle Vorschaubilder freigeben
  useEffect(() => () => fotosRef.current.forEach((f) => URL.revokeObjectURL(f.url)), []);

  // Beim Schrittwechsel: nach oben, Fokus auf die Überschrift oder das gewünschte Feld
  useEffect(() => {
    if (letzteAnsicht.current === ansicht) return;
    letzteAnsicht.current = ansicht;
    const ziel = fokusNach.current ? document.getElementById(feldDomId(fokusNach.current)) : null;
    fokusNach.current = null;
    if (ziel) {
      ziel.focus();
      ziel.scrollIntoView({ block: "center" });
      return;
    }
    titelRef.current?.focus({ preventScroll: true });
    const top = (kopfRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 64;
    window.scrollTo({ top: Math.max(0, top) });
  }, [ansicht]);

  const gehe = useCallback((ziel: Ansicht, zurueckZuPruefen?: boolean) => {
    dispatch({ typ: "gehe", ansicht: ziel, zurueckZuPruefen });
  }, []);

  const istFormularSchritt = (a: Ansicht): a is Schritt => a >= 1 && a <= 4;
  const fehler: Fehler[] = istFormularSchritt(ansicht) ? fehlerSchritt(ansicht, m) : [];
  const zeige = (key: string) =>
    z.versucht[ansicht] || z.beruehrt[key] ? fehler.find((f) => f.key === key)?.meldung : undefined;
  const beruehrt = (key: string) => () => dispatch({ typ: "beruehrt", key });

  const fokusFeld = (key: string) => {
    // Nach dem Rendern der Fehlermeldungen
    setTimeout(() => {
      const el = document.getElementById(feldDomId(key));
      el?.focus();
      el?.scrollIntoView({ block: "center" });
    }, 0);
  };

  const weiter = () => {
    if (istFormularSchritt(ansicht) && fehler.length) {
      dispatch({ typ: "versucht" });
      fokusFeld(fehler[0].key);
      return;
    }
    if (ansicht === 5) {
      if (!pruefeVollstaendigkeit(m).vollstaendig) return;
      const jetzt = new Date();
      dispatch({ typ: "absenden", eingang: { zeit: jetzt.toISOString(), nummer: meldungsnummer(jetzt) } });
      return;
    }
    gehe((z.zurueckZuPruefen && istFormularSchritt(ansicht) ? 5 : ansicht + 1) as Ansicht);
  };

  const zurueck = () => gehe((ansicht - 1) as Ansicht, false);

  const beispiel = async () => {
    // Stresstest nur in der Entwicklung: ?daten=extrem füllt den Extremdatensatz
    const extrem =
      process.env.NODE_ENV === "development" && new URLSearchParams(window.location.search).get("daten") === "extrem";
    const fotos = m.fotos.length ? m.fotos : await beispielFotos(extrem ? 1 : 3);
    dispatch({
      typ: "beispiel",
      meldung: extrem ? extremMeldung(new Date(), fotos) : beispielMeldung(m.sparte || "kfz", new Date(), fotos),
    });
  };

  const neu = () => {
    m.fotos.forEach((f) => URL.revokeObjectURL(f.url));
    dispatch({ typ: "neu" });
  };

  const farbeWaehlen = (f: Farbe) => {
    dispatch({ typ: "farbe", farbe: f });
    const url = new URL(window.location.href);
    url.searchParams.set("farbe", f);
    window.history.replaceState(null, "", url);
  };

  const fotosWaehlen = (dateien: FileList | null) => {
    if (!dateien?.length) return;
    const frei = MAX_FOTOS - m.fotos.length;
    const liste = Array.from(dateien).filter((d) => d.type.startsWith("image/") || d.type === "");
    const neue = liste.slice(0, Math.max(0, frei)).map((d) => ({ id: neueId(), url: URL.createObjectURL(d), name: d.name }));
    setFotoHinweis(
      liste.length > frei
        ? `Es sind höchstens ${MAX_FOTOS} Fotos möglich. ${neue.length ? `Wir haben ${neue.length} davon übernommen.` : ""}`
        : "",
    );
    if (neue.length) dispatch({ typ: "fotosDazu", fotos: neue });
  };

  const fotoWeg = (f: Foto) => {
    URL.revokeObjectURL(f.url);
    setFotoHinweis("");
    dispatch({ typ: "fotoWeg", id: f.id });
  };

  const markeStil = { "--marke": FARBEN[farbe].wert } as CSSProperties;

  return (
    <div style={markeStil} className="min-h-svh bg-[#EEF0F3]">
      <DemoLeiste farbe={farbe} onFarbe={farbeWaehlen} />

      <main className="mx-auto grid w-full max-w-[880px] gap-6 px-[max(1rem,env(safe-area-inset-left))] pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-5 sm:pt-8 lg:grid-cols-[480px_320px] lg:items-start lg:justify-center">
        <div ref={kopfRef} className="mx-auto w-full min-w-0 max-w-[480px]">
          <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.05),0_12px_32px_-16px_rgb(0_0_0/0.25)]">
            {/* Kopf im Design des Maklerbüros */}
            <div className="flex items-center justify-between gap-3 border-b border-[#E6E8EB] px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <LogoMV className="size-9 shrink-0" />
                <span className="text-[15px] font-semibold leading-tight text-[#1d2733]">{BUERO.name}</span>
              </div>
              {ansicht < 6 && (
                <button
                  type="button"
                  onClick={beispiel}
                  className="press shrink-0 rounded-[10px] border border-[#D5D9DE] px-2.5 py-2 text-[12.5px] font-medium leading-tight text-[#3b4652] min-h-[40px]"
                >
                  Beispieldaten einfügen
                </button>
              )}
            </div>

            {ansicht >= 1 && ansicht <= 5 && (
              <div className="px-5 pt-4">
                <div className="flex items-center justify-between text-[13px] text-[#5b6570]">
                  <span>Schritt {ansicht} von 5</span>
                  {sparte && <span>{sparte.name}</span>}
                </div>
                <div className="mt-2 flex gap-1" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`h-1.5 flex-1 rounded-full ${s <= ansicht ? "bg-[var(--marke)]" : "bg-[#E3E6EA]"}`} />
                  ))}
                </div>
              </div>
            )}

            <div key={ansicht} className="demo-gleiten px-5 pb-6 pt-5">
              <h1 ref={titelRef} tabIndex={-1} className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-[#1d2733] outline-none">
                {TITEL[ansicht]}
              </h1>

              <ErklaerungMobil text={ERKLAERUNG[ansicht]} />

              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  weiter();
                }}
                className="mt-5"
              >
                {ansicht === 0 && <SchrittStart />}

                {ansicht === 1 && (
                  <fieldset
                    id={feldDomId("sparte")}
                    tabIndex={-1}
                    aria-describedby={zeige("sparte") ? `${feldDomId("sparte")}-fehler` : undefined}
                    className="outline-none"
                  >
                    <legend className="sr-only">Sparte wählen</legend>
                    <div className="grid grid-cols-2 gap-2.5">
                      {sparten.map((s) => {
                        const Icon = spartenIcons[s.id];
                        const an = m.sparte === s.id;
                        return (
                          <label
                            key={s.id}
                            className={`demo-kachel press flex min-h-[88px] cursor-pointer select-none flex-col items-start justify-between gap-2 rounded-[16px] border p-3.5 text-[16px] font-medium ${
                              an ? "demo-kachel-an" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="sparte"
                              checked={an}
                              onChange={() => dispatch({ typ: "sparte", sparte: s.id })}
                              className="sr-only"
                            />
                            <Icon className="size-7" />
                            {s.name}
                          </label>
                        );
                      })}
                    </div>
                    <FeldFehler id={`${feldDomId("sparte")}-fehler`} text={zeige("sparte")} />
                    <p className="mt-4 text-[14px] text-[#5b6570]">Nicht dabei? Rufen Sie uns an: {BUERO.telefon}</p>
                  </fieldset>
                )}

                {ansicht === 2 && sparte && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-3">
                      <TextFeld
                        feldKey="schadentag"
                        label="Schadentag"
                        pflicht
                        type="date"
                        wert={m.schadentag}
                        max={isoDatum(new Date())}
                        fehler={zeige("schadentag")}
                        onBlur={beruehrt("schadentag")}
                        onChange={(v) => dispatch({ typ: "setze", patch: { schadentag: v } })}
                      />
                      <TextFeld
                        feldKey="uhrzeit"
                        label="Uhrzeit"
                        pflicht={false}
                        type="time"
                        wert={m.uhrzeit}
                        onChange={(v) => dispatch({ typ: "setze", patch: { uhrzeit: v } })}
                      />
                    </div>

                    <div>
                      {sparte.versicherungsort && (
                        <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-[15.5px]">
                          <input
                            type="checkbox"
                            checked={m.gleicheAdresse}
                            onChange={(e) => dispatch({ typ: "setze", patch: { gleicheAdresse: e.target.checked } })}
                            className="size-6 shrink-0 accent-[var(--marke)]"
                          />
                          Gleiche Adresse wie Versicherungsort
                        </label>
                      )}
                      {!(sparte.versicherungsort && m.gleicheAdresse) && (
                        <div className={sparte.versicherungsort ? "mt-3" : ""}>
                          <TextFeld
                            feldKey="schadenort"
                            label="Schadenort"
                            pflicht
                            wert={m.schadenort}
                            placeholder="Straße, Ort oder Strecke"
                            autoComplete="off"
                            fehler={zeige("schadenort")}
                            onBlur={beruehrt("schadenort")}
                            onChange={(v) => dispatch({ typ: "setze", patch: { schadenort: v } })}
                          />
                        </div>
                      )}
                    </div>

                    <TextFeld
                      feldKey="beschreibung"
                      label="Was ist passiert?"
                      pflicht
                      mehrzeilig
                      hilfe={sparte.hilfeBeschreibung}
                      wert={m.beschreibung}
                      enterKeyHint="enter"
                      maxLength={2000}
                      fehler={zeige("beschreibung")}
                      onBlur={beruehrt("beschreibung")}
                      onChange={(v) => dispatch({ typ: "setze", patch: { beschreibung: v } })}
                      zusatz={
                        m.beschreibung.trim().length >= 15 && (
                          <p className="mt-1 text-right text-[13px] text-[#5b6570]" aria-live="polite">
                            {m.beschreibung.trim().length} Zeichen
                            {m.beschreibung.trim().length < 20 && ", mindestens 20"}
                          </p>
                        )
                      }
                    />

                    <div className="border-t border-[#E6E8EB] pt-5">
                      <h2 className="text-[18px] font-semibold text-[#1d2733]">Angaben zu {sparte.name}</h2>
                      <div className="mt-4 space-y-6">
                        {sichtbareFelder(sparte, m.felder).map((f) => (
                          <FeldAusDaten
                            key={f.id}
                            feld={f}
                            felder={m.felder}
                            fehler={zeige(`f.${f.id}`)}
                            onBlur={beruehrt(`f.${f.id}`)}
                            onChange={(w) => dispatch({ typ: "feld", id: f.id, wert: w })}
                          />
                        ))}
                        {sparte.gegenstaende && (
                          <Gegenstaende
                            m={m}
                            zeige={zeige}
                            beruehrt={beruehrt}
                            onNeu={() => dispatch({ typ: "gegenstandNeu" })}
                            onAendern={(id, patch) => dispatch({ typ: "gegenstand", id, patch })}
                            onWeg={(id) => dispatch({ typ: "gegenstandWeg", id })}
                          />
                        )}
                      </div>
                      {sparte.abschnittHinweis && <Hinweis warnung>{sparte.abschnittHinweis}</Hinweis>}
                    </div>
                  </div>
                )}

                {ansicht === 3 && sparte && (
                  <div>
                    <p className="text-[15px] font-medium text-[#1d2733]">Diese Fotos helfen uns:</p>
                    <ul className="mt-2 space-y-1.5 text-[15px] text-[#3b4652]">
                      {sparte.fotoTipps.map((t) => (
                        <li key={t} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--marke)]" aria-hidden="true" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    {sparte.fotoOptional(m.felder) && <Hinweis>Fotos sind hier freiwillig. Falls vorhanden: Foto vom Kaufbeleg.</Hinweis>}

                    <label
                      id={feldDomId("fotos")}
                      tabIndex={-1}
                      className={`press mt-5 flex min-h-[120px] cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-[16px] border-2 border-dashed p-5 text-center outline-none ${
                        m.fotos.length >= MAX_FOTOS ? "pointer-events-none opacity-50" : ""
                      } ${zeige("fotos") ? "border-[#A3271A]" : "border-[#C9CED4]"}`}
                    >
                      <span className="grid size-12 place-items-center rounded-full bg-[var(--marke)] text-white">
                        <IconKamera className="size-6" />
                      </span>
                      <span className="text-[16px] font-medium text-[#1d2733]">Foto aufnehmen oder auswählen</span>
                      <span className="text-[13px] text-[#5b6570]">
                        {m.fotos.length} von {MAX_FOTOS} Fotos
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        disabled={m.fotos.length >= MAX_FOTOS}
                        onChange={(e) => {
                          fotosWaehlen(e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <FeldFehler id={`${feldDomId("fotos")}-fehler`} text={zeige("fotos")} />
                    <p aria-live="polite" className="mt-2 text-[14px] text-[#6B3A00]">
                      {fotoHinweis}
                    </p>

                    {m.fotos.length > 0 && (
                      <ul className="mt-3 grid grid-cols-3 gap-2">
                        {m.fotos.map((f, i) => (
                          <li key={f.id} className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={f.url} alt={`Foto ${i + 1}`} className="aspect-square w-full rounded-[12px] object-cover" />
                            <button
                              type="button"
                              onClick={() => fotoWeg(f)}
                              className="press absolute right-0 top-0 grid size-11 place-items-center"
                            >
                              <span className="grid size-8 place-items-center rounded-full bg-black/65 text-white">
                                <IconMuell className="size-4" />
                              </span>
                              <span className="sr-only">Foto {i + 1} entfernen</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {ansicht === 4 && (
                  <div className="space-y-5">
                    <div className="grid gap-5 min-[420px]:grid-cols-2 min-[420px]:gap-3">
                      <TextFeld
                        feldKey="vorname"
                        label="Vorname"
                        pflicht
                        wert={m.vorname}
                        autoComplete="given-name"
                        fehler={zeige("vorname")}
                        onBlur={beruehrt("vorname")}
                        onChange={(v) => dispatch({ typ: "setze", patch: { vorname: v } })}
                      />
                      <TextFeld
                        feldKey="nachname"
                        label="Nachname"
                        pflicht
                        wert={m.nachname}
                        autoComplete="family-name"
                        fehler={zeige("nachname")}
                        onBlur={beruehrt("nachname")}
                        onChange={(v) => dispatch({ typ: "setze", patch: { nachname: v } })}
                      />
                    </div>
                    <TextFeld
                      feldKey="telefon"
                      label="Telefon"
                      pflicht
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      wert={m.telefon}
                      fehler={zeige("telefon")}
                      onBlur={beruehrt("telefon")}
                      onChange={(v) => dispatch({ typ: "setze", patch: { telefon: v } })}
                    />
                    <TextFeld
                      feldKey="email"
                      label="E-Mail"
                      pflicht
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      wert={m.email}
                      fehler={zeige("email")}
                      onBlur={beruehrt("email")}
                      onChange={(v) => dispatch({ typ: "setze", patch: { email: v.trim() } })}
                    />
                    <TextFeld
                      feldKey="vertragsnummer"
                      label="Vertragsnummer"
                      pflicht={false}
                      hilfe="Steht auf Ihrem Versicherungsschein. Wenn nicht zur Hand, finden wir sie."
                      autoCapitalize="characters"
                      autoComplete="off"
                      spellCheck={false}
                      wert={m.vertragsnummer}
                      onChange={(v) => dispatch({ typ: "setze", patch: { vertragsnummer: v } })}
                    />
                    {m.sparte === "kfz" && (
                      <Kacheln
                        feldKey="rueckruf"
                        label="Möchten Sie einen Rückruf?"
                        pflicht
                        optionen={["Ja", "Nein"]}
                        wert={m.rueckruf}
                        fehler={zeige("rueckruf")}
                        onChange={(w) => dispatch({ typ: "setze", patch: { rueckruf: String(w) } })}
                      />
                    )}
                    <div>
                      <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-[#1d2733]">
                        <input
                          id={feldDomId("einwilligung")}
                          type="checkbox"
                          checked={m.einwilligung}
                          onChange={(e) => {
                            dispatch({ typ: "setze", patch: { einwilligung: e.target.checked } });
                            dispatch({ typ: "beruehrt", key: "einwilligung" });
                          }}
                          aria-invalid={!!zeige("einwilligung")}
                          aria-describedby={zeige("einwilligung") ? `${feldDomId("einwilligung")}-fehler` : undefined}
                          className="mt-0.5 size-6 shrink-0 accent-[var(--marke)]"
                        />
                        <span>
                          Ich bin einverstanden, dass {BUERO.name} meine Angaben zur Bearbeitung des Schadens verarbeitet
                          und an den Versicherer weitergibt.
                        </span>
                      </label>
                      <FeldFehler id={`${feldDomId("einwilligung")}-fehler`} text={zeige("einwilligung")} />
                    </div>
                  </div>
                )}

                {ansicht === 5 && (
                  <Pruefen
                    m={m}
                    onAendern={(s) => gehe(s, true)}
                    onFehlt={(f) => {
                      fokusNach.current = f.key;
                      dispatch({ typ: "versucht", ansicht: f.schritt });
                      gehe(f.schritt, true);
                    }}
                  />
                )}

                {ansicht === 6 && <KundenSicht m={m} />}

                {ansicht < 6 && (
                  <div className="mt-8 flex items-center gap-3">
                    {ansicht >= 1 && (
                      <button
                        type="button"
                        onClick={zurueck}
                        className="press min-h-[52px] shrink-0 rounded-[12px] border border-[#D5D9DE] px-5 text-[16px] font-medium text-[#1d2733]"
                      >
                        Zurück
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={ansicht === 5 && !pruefeVollstaendigkeit(m).vollstaendig}
                      className="press min-h-[52px] flex-1 rounded-[12px] bg-[var(--marke)] px-5 text-[16px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {ansicht === 0
                        ? "Los geht's"
                        : ansicht === 5
                          ? "Schaden melden"
                          : z.zurueckZuPruefen && ansicht <= 4
                            ? "Zurück zur Prüfung"
                            : "Weiter"}
                    </button>
                  </div>
                )}
              </form>
            </div>

            <footer className="border-t border-[#E6E8EB] px-5 py-4 text-[12.5px] leading-relaxed text-[#5b6570]">
              <p>
                {BUERO.name} · {BUERO.anschrift}
              </p>
              <p>{technikZeile}</p>
            </footer>
          </div>
        </div>

        <aside className="hidden lg:sticky lg:top-[76px] lg:block" aria-label="Was dabei passiert">
          <div className="rounded-[20px] bg-bg p-6 shadow-[var(--shadow-soft)]">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em]">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Was dabei passiert
            </p>
            <p key={ansicht} className="demo-gleiten mt-4 text-[16.5px] leading-relaxed text-ink" aria-live="polite">
              {ERKLAERUNG[ansicht]}
            </p>
          </div>
        </aside>
      </main>

      {ansicht === 6 && z.eingang && (
        <div className="mx-auto w-full max-w-[820px] px-[max(1rem,env(safe-area-inset-left))] pb-[max(3rem,env(safe-area-inset-bottom))]">
          <BueroSicht m={m} eingang={z.eingang} />
          <AbschlussAktionen onNeu={neu} />
        </div>
      )}
    </div>
  );
}

function DemoLeiste({ farbe, onFarbe }: { farbe: Farbe; onFarbe: (f: Farbe) => void }) {
  return (
    <header className="demo-leiste sticky top-0 z-30 border-b border-line bg-bg/95 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex h-[52px] max-w-[880px] items-center justify-between gap-2 px-[max(1rem,env(safe-area-inset-left))]">
        <p className="flex min-w-0 items-center gap-2 text-[13px] leading-tight">
          <span className="bg-grad shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
            Demo
          </span>
          <span className="max-w-[96px] text-[12px] leading-[1.15] sm:hidden">es wird nichts gespeichert</span>
          <span className="hidden truncate sm:inline">So erleben Ihre Kunden die Schadenmeldung. Es wird nichts gespeichert.</span>
        </p>
        <div className="flex shrink-0 items-center">
          <div role="group" aria-label="Farbe des Büros" className="flex">
            {(Object.keys(FARBEN) as Farbe[]).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={farbe === f}
                onClick={() => onFarbe(f)}
                className="grid size-10 place-items-center"
              >
                <span
                  className={`size-6 rounded-full ring-offset-2 ring-offset-bg ${farbe === f ? "ring-2 ring-ink" : ""}`}
                  style={{ background: FARBEN[f].wert }}
                />
                <span className="sr-only">Farbe {FARBEN[f].name}</span>
              </button>
            ))}
          </div>
          <Link
            href="/#loesungen"
            className="ml-1 inline-flex min-h-[44px] items-center whitespace-nowrap rounded-[10px] px-2 text-[13px] font-medium underline decoration-line underline-offset-4"
          >
            Zur Website
          </Link>
        </div>
      </div>
    </header>
  );
}

function ErklaerungMobil({ text }: { text: string }) {
  return (
    <details className="mt-2 lg:hidden">
      <summary className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 text-[13.5px] font-medium text-[#B23A12]">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        Was passiert hier?
      </summary>
      <p className="mt-1 rounded-[12px] bg-bg px-3.5 py-3 text-[14.5px] leading-relaxed text-ink">{text}</p>
    </details>
  );
}

function SchrittStart() {
  return (
    <div className="space-y-4 text-[16px] leading-relaxed text-[#1d2733]">
      <p>
        Melden Sie uns Ihren Schaden in wenigen Schritten. Wir prüfen Ihre Angaben und leiten alles an Ihren
        Versicherer weiter.
      </p>
      <div className="rounded-[16px] bg-[color-mix(in_srgb,var(--marke)_7%,white)] p-4">
        <p className="font-semibold">Das hilft uns</p>
        <ul className="mt-2 space-y-1.5 text-[15px]">
          {["Fotos vom Schaden", "Ihre Vertragsnummer, falls zur Hand", "bei Unfall oder Einbruch: Aktenzeichen der Polizei"].map(
            (t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--marke)]" aria-hidden="true" />
                {t}
              </li>
            ),
          )}
        </ul>
      </div>
      <div className="rounded-[16px] bg-[#FFF3E0] p-4 text-[#4d2a00]">
        <p className="font-semibold">Sofort handeln</p>
        <p className="mt-1 text-[15px]">
          Bei Gefahr zuerst Notruf 112. Schaden möglichst gering halten, zum Beispiel Wasser abstellen.
        </p>
      </div>
    </div>
  );
}

function Gegenstaende({
  m,
  zeige,
  beruehrt,
  onNeu,
  onAendern,
  onWeg,
}: {
  m: { gegenstaende: { id: string; bezeichnung: string; jahr: string; neupreis: string }[] };
  zeige: (key: string) => string | undefined;
  beruehrt: (key: string) => () => void;
  onNeu: () => void;
  onAendern: (id: string, patch: Partial<{ bezeichnung: string; jahr: string; neupreis: string }>) => void;
  onWeg: (id: string) => void;
}) {
  return (
    <div id={feldDomId("gegenstaende")} tabIndex={-1} className="outline-none">
      <p className="text-[15.5px] font-medium">Beschädigte oder gestohlene Gegenstände</p>
      <ul className="mt-3 space-y-3">
        {m.gegenstaende.map((g, i) => (
          <li key={g.id} className="rounded-[14px] border border-[#E1E4E8] p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-medium text-[#5b6570]">Gegenstand {i + 1}</span>
              {m.gegenstaende.length > 1 && (
                <button type="button" onClick={() => onWeg(g.id)} className="press -mr-2 grid size-11 place-items-center text-[#5b6570]">
                  <IconMuell className="size-5" />
                  <span className="sr-only">Gegenstand {i + 1} entfernen</span>
                </button>
              )}
            </div>
            <div className="space-y-3">
              <TextFeld
                feldKey={`g.${g.id}.bezeichnung`}
                label="Bezeichnung"
                pflicht
                placeholder="z. B. Laptop, Teppich, E-Bike"
                autoComplete="off"
                wert={g.bezeichnung}
                fehler={zeige(`g.${g.id}.bezeichnung`)}
                onBlur={beruehrt(`g.${g.id}.bezeichnung`)}
                onChange={(v) => onAendern(g.id, { bezeichnung: v })}
              />
              <div className="grid grid-cols-2 gap-3">
                <TextFeld
                  feldKey={`g.${g.id}.jahr`}
                  label="Anschaffungsjahr"
                  pflicht={false}
                  inputMode="numeric"
                  maxLength={4}
                  autoComplete="off"
                  wert={g.jahr}
                  fehler={zeige(`g.${g.id}.jahr`)}
                  onBlur={beruehrt(`g.${g.id}.jahr`)}
                  onChange={(v) => onAendern(g.id, { jahr: v.replace(/\D/g, "") })}
                />
                <TextFeld
                  feldKey={`g.${g.id}.neupreis`}
                  label="Neupreis in €"
                  pflicht={false}
                  inputMode="decimal"
                  autoComplete="off"
                  wert={g.neupreis}
                  fehler={zeige(`g.${g.id}.neupreis`)}
                  onBlur={beruehrt(`g.${g.id}.neupreis`)}
                  onChange={(v) => onAendern(g.id, { neupreis: v })}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <FeldFehler id={`${feldDomId("gegenstaende")}-fehler`} text={zeige("gegenstaende")} />
      <button
        type="button"
        onClick={onNeu}
        disabled={m.gegenstaende.length >= MAX_GEGENSTAENDE}
        className="press mt-3 min-h-[48px] w-full rounded-[12px] border border-dashed border-[#C9CED4] text-[15px] font-medium text-[var(--marke)] disabled:opacity-50"
      >
        Gegenstand hinzufügen
      </button>
    </div>
  );
}

function Pruefen({
  m,
  onAendern,
  onFehlt,
}: {
  m: Parameters<typeof pruefeVollstaendigkeit>[0];
  onAendern: (s: Schritt) => void;
  onFehlt: (f: Fehler) => void;
}) {
  const { vollstaendig, fehlend } = pruefeVollstaendigkeit(m);
  const sparte = m.sparte ? spartenNach[m.sparte] : null;
  const angaben = sparte
    ? sichtbareFelder(sparte, m.felder)
        .map((f) => [f.label, Array.isArray(m.felder[f.id]) ? (m.felder[f.id] as string[]).join(", ") : String(m.felder[f.id] ?? "")])
        .filter(([, w]) => w)
    : [];

  return (
    <div className="space-y-4">
      <div aria-live="polite">
        {vollstaendig ? (
          <p className="flex items-center gap-3 rounded-[14px] bg-[#EAF5EE] px-4 py-3.5 text-[16px] font-semibold text-[#1E4D33]">
            <span className="demo-haken-pop grid size-8 shrink-0 place-items-center rounded-full bg-[#2E7D4F] text-white">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            Ihre Meldung ist vollständig.
          </p>
        ) : (
          <div className="rounded-[14px] bg-[#FFF3E0] px-4 py-3.5 text-[#4d2a00]">
            <p className="text-[16px] font-semibold">Es fehlen noch Angaben:</p>
            <ul className="mt-2 space-y-1">
              {fehlend.map((f) => (
                <li key={f.key}>
                  <button type="button" onClick={() => onFehlt(f)} className="min-h-[40px] text-left text-[15px] underline underline-offset-4">
                    {f.label}: {f.meldung}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Zusammenfassung titel="Sparte" schritt={1} onAendern={onAendern}>
        <p>{spartenName(m)}</p>
      </Zusammenfassung>
      <Zusammenfassung titel="Schaden" schritt={2} onAendern={onAendern}>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
          <dt className="text-[#5b6570]">Schadentag</dt>
          <dd>
            {formatDatum(m.schadentag)}
            {m.uhrzeit && `, ${m.uhrzeit} Uhr`}
          </dd>
          <dt className="text-[#5b6570]">Ort</dt>
          <dd>{sparte?.versicherungsort && m.gleicheAdresse ? "Versicherungsort" : m.schadenort}</dd>
          {angaben.map(([k, w]) => (
            <div key={k} className="contents">
              <dt className="text-[#5b6570]">{k}</dt>
              <dd className="min-w-0 break-words">{w}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 whitespace-pre-wrap break-words">{m.beschreibung}</p>
        {m.gegenstaende.length > 0 && sparte?.gegenstaende && (
          <ul className="mt-2 list-disc pl-5">
            {m.gegenstaende.map((g) => (
              <li key={g.id}>{g.bezeichnung}</li>
            ))}
          </ul>
        )}
      </Zusammenfassung>
      <Zusammenfassung titel={`Fotos (${m.fotos.length})`} schritt={3} onAendern={onAendern}>
        {m.fotos.length ? (
          <div className="flex flex-wrap gap-1.5">
            {m.fotos.map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={f.id} src={f.url} alt={`Foto ${i + 1}`} className="size-14 rounded-[8px] object-cover" />
            ))}
          </div>
        ) : (
          <p className="text-[#5b6570]">Keine Fotos</p>
        )}
      </Zusammenfassung>
      <Zusammenfassung titel="Kontakt" schritt={4} onAendern={onAendern}>
        <p>
          {m.vorname} {m.nachname}
        </p>
        <p className="break-all">{m.telefon}</p>
        <p className="break-all">{m.email}</p>
        <p className="text-[#5b6570]">Vertrag: {m.vertragsnummer.trim() || "wird nachgereicht"}</p>
      </Zusammenfassung>
    </div>
  );
}

function Zusammenfassung({
  titel,
  schritt,
  onAendern,
  children,
}: {
  titel: string;
  schritt: Schritt;
  onAendern: (s: Schritt) => void;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[14px] border border-[#E1E4E8] px-4 py-3 text-[15px] text-[#1d2733]">
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#5b6570]">{titel}</h2>
        <button
          type="button"
          onClick={() => onAendern(schritt)}
          className="-mr-2 min-h-[44px] px-2 text-[14.5px] font-medium text-[var(--marke)] underline underline-offset-4"
        >
          Ändern<span className="sr-only">: {titel}</span>
        </button>
      </div>
      <div className="mt-1">{children}</div>
    </section>
  );
}
