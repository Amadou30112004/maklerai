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
  // gross: 2 Spalten, klein: 1 Spalte, breit: ganze Zeile
  format: "gross" | "klein" | "breit";
};

export const loesungen: Loesung[] = [
  {
    id: "schadenmeldung",
    kurz: "Schadenmeldung",
    titel: "Schadenmeldung per Link",
    text: "Ihr Kunde meldet seinen Schaden über einen Link in Ihrem Design, Schritt für Schritt und mit Fotos. Sie erhalten eine vollständige Meldung als PDF und einen fertigen E-Mail-Entwurf an den Versicherer.",
    punkte: ["Pflichtangaben je Sparte", "Fotos direkt vom Handy", "Freigabe mit einem Klick"],
    icon: IconDokumentBlitz,
    format: "gross",
  },
  {
    id: "aenderungen",
    kurz: "Kundenänderungen",
    titel: "Kundenänderungen per Link",
    text: "Umzug, neue Bankverbindung, neues Fahrzeug: Ihre Kunden melden Änderungen selbst. Sie bekommen alles strukturiert und können es direkt an die Versicherer weitergeben.",
    punkte: ["Kein Abtippen am Telefon", "Strukturiert für alle Verträge", "Weiterleitung vorbereitet"],
    icon: IconPersonStift,
    format: "klein",
  },
  {
    id: "whatsapp",
    kurz: "WhatsApp für Service und Vertrieb",
    titel: "WhatsApp für Ihr Büro: Service und Vertrieb",
    text: "Ihre Kunden schreiben sowieso per WhatsApp. Wir richten Ihrem Büro einen offiziellen Kanal ein. Die KI bereitet Antworten und Newsletter vor, Ihr Team gibt frei.",
    punkte: [
      "Ein Kanal für das ganze Team, statt privater Handys",
      "Antwortentwürfe per KI, Ihr Team prüft und sendet",
      "Newsletter und Aktionen nur an Kunden mit Einwilligung",
    ],
    icon: IconSprechblaseFunken,
    format: "breit",
  },
];
