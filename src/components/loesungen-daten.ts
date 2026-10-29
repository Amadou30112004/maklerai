import type { ComponentType, SVGProps } from "react";
import type { LoesungId } from "@/lib/schema";
import { IconChatbot, IconDokumentBlitz, IconPersonStift, IconPuzzle, IconSprechblaseFunken } from "./ui/Icons";

export type Loesung = {
  id: LoesungId;
  kurz: string;
  titel: string;
  // Zwei Sätze, höchstens zwei Stichpunkte
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
    punkte: ["Fotos direkt vom Handy", "Freigabe mit einem Klick"],
    icon: IconDokumentBlitz,
  },
  {
    id: "aenderungen",
    kurz: "Kundenänderungen",
    titel: "Kundenänderungen per Link",
    text: "Umzug, neue Bankverbindung, neues Fahrzeug: Ihre Kunden melden Änderungen selbst per Link. Sie bekommen alles strukturiert und geben es direkt an die Versicherer weiter.",
    punkte: ["Kein Abtippen am Telefon", "Weiterleitung vorbereitet"],
    icon: IconPersonStift,
  },
  {
    id: "whatsapp",
    kurz: "WhatsApp für Ihr Büro",
    titel: "WhatsApp für Ihr Büro",
    text: "Ihre Kunden schreiben sowieso per WhatsApp, wir richten Ihrem Büro einen offiziellen Kanal ein. Die KI bereitet Antworten und Newsletter vor, Ihr Team prüft und sendet.",
    punkte: ["Ein Kanal fürs ganze Team statt privater Handys", "Newsletter nur an Kunden mit Einwilligung"],
    icon: IconSprechblaseFunken,
  },
  {
    id: "chatbot",
    kurz: "KI-Assistent für Ihre Website",
    titel: "KI-Assistent für Ihre Website",
    text: "Beantwortet einfache Fragen Ihrer Kunden auch abends und am Wochenende, zum Beispiel welche Unterlagen nötig sind oder wie man einen Schaden meldet. Alles, was Beratung braucht, gibt er an Ihr Büro weiter.",
    punkte: ["Sie legen fest, worauf er antworten darf", "Bei Vertragsfragen Rückruf durch Ihr Büro"],
    icon: IconChatbot,
  },
];

// Schmale Leiste unter dem Raster
export const eigenesProjekt: Loesung = {
  id: "eigenes",
  kurz: "Etwas anderes",
  titel: "Ihr eigenes Projekt",
  text: "Sie haben eine Aufgabe im Innendienst, die immer wieder Zeit kostet? Wir prüfen gemeinsam, ob sie sich automatisieren lässt.",
  punkte: [],
  icon: IconPuzzle,
};
