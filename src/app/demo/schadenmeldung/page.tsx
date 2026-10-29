import type { Metadata } from "next";
import { DemoApp } from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: { absolute: "Demo Schadenmeldung" },
  description: "Klickbare Demo: So erleben Kunden die Schadenmeldung per Link. Es wird nichts gespeichert.",
  robots: { index: false, follow: false },
};

// Eigenes Layout ohne Navigation der Landingpage.
// Die Farbe kommt optional aus ?farbe=blau|gruen|rot und wird im Browser gelesen, die Seite bleibt statisch.
export default function DemoSeite() {
  return <DemoApp />;
}
