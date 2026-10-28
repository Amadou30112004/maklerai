import { fehlerSchritt } from "./schema.ts";
import type { Fehler, Meldung, Schritt } from "./typen.ts";

export type Vollstaendigkeit = { vollstaendig: boolean; fehlend: Fehler[] };

// Prüft alle Pflichtangaben über alle Schritte. Reine Funktion, ohne Zugriff auf die Oberfläche.
export function pruefeVollstaendigkeit(meldung: Meldung, heute: Date = new Date()): Vollstaendigkeit {
  const schritte: Schritt[] = meldung.sparte ? [1, 2, 3, 4] : [1];
  const fehlend = schritte.flatMap((s) => fehlerSchritt(s, meldung, heute));
  return { vollstaendig: fehlend.length === 0, fehlend };
}
