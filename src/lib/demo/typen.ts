// Datenmodell der Demo-Schadenmeldung. Alles bleibt im Browser.

export type SpartenId = "kfz" | "hausrat" | "wohngebaeude" | "haftpflicht" | "glas";

export type FeldWert = string | string[];
export type Felder = Record<string, FeldWert>;

export type Gegenstand = { id: string; bezeichnung: string; jahr: string; neupreis: string };
export type Foto = { id: string; url: string; name: string };

export type Meldung = {
  sparte: SpartenId | "";
  schadentag: string; // JJJJ-MM-TT aus <input type="date">
  uhrzeit: string;
  gleicheAdresse: boolean;
  schadenort: string;
  beschreibung: string;
  felder: Felder; // je Sparte, siehe sparten.ts
  gegenstaende: Gegenstand[];
  fotos: Foto[];
  vorname: string;
  nachname: string;
  telefon: string;
  email: string;
  vertragsnummer: string;
  rueckruf: string;
  einwilligung: boolean;
};

export type Feld = {
  id: string;
  label: string;
  typ: "auswahl" | "mehrfach" | "text" | "textarea" | "zahl";
  optionen?: readonly string[];
  // Standard: Pflicht. Als Funktion, wenn es von anderen Antworten abhängt.
  pflicht?: boolean | ((f: Felder) => boolean);
  // Feld erscheint erst, wenn die Bedingung erfüllt ist
  sichtbar?: (f: Felder) => boolean;
  platzhalter?: string;
  hilfe?: string;
  grossbuchstaben?: boolean;
  inputMode?: "numeric" | "decimal" | "text" | "tel" | "email";
  autoComplete?: string;
  // Hinweis, der nach einer bestimmten Antwort erscheint
  hinweise?: { bei: string; text: string }[];
};

export type Sparte = {
  id: SpartenId;
  name: string;
  // Kontrollkästchen „Gleiche Adresse wie Versicherungsort“
  versicherungsort: boolean;
  hilfeBeschreibung: string;
  felder: Feld[];
  gegenstaende: boolean;
  abschnittHinweis?: string;
  fotoTipps: string[];
  // Fotos optional, z. B. bei Diebstahl
  fotoOptional: (f: Felder) => boolean;
};

export type Schritt = 1 | 2 | 3 | 4;

export type Fehler = { key: string; schritt: Schritt; label: string; meldung: string };

export const MAX_FOTOS = 10;
export const MAX_GEGENSTAENDE = 20;

export function leereMeldung(): Meldung {
  return {
    sparte: "",
    schadentag: "",
    uhrzeit: "",
    gleicheAdresse: true,
    schadenort: "",
    beschreibung: "",
    felder: {},
    gegenstaende: [],
    fotos: [],
    vorname: "",
    nachname: "",
    telefon: "",
    email: "",
    vertragsnummer: "",
    rueckruf: "",
    einwilligung: false,
  };
}

// id für DOM-Elemente aus einem Fehler-Schlüssel, z. B. "f.kennzeichen" -> "feld-f-kennzeichen"
export const feldDomId = (key: string) => `feld-${key.replace(/[^a-zA-Z0-9]/g, "-")}`;
