// Realistische Beispieldaten je Sparte, damit die Demo im Gespräch in unter einer Minute läuft.
// Alle Personen, Kennzeichen und Nummern sind erfunden.
import { isoDatum } from "./schema.ts";
import type { Foto, Meldung, SpartenId } from "./typen.ts";
import { leereMeldung } from "./typen.ts";

const KONTAKT = {
  vorname: "Julia",
  nachname: "Becker",
  telefon: "0171 2345678",
  email: "julia.becker@example.de",
  einwilligung: true,
};

type Beispiel = Pick<Meldung, "beschreibung" | "felder"> & Partial<Meldung>;

const daten: Record<SpartenId, Beispiel> = {
  kfz: {
    uhrzeit: "07:45",
    schadenort: "Kreuzung Bahnhofstraße und Lindenweg, Villingen",
    beschreibung:
      "Ich stand an der roten Ampel, das Fahrzeug hinter mir ist aufgefahren. Die Heckstoßstange ist eingedrückt, die Heckklappe schließt nicht mehr richtig.",
    felder: {
      kennzeichen: "VS JB 482",
      art: "Unfall mit anderem Fahrzeug",
      fahrer: "Ich selbst",
      gegnerKennzeichen: "TUT K 1907",
      gegnerName: "Markus Hahn",
      gegnerVersicherung: "Beispiel Versicherung AG",
      polizei: "Ja",
      aktenzeichen: "VS-2210-0815",
      dienststelle: "Polizeirevier Villingen",
      verletzt: "Nein",
      fahrbereit: "Ja",
    },
    vertragsnummer: "KF-4471-2209",
    rueckruf: "Ja",
  },
  hausrat: {
    gleicheAdresse: true,
    beschreibung:
      "Der Schlauch der Waschmaschine ist geplatzt, als wir nicht zu Hause waren. Das Wasser stand im Bad und im Flur, der Teppich und ein Schuhschrank sind durchnässt.",
    felder: { ursache: "Leitungswasser" },
    gegenstaende: [
      { id: "b1", bezeichnung: "Teppich Flur", jahr: "2021", neupreis: "320" },
      { id: "b2", bezeichnung: "Schuhschrank", jahr: "2019", neupreis: "189,90" },
    ],
    vertragsnummer: "HR-2093-1187",
  },
  wohngebaeude: {
    gleicheAdresse: true,
    beschreibung:
      "Beim Sturm in der Nacht haben sich mehrere Dachziegel gelöst. Im Dachgeschoss ist an einer Stelle Wasser durch die Decke gekommen.",
    felder: {
      ursache: "Sturm oder Hagel",
      betroffen: ["Dach", "Böden oder Wände innen"],
      massnahmen: "Ja",
      massnahmenText: "Eimer aufgestellt und eine Plane unter die Stelle gelegt",
      handwerker: "Noch nicht, brauche Hilfe",
    },
    vertragsnummer: "WG-7710-0342",
  },
  haftpflicht: {
    schadenort: "Wohnung von Familie Schulz, Rietstraße 8, Villingen",
    beschreibung:
      "Beim Besuch bei Freunden ist mir das Rotweinglas aus der Hand gerutscht. Der Rotwein ist auf das helle Sofa gelaufen, der Fleck geht nicht heraus.",
    felder: {
      geschaedigterName: "Anna Schulz",
      geschaedigterKontakt: "0160 9876543",
      beziehung: "Bekannte oder Freunde",
      beschaedigt: "Sofa, Bezug hell",
      alterPreis: "3 Jahre, etwa 1.200 €",
      forderungen: "Nein",
    },
    vertragsnummer: "PH-5521-6630",
  },
  glas: {
    gleicheAdresse: true,
    beschreibung:
      "Beim Fußballspielen der Kinder im Garten ist ein Ball gegen die Terrassentür geflogen. Die Scheibe hat einen großen Sprung.",
    felder: { was: "Glastür", breite: "90", hoehe: "210", gefahr: "Nein" },
    vertragsnummer: "",
  },
};

// Extremfall für den Stresstest (nur in der Entwicklung über ?daten=extrem). Realistische, aber anstrengende Werte.
export function extremMeldung(heute: Date = new Date(), fotos: Foto[] = []): Meldung {
  const satz =
    'Am Morgen war der Keller nass. <b>Wasser</b> & "Rohrbruch" vermutlich am Übergang zur Hauptleitung, genau weiß ich es nicht.\nDer Installateur kommt erst nächste Woche.\n';
  return {
    ...leereMeldung(),
    sparte: "hausrat",
    schadentag: isoDatum(heute),
    uhrzeit: "23:59",
    gleicheAdresse: false,
    schadenort: "Am Oberen Mühlenweg 128 / Hinterhaus, 01067 Dresden",
    beschreibung: satz.repeat(14).slice(0, 2000),
    felder: { ursache: "Leitungswasser" },
    gegenstaende: Array.from({ length: 20 }, (_, i) => ({
      id: `x${i}`,
      bezeichnung:
        i === 0
          ? "Einbauküche Nobilia Senso mit Geschirrspüler, Kühlschrank und Induktionskochfeld"
          : i === 1
            ? "IMG_20261028_183022_HDR_bearbeitet_Waschmaschine_Kellerraum.HEIC"
            : `Umzugskarton ${i + 1} mit Büchern`,
      jahr: i % 3 === 0 ? "" : "2019",
      neupreis: i === 0 ? "12999,99" : i === 2 ? "0" : "49,9",
    })),
    fotos,
    vorname: "Aleksandra",
    nachname: "Wiśniewska-Kowalczyk",
    telefon: "+49 (0) 7721 / 98 76-54",
    email: "friederike.vonundzuhohenstein@schwarzwaelder-praezisionsteile.example.com",
    vertragsnummer: "VS-1234/567.89-0",
    einwilligung: true,
  };
}

export function beispielMeldung(sparte: SpartenId, heute: Date = new Date(), fotos: Foto[] = []): Meldung {
  const tag = new Date(heute);
  tag.setDate(tag.getDate() - 2);
  const b = daten[sparte];
  return {
    ...leereMeldung(),
    ...KONTAKT,
    schadentag: isoDatum(tag),
    uhrzeit: "18:30",
    ...b,
    felder: { ...b.felder },
    gegenstaende: (b.gegenstaende ?? []).map((g) => ({ ...g })),
    sparte,
    fotos,
  };
}
