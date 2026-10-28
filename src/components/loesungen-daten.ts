import type { ComponentType, SVGProps } from "react";
import type { LoesungId } from "@/lib/schema";
import { IconDokumentBlitz, IconPersonStift, IconSprechblaseFunken } from "./ui/Icons";

export type Loesung = {
  id: LoesungId;
  kurz: string;
  titel: string;
  text: string;
  punkte: string[];
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
    id: "aenderungen",
    kurz: "Kundenänderungen",
    titel: "Kundenänderungen per Link",
    text: "Umzug, neue Bankverbindung, neues Fahrzeug: Ihre Kunden melden Änderungen selbst. Sie bekommen alles strukturiert und können es direkt an die Versicherer weitergeben.",
    punkte: ["Kein Abtippen am Telefon", "Strukturiert für alle Verträge", "Weiterleitung vorbereitet"],
    icon: IconPersonStift,
  },
  {
    id: "whatsapp",
    kurz: "WhatsApp für Service und Vertrieb",
    titel: "WhatsApp für Ihr Büro: Service und Vertrieb",
    text: "Ihre Kunden lesen WhatsApp, nicht jede E-Mail. Wir richten Ihrem Büro einen offiziellen WhatsApp-Kanal ein, statt Kundenchats auf privaten Handys. Im Service sortiert die KI eingehende Nachrichten und schlägt Antworten vor. Im Vertrieb erreichen Sie Ihre Kunden mit automatisierten Newslettern und gezielten Aktionen, dort wo sie sowieso lesen.",
    punkte: [
      "Ein Kanal für das ganze Team",
      "Antwortentwürfe per KI, Ihr Team prüft und sendet",
      "Automatisierte Newsletter per WhatsApp",
      "Vertriebsaktionen an ausgewählte Kundengruppen",
      "Nur an Kunden, die zugestimmt haben",
    ],
    icon: IconSprechblaseFunken,
  },
];
