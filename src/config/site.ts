// Zentrale Angaben der Seite. Markenname und Kontakt nur hier pflegen.
// Platzhalter in eckigen Klammern sind noch offen und vor dem Livegang zu ersetzen.

export const site = {
  // Markenname ist noch nicht final. Nie hart im Text verwenden, immer site.name.
  name: "MaklerAI",
  domain: "maklerai.de",
  url: "https://maklerai.de",
  claim: "Digitalisierung für den Innendienst von Maklerbüros",
  beschreibung:
    "Wir richten fünf Automationen für kleine Versicherungsmaklerbüros ein: Schadenmeldung per Link, WhatsApp-Kanal, Dokumentenablage, Kundenänderungen und Dokumente anfordern.",

  person: {
    name: "Amadou Jalloh",
    vorname: "Amadou",
    email: "amadou@jalloh.net",
    foto: "/amadou-jalloh.jpg",
  },

  // Google-Kalender-Buchungsseite von amadou@jalloh.net
  bookingUrl: "https://calendar.app.google/RqoDCxYyffymsTUH9",

  platzhalter: {
    anschrift: "[ANSCHRIFT]",
    ustId: "[USt-IdNr. falls vorhanden]",
    telefon: "[TELEFON]",
    hoster: "[HOSTING-ANBIETER, z. B. Vercel Inc.]",
    datum: "[STAND DATUM]",
  },

  // Produktversprechen zum Datenschutz.
  // Muss technisch eingehalten werden.
  datenschutzVersprechen: [
    "Hosting in der EU",
    "AV-Vertrag inklusive",
    "Getrennt je Büro",
    "Kein KI-Training mit Ihren Daten",
  ],
} as const;

export type Site = typeof site;
