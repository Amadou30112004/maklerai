import type { FeldWert, Foto, Gegenstand, Meldung, SpartenId } from "@/lib/demo/typen";
import { leereMeldung } from "@/lib/demo/typen";

export type Farbe = "blau" | "gruen" | "rot";

// Markenfarben des Beispielbüros. Weißer Text darauf hat jeweils deutlich über 4,5 : 1 Kontrast.
export const FARBEN: Record<Farbe, { name: string; wert: string }> = {
  blau: { name: "Blau", wert: "#1F3A5F" },
  gruen: { name: "Grün", wert: "#1E5B4A" },
  rot: { name: "Rot", wert: "#8C2F39" },
};

// 0 Start, 1 bis 5 Formular, 6 Abschluss
export type Ansicht = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Eingang = { zeit: string; nummer: string };

export const istFarbe = (f: unknown): f is Farbe => typeof f === "string" && f in FARBEN;

export type Zustand = {
  ansicht: Ansicht;
  m: Meldung;
  // null: noch nicht gewählt, dann gilt ?farbe= aus der Adresse oder Blau
  farbe: Farbe | null;
  beruehrt: Record<string, true>;
  versucht: Partial<Record<Ansicht, true>>;
  // Nach „Ändern“ in der Prüfansicht direkt zurück dorthin
  zurueckZuPruefen: boolean;
  eingang: Eingang | null;
};

export type Aktion =
  | { typ: "setze"; patch: Partial<Meldung> }
  | { typ: "feld"; id: string; wert: FeldWert }
  | { typ: "sparte"; sparte: SpartenId }
  | { typ: "gegenstandNeu" }
  | { typ: "gegenstand"; id: string; patch: Partial<Gegenstand> }
  | { typ: "gegenstandWeg"; id: string }
  | { typ: "fotosDazu"; fotos: Foto[] }
  | { typ: "fotoWeg"; id: string }
  | { typ: "gehe"; ansicht: Ansicht; zurueckZuPruefen?: boolean }
  | { typ: "beruehrt"; key: string }
  | { typ: "versucht"; ansicht?: Ansicht }
  | { typ: "beispiel"; meldung: Meldung }
  | { typ: "farbe"; farbe: Farbe }
  | { typ: "absenden"; eingang: Eingang }
  | { typ: "neu" };

let zaehler = 0;
export const neueId = () => `id${Date.now().toString(36)}${(zaehler++).toString(36)}`;

const leererGegenstand = (): Gegenstand => ({ id: neueId(), bezeichnung: "", jahr: "", neupreis: "" });

export function startZustand(farbe: Farbe | null = null): Zustand {
  return { ansicht: 0, m: leereMeldung(), farbe, beruehrt: {}, versucht: {}, zurueckZuPruefen: false, eingang: null };
}

export function reducer(z: Zustand, a: Aktion): Zustand {
  switch (a.typ) {
    case "setze":
      return { ...z, m: { ...z.m, ...a.patch } };
    case "feld":
      return { ...z, m: { ...z.m, felder: { ...z.m.felder, [a.id]: a.wert } } };
    case "sparte": {
      if (z.m.sparte === a.sparte) return z;
      // Sparten-Angaben gehören zur Sparte, gemeinsame Angaben bleiben
      const gegenstaende = a.sparte === "hausrat" && z.m.gegenstaende.length === 0 ? [leererGegenstand()] : z.m.gegenstaende;
      return { ...z, m: { ...z.m, sparte: a.sparte, felder: {}, gegenstaende, rueckruf: "" } };
    }
    case "gegenstandNeu":
      return { ...z, m: { ...z.m, gegenstaende: [...z.m.gegenstaende, leererGegenstand()] } };
    case "gegenstand":
      return {
        ...z,
        m: { ...z.m, gegenstaende: z.m.gegenstaende.map((g) => (g.id === a.id ? { ...g, ...a.patch } : g)) },
      };
    case "gegenstandWeg":
      return { ...z, m: { ...z.m, gegenstaende: z.m.gegenstaende.filter((g) => g.id !== a.id) } };
    case "fotosDazu":
      return { ...z, m: { ...z.m, fotos: [...z.m.fotos, ...a.fotos] } };
    case "fotoWeg":
      return { ...z, m: { ...z.m, fotos: z.m.fotos.filter((f) => f.id !== a.id) } };
    case "gehe":
      return { ...z, ansicht: a.ansicht, zurueckZuPruefen: a.zurueckZuPruefen ?? (a.ansicht === 5 ? false : z.zurueckZuPruefen) };
    case "beruehrt":
      return z.beruehrt[a.key] ? z : { ...z, beruehrt: { ...z.beruehrt, [a.key]: true } };
    case "versucht":
      return { ...z, versucht: { ...z.versucht, [a.ansicht ?? z.ansicht]: true } };
    case "beispiel":
      return { ...z, m: a.meldung, versucht: {}, beruehrt: {} };
    case "farbe":
      return { ...z, farbe: a.farbe };
    case "absenden":
      return { ...z, eingang: a.eingang, ansicht: 6 };
    case "neu":
      return startZustand(z.farbe);
  }
}
