import type { ComponentType, SVGProps } from "react";
import type { LoesungId } from "@/lib/schema";
import {
  IconDokumentBlitz,
  IconKlammerUhr,
  IconOrdnerPfeil,
  IconPersonStift,
  IconSprechblaseFunken,
} from "./ui/Icons";

export type Loesung = {
  id: LoesungId;
  kurz: string;
  titel: string;
  text: string;
  punkte: [string, string, string];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const loesungen: Loesung[] = [
  {
    id: "schadenmeldung",
    kurz: "Schadenmeldung",
    titel: "Schadenmeldung per Link",
    text: "Ihr Kunde meldet seinen Schaden über einen Link in Ihrem Design, Schritt für Schritt und mit Fotos. Sie erhalten eine vollständige Meldung als PDF und einen fertigen E-Mail-Entwurf an den Versicherer.",
    punkte: ["Pflichtangaben je Sparte", "Fotos direkt vom Handy", "Freigabe mit einem Klick"],
    icon: IconDokumentBlitz,
  },
  {
    id: "whatsapp",
    kurz: "WhatsApp-Kanal",
    titel: "WhatsApp-Kanal für Ihr Büro",
    text: "Ein offizieller WhatsApp-Kanal für Ihr Büro statt Kundenchats auf privaten Handys. Eingehende Nachrichten werden sortiert, die KI schlägt Antworten vor, Ihr Team prüft und sendet.",
    punkte: ["Ein Kanal für das ganze Team", "Antwortentwürfe per KI", "Entwürfe speichern und freigeben"],
    icon: IconSprechblaseFunken,
  },
  {
    id: "ablage",
    kurz: "Dokumentenablage",
    titel: "Automatische Dokumentenablage",
    text: "Policen, Nachträge und Schreiben vom Versicherer werden erkannt: Kunde, Vertragsnummer, Sparte. Danach landen sie automatisch im richtigen Kundenordner, in OneDrive oder Google Drive.",
    punkte: ["Erkennt Vertragsnummer und Kunde", "Legt im richtigen Ordner ab", "Sie behalten den Überblick"],
    icon: IconOrdnerPfeil,
  },
  {
    id: "aenderungen",
    kurz: "Kundenänderungen",
    titel: "Kundenänderungen per Link",
    text: "Umzug, neue Bankverbindung, neues Fahrzeug: Ihre Kunden melden Änderungen selbst. Sie bekommen alles strukturiert und können es direkt an die Versicherer weitergeben.",
    punkte: ["Kein Abtippen am Telefon", "Strukturiert für alle Verträge", "Weiterleitung vorbereitet"],
    icon: IconPersonStift,
  },
  {
    id: "dokumente",
    kurz: "Dokumente anfordern",
    titel: "Dokumente anfordern",
    text: "Fehlende Unterlagen per Link anfordern, mit automatischer Erinnerung. Was hochgeladen wird, landet sortiert bei Ihnen.",
    punkte: ["Ein Link pro Anfrage", "Erinnerung automatisch", "Eingang sortiert"],
    icon: IconKlammerUhr,
  },
];
