// Felder, Hinweise und Foto-Tipps je Sparte als Daten.
// Neue Sparten kommen hier dazu, die Oberfläche rendert sie automatisch.
// Die Formulare fragen ab, entscheiden aber nichts über die Deckung.
import type { Felder, Sparte, SpartenId } from "./typen.ts";

const JA_NEIN = ["Ja", "Nein"] as const;

const ist = (f: Felder, id: string, ...werte: string[]) => werte.includes(String(f[id] ?? ""));

const KFZ_ART = [
  "Unfall mit anderem Fahrzeug",
  "Parkschaden",
  "Wildunfall",
  "Glasschaden",
  "Hagel oder Sturm",
  "Diebstahl oder Einbruch",
  "Sonstiges",
] as const;

const HAUSRAT_URSACHE = [
  "Leitungswasser",
  "Einbruch oder Diebstahl",
  "Fahrraddiebstahl",
  "Feuer",
  "Sturm oder Hagel",
  "Sonstiges",
] as const;

const DIEBSTAHL_HAUSRAT = ["Einbruch oder Diebstahl", "Fahrraddiebstahl"];

export const sparten: Sparte[] = [
  {
    id: "kfz",
    name: "Kfz",
    versicherungsort: false,
    hilfeBeschreibung: "Zum Beispiel: Wo ist es passiert, wie war die Verkehrslage, was ist beschädigt?",
    gegenstaende: false,
    abschnittHinweis: "Bitte unterschreiben Sie vor Ort kein Schuldanerkenntnis.",
    felder: [
      {
        id: "kennzeichen",
        label: "Ihr Kennzeichen",
        typ: "text",
        platzhalter: "z. B. VS AB 123",
        grossbuchstaben: true,
      },
      {
        id: "art",
        label: "Art des Schadens",
        typ: "auswahl",
        optionen: KFZ_ART,
        hinweise: [{ bei: "Wildunfall", text: "Lassen Sie sich den Wildunfall vom Jäger oder der Polizei bescheinigen." }],
      },
      { id: "fahrer", label: "Wer ist gefahren?", typ: "auswahl", optionen: ["Ich selbst", "eine andere Person"] },
      {
        id: "fahrerName",
        label: "Name der Person, die gefahren ist",
        typ: "text",
        autoComplete: "off",
        sichtbar: (f) => ist(f, "fahrer", "eine andere Person"),
      },
      {
        id: "gegnerKennzeichen",
        label: "Kennzeichen Unfallgegner",
        typ: "text",
        grossbuchstaben: true,
        sichtbar: (f) => ist(f, "art", "Unfall mit anderem Fahrzeug", "Parkschaden"),
        pflicht: (f) => ist(f, "art", "Unfall mit anderem Fahrzeug"),
      },
      {
        id: "gegnerName",
        label: "Name Unfallgegner",
        typ: "text",
        pflicht: false,
        sichtbar: (f) => ist(f, "art", "Unfall mit anderem Fahrzeug", "Parkschaden"),
      },
      {
        id: "gegnerVersicherung",
        label: "Versicherung des Gegners, falls bekannt",
        typ: "text",
        pflicht: false,
        sichtbar: (f) => ist(f, "art", "Unfall mit anderem Fahrzeug", "Parkschaden"),
      },
      { id: "polizei", label: "War die Polizei vor Ort?", typ: "auswahl", optionen: JA_NEIN },
      {
        id: "aktenzeichen",
        label: "Aktenzeichen der Polizei",
        typ: "text",
        pflicht: false,
        sichtbar: (f) => ist(f, "polizei", "Ja"),
      },
      {
        id: "dienststelle",
        label: "Dienststelle",
        typ: "text",
        pflicht: false,
        sichtbar: (f) => ist(f, "polizei", "Ja"),
      },
      {
        id: "verletzt",
        label: "Wurde jemand verletzt?",
        typ: "auswahl",
        optionen: JA_NEIN,
        hinweise: [{ bei: "Ja", text: "Bitte rufen Sie uns zusätzlich an." }],
      },
      { id: "fahrbereit", label: "Ist das Fahrzeug noch fahrbereit?", typ: "auswahl", optionen: ["Ja", "Nein", "Weiß nicht"] },
    ],
    fotoTipps: ["Gesamtansicht Ihres Fahrzeugs", "Schaden aus der Nähe", "Kennzeichen des Unfallgegners", "Unfallstelle"],
    fotoOptional: (f) => ist(f, "art", "Diebstahl oder Einbruch"),
  },
  {
    id: "hausrat",
    name: "Hausrat",
    versicherungsort: true,
    hilfeBeschreibung: "Zum Beispiel: Was ist kaputt oder weg, wie ist es passiert, wann haben Sie es bemerkt?",
    gegenstaende: true,
    felder: [
      { id: "ursache", label: "Was war die Ursache?", typ: "auswahl", optionen: HAUSRAT_URSACHE },
      {
        id: "anzeige",
        label: "Haben Sie Anzeige bei der Polizei erstattet?",
        typ: "auswahl",
        optionen: JA_NEIN,
        sichtbar: (f) => ist(f, "ursache", ...DIEBSTAHL_HAUSRAT),
      },
      {
        id: "aktenzeichen",
        label: "Aktenzeichen der Polizei",
        typ: "text",
        pflicht: false,
        sichtbar: (f) => ist(f, "ursache", ...DIEBSTAHL_HAUSRAT),
      },
      {
        id: "radMarke",
        label: "Marke und Modell des Fahrrads",
        typ: "text",
        sichtbar: (f) => ist(f, "ursache", "Fahrraddiebstahl"),
      },
      {
        id: "rahmennummer",
        label: "Rahmennummer",
        typ: "text",
        pflicht: false,
        grossbuchstaben: true,
        sichtbar: (f) => ist(f, "ursache", "Fahrraddiebstahl"),
      },
      {
        id: "sicherung",
        label: "Wie war das Rad gesichert?",
        typ: "text",
        platzhalter: "z. B. Bügelschloss am Fahrradständer",
        sichtbar: (f) => ist(f, "ursache", "Fahrraddiebstahl"),
      },
    ],
    fotoTipps: [
      "Schaden aus der Nähe",
      "Ursache, zum Beispiel undichter Schlauch",
      "beschädigte Gegenstände",
      "bei Einbruch: Einbruchsspuren",
    ],
    fotoOptional: (f) => ist(f, "ursache", ...DIEBSTAHL_HAUSRAT),
  },
  {
    id: "wohngebaeude",
    name: "Wohngebäude",
    versicherungsort: true,
    hilfeBeschreibung: "Zum Beispiel: Wo am Haus ist der Schaden, seit wann, was haben Sie bemerkt?",
    gegenstaende: false,
    abschnittHinweis: "Beschädigte Teile bitte nicht entsorgen, bis der Versicherer zugestimmt hat.",
    felder: [
      {
        id: "ursache",
        label: "Was war die Ursache?",
        typ: "auswahl",
        optionen: ["Leitungswasser", "Sturm oder Hagel", "Feuer oder Blitz", "Starkregen oder Hochwasser", "Sonstiges"],
      },
      {
        id: "betroffen",
        label: "Was ist betroffen?",
        typ: "mehrfach",
        optionen: ["Dach", "Fassade", "Fenster oder Türen", "Leitungen", "Böden oder Wände innen", "Sonstiges"],
      },
      {
        id: "massnahmen",
        label: "Haben Sie schon etwas unternommen, um den Schaden zu begrenzen?",
        typ: "auswahl",
        optionen: JA_NEIN,
      },
      {
        id: "massnahmenText",
        label: "Was haben Sie unternommen?",
        typ: "text",
        platzhalter: "z. B. Wasser abgestellt, Plane über das Dach gelegt",
        sichtbar: (f) => ist(f, "massnahmen", "Ja"),
      },
      {
        id: "handwerker",
        label: "Ist schon ein Handwerker beauftragt?",
        typ: "auswahl",
        optionen: ["Ja", "Nein", "Noch nicht, brauche Hilfe"],
      },
    ],
    fotoTipps: ["Gesamtansicht", "Schaden aus der Nähe", "Ursache"],
    fotoOptional: () => false,
  },
  {
    id: "haftpflicht",
    name: "Privathaftpflicht",
    versicherungsort: false,
    hilfeBeschreibung: "Zum Beispiel: Wem ist was passiert, wie kam es dazu, wer war dabei?",
    gegenstaende: false,
    abschnittHinweis: "Bitte sagen Sie der geschädigten Person keine Zahlung zu. Das klären wir mit dem Versicherer.",
    felder: [
      { id: "geschaedigterName", label: "Name der geschädigten Person", typ: "text", autoComplete: "off" },
      {
        id: "geschaedigterKontakt",
        label: "Telefon oder E-Mail der geschädigten Person",
        typ: "text",
        pflicht: false,
        autoComplete: "off",
      },
      {
        id: "beziehung",
        label: "In welcher Beziehung stehen Sie zur geschädigten Person?",
        typ: "auswahl",
        optionen: [
          "Fremde Person",
          "Bekannte oder Freunde",
          "Familie im eigenen Haushalt",
          "Familie außerhalb des Haushalts",
          "Vermieter",
        ],
      },
      { id: "beschaedigt", label: "Was wurde beschädigt?", typ: "text", platzhalter: "z. B. Brille, Handy, Laminat" },
      {
        id: "alterPreis",
        label: "Ungefähres Alter und Neupreis",
        typ: "text",
        pflicht: false,
        platzhalter: "z. B. 2 Jahre, etwa 400 €",
      },
      {
        id: "forderungen",
        label: "Hat die geschädigte Person schon Forderungen gestellt?",
        typ: "auswahl",
        optionen: JA_NEIN,
      },
    ],
    fotoTipps: ["beschädigter Gegenstand", "Typenschild oder Kaufbeleg, falls vorhanden"],
    fotoOptional: () => false,
  },
  {
    id: "glas",
    name: "Glas",
    versicherungsort: true,
    hilfeBeschreibung: "Zum Beispiel: Wie ist das Glas zu Bruch gegangen, wie groß ist der Sprung?",
    gegenstaende: false,
    felder: [
      {
        id: "was",
        label: "Was ist beschädigt?",
        typ: "auswahl",
        optionen: ["Fensterscheibe", "Glastür", "Ceranfeld oder Induktionsfeld", "Duschkabine", "Sonstiges"],
      },
      { id: "breite", label: "Ungefähre Breite in cm", typ: "zahl", pflicht: false, inputMode: "numeric" },
      { id: "hoehe", label: "Ungefähre Höhe in cm", typ: "zahl", pflicht: false, inputMode: "numeric" },
      {
        id: "gefahr",
        label: "Besteht Gefahr, zum Beispiel ein offenes Fenster?",
        typ: "auswahl",
        optionen: JA_NEIN,
        hinweise: [{ bei: "Ja", text: "Rufen Sie uns an, wir organisieren eine Notverglasung." }],
      },
    ],
    fotoTipps: ["gesamte Scheibe", "Bruchstelle aus der Nähe"],
    fotoOptional: () => false,
  },
];

export const spartenNach = Object.fromEntries(sparten.map((s) => [s.id, s])) as Record<SpartenId, Sparte>;

export function istPflicht(feld: Sparte["felder"][number], f: Felder) {
  if (feld.pflicht === undefined) return true;
  return typeof feld.pflicht === "function" ? feld.pflicht(f) : feld.pflicht;
}

export function istSichtbar(feld: Sparte["felder"][number], f: Felder) {
  return feld.sichtbar ? feld.sichtbar(f) : true;
}

export function sichtbareFelder(sparte: Sparte, f: Felder) {
  return sparte.felder.filter((feld) => istSichtbar(feld, f));
}

export const BUERO = {
  name: "Muster Versicherungsmakler",
  anschrift: "Musterstraße 1 · 12345 Musterstadt",
  telefon: "[TELEFON BÜRO]",
  versichererMail: "schaden@beispiel-versicherer.de",
};
