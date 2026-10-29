// Zentrale Angaben der Seite. Markenname und Kontakt nur hier pflegen.
// Platzhalter in eckigen Klammern sind noch offen und vor dem Livegang zu ersetzen.

// Markenname ist noch nicht final. Nie hart im Text verwenden, immer site.name.
const name = "MaklerAI";

export const site = {
  name,
  domain: "maklerai.de",
  url: "https://maklerai.de",
  claim: "Weniger Backoffice, mehr Zeit bei Ihren Kunden",
  beschreibung:
    "Wir automatisieren den Innendienst von Versicherungsmaklern, ohne Umstellung. Weniger Backoffice, mehr Zeit bei Ihren Kunden.",

  person: {
    name: "Amadou Jalloh",
    vorname: "Amadou",
    // Statt Foto ein Kreis mit Initialen
    initialen: "AJ",
    // Einziger Kontaktweg auf der Seite, bewusst ohne Telefon und WhatsApp
    email: "maklerai@jalloh.net",
    strasse: "Beethovenstr. 21",
    ort: "78054 Villingen-Schwenningen",
    // Google-Kalender-Buchungsseite (Konto jalloh.net)
    terminLink: "https://calendar.app.google/XUHXmk3cfW9BoVHn6",
  },

  platzhalter: {
    ustId: "[USt-IdNr. falls vorhanden]",
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
