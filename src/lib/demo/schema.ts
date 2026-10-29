// Prüfung je Schritt und Sparte. Liefert verständliche deutsche Fehler mit Schlüssel,
// damit die Oberfläche sie am Feld zeigen und das erste Feld fokussieren kann.
import { z } from "zod";
import { istPflicht, sichtbareFelder, spartenNach } from "./sparten.ts";
import type { Feld, Fehler, Meldung, Schritt } from "./typen.ts";
import { MAX_FOTOS, MAX_GEGENSTAENDE } from "./typen.ts";

const M = {
  sparte: "Bitte wählen Sie aus, worum es geht.",
  datumLeer: "Bitte geben Sie das Datum an.",
  datum: "Bitte prüfen Sie das Datum.",
  ort: "Bitte geben Sie an, wo der Schaden passiert ist.",
  beschreibung: "Bitte beschreiben Sie kurz, was passiert ist (mindestens 20 Zeichen).",
  auswahl: "Bitte wählen Sie eine Antwort.",
  mehrfach: "Bitte wählen Sie mindestens eine Antwort.",
  text: "Bitte füllen Sie dieses Feld aus.",
  zahl: "Bitte geben Sie nur eine Zahl ein.",
  gegenstaende: "Bitte nennen Sie mindestens einen Gegenstand.",
  bezeichnung: "Bitte geben Sie an, um welchen Gegenstand es geht.",
  betrag: "Bitte geben Sie einen Betrag in Euro ein, zum Beispiel 450 oder 450,00.",
  jahr: "Bitte geben Sie ein Jahr ein, zum Beispiel 2021.",
  fotos: "Bitte fügen Sie mindestens ein Foto hinzu.",
  fotosMax: `Bitte wählen Sie höchstens ${MAX_FOTOS} Fotos.`,
  vorname: "Bitte geben Sie Ihren Vornamen an.",
  nachname: "Bitte geben Sie Ihren Nachnamen an.",
  telefonLeer: "Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen.",
  telefon: "Bitte prüfen Sie die Telefonnummer.",
  email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
  rueckruf: "Bitte sagen Sie uns, ob Sie einen Rückruf möchten.",
  einwilligung: "Bitte bestätigen Sie die Einwilligung.",
};

// Lokales Datum als JJJJ-MM-TT, damit der Vergleich mit <input type="date"> passt
export function isoDatum(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// Schadentag: nicht in der Zukunft, nicht älter als 3 Jahre
export function pruefeDatum(wert: string, heute: Date = new Date()): string | null {
  if (!wert) return M.datumLeer;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(wert)) return M.datum;
  const grenze = new Date(heute);
  grenze.setFullYear(grenze.getFullYear() - 3);
  if (wert > isoDatum(heute) || wert < isoDatum(grenze)) return M.datum;
  return null;
}

const nichtLeer = (meldung: string) => z.string().trim().min(1, { error: meldung });

const kontaktSchema = z.object({
  vorname: nichtLeer(M.vorname),
  nachname: nichtLeer(M.nachname),
  telefon: nichtLeer(M.telefonLeer).pipe(z.string().regex(/^[+\d][\d\s/()-]{5,}$/, { error: M.telefon })),
  email: z.email({ error: M.email }),
  einwilligung: z.literal(true, { error: M.einwilligung }),
});

const betragSchema = z.string().regex(/^\d{1,7}([.,]\d{1,2})?$/, { error: M.betrag });
const jahrSchema = z.string().regex(/^(19|20)\d{2}$/, { error: M.jahr });

// Zod-Schema für ein Sparten-Feld, abhängig von Typ und Pflicht
function feldSchema(feld: Feld, pflicht: boolean) {
  switch (feld.typ) {
    case "auswahl":
      return pflicht ? z.enum(feld.optionen as [string, ...string[]], { error: M.auswahl }) : z.any();
    case "mehrfach":
      return pflicht ? z.array(z.string()).min(1, { error: M.mehrfach }) : z.any();
    case "zahl":
      return z.string().regex(/^\d{0,5}$/, { error: M.zahl }).refine((v) => !pflicht || v !== "", { error: M.text });
    default:
      return pflicht ? nichtLeer(M.text) : z.any();
  }
}

const erste = (r: { success: boolean; error?: z.ZodError }) => (r.success ? null : (r.error?.issues[0]?.message ?? M.text));

export function fehlerSchritt(schritt: Schritt, m: Meldung, heute: Date = new Date()): Fehler[] {
  const fehler: Fehler[] = [];
  const add = (key: string, label: string, meldung: string | null) => {
    if (meldung) fehler.push({ key, schritt, label, meldung });
  };
  const sparte = m.sparte ? spartenNach[m.sparte] : null;

  if (schritt === 1) {
    add("sparte", "Sparte", sparte ? null : M.sparte);
  }

  if (schritt === 2) {
    if (!sparte) {
      add("sparte", "Sparte", M.sparte);
      return fehler;
    }
    add("schadentag", "Schadentag", pruefeDatum(m.schadentag, heute));
    if (!(sparte.versicherungsort && m.gleicheAdresse)) add("schadenort", "Schadenort", m.schadenort.trim() ? null : M.ort);
    add("beschreibung", "Was ist passiert?", m.beschreibung.trim().length >= 20 ? null : M.beschreibung);

    for (const feld of sichtbareFelder(sparte, m.felder)) {
      const wert = m.felder[feld.id] ?? (feld.typ === "mehrfach" ? [] : "");
      add(`f.${feld.id}`, feld.label, erste(feldSchema(feld, istPflicht(feld, m.felder)).safeParse(wert)));
    }

    if (sparte.gegenstaende) {
      if (m.gegenstaende.length === 0) add("gegenstaende", "Gegenstände", M.gegenstaende);
      if (m.gegenstaende.length > MAX_GEGENSTAENDE) add("gegenstaende", "Gegenstände", `Bitte höchstens ${MAX_GEGENSTAENDE} Gegenstände.`);
      m.gegenstaende.forEach((g, i) => {
        add(`g.${g.id}.bezeichnung`, `Gegenstand ${i + 1}`, g.bezeichnung.trim() ? null : M.bezeichnung);
        if (g.jahr.trim()) add(`g.${g.id}.jahr`, `Anschaffungsjahr Gegenstand ${i + 1}`, erste(jahrSchema.safeParse(g.jahr.trim())));
        if (g.neupreis.trim()) add(`g.${g.id}.neupreis`, `Neupreis Gegenstand ${i + 1}`, erste(betragSchema.safeParse(g.neupreis.trim())));
      });
    }
  }

  if (schritt === 3 && sparte) {
    if (m.fotos.length === 0 && !sparte.fotoOptional(m.felder)) add("fotos", "Fotos", M.fotos);
    if (m.fotos.length > MAX_FOTOS) add("fotos", "Fotos", M.fotosMax);
  }

  if (schritt === 4) {
    const r = kontaktSchema.safeParse(m);
    if (!r.success) {
      const labels: Record<string, string> = {
        vorname: "Vorname",
        nachname: "Nachname",
        telefon: "Telefon",
        email: "E-Mail",
        einwilligung: "Einwilligung",
      };
      const gesehen = new Set<string>();
      for (const i of r.error.issues) {
        const key = String(i.path[0]);
        if (gesehen.has(key)) continue;
        gesehen.add(key);
        add(key, labels[key] ?? key, i.message);
      }
    }
    if (m.sparte === "kfz") add("rueckruf", "Rückruf", m.rueckruf ? null : M.rueckruf);
    // Reihenfolge wie im Formular
    const reihenfolge = ["vorname", "nachname", "telefon", "email", "rueckruf", "einwilligung"];
    fehler.sort((a, b) => reihenfolge.indexOf(a.key) - reihenfolge.indexOf(b.key));
  }

  return fehler;
}

export const istBetrag = (v: string) => betragSchema.safeParse(v.trim()).success;
