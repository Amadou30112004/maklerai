import { BUERO, spartenNach } from "./sparten.ts";
import type { Meldung } from "./typen.ts";

// JJJJ-MM-TT -> TT.MM.JJJJ
export function formatDatum(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
}

export const spartenName = (m: Meldung) => (m.sparte ? spartenNach[m.sparte].name : "");

const vertrag = (m: Meldung) => m.vertragsnummer.trim() || "wird nachgereicht";

export function erzeugeBetreff(m: Meldung) {
  return `Schadenmeldung ${spartenName(m)}, Vertrag ${vertrag(m)}, ${m.nachname.trim()}, Schadentag ${formatDatum(m.schadentag)}`;
}

export function erzeugeText(m: Meldung) {
  const beschreibung = m.beschreibung.trim().replace(/\s+/g, " ");
  const kurz = beschreibung.length > 200 ? `${beschreibung.slice(0, 200).trimEnd()} …` : beschreibung;
  const vertragText = m.vertragsnummer.trim() ? `zum Vertrag ${m.vertragsnummer.trim()}` : "(Vertragsnummer wird nachgereicht)";
  const fotos = m.fotos.length === 1 ? "1 Foto" : `${m.fotos.length} Fotos`;
  return [
    "Sehr geehrte Damen und Herren,",
    "",
    `anbei erhalten Sie die Schadenmeldung unseres Kunden ${m.vorname.trim()} ${m.nachname.trim()} ${vertragText}.`,
    "",
    `Schadentag: ${formatDatum(m.schadentag)}`,
    `Kurzbeschreibung: ${kurz}`,
    "",
    `Die vollständige Meldung mit ${fotos} finden Sie im Anhang.`,
    "Bitte teilen Sie uns die Schadennummer mit.",
    "",
    "Vielen Dank.",
    "",
    "Mit freundlichen Grüßen",
    BUERO.name,
  ].join("\n");
}

export function anhangName(m: Meldung) {
  const teil = (s: string) => s.trim().replace(/\s+/g, "_").replace(/[^\p{L}\p{N}_-]/gu, "");
  return `Schadenmeldung_${teil(spartenName(m))}_${teil(m.nachname) || "Kunde"}.pdf`;
}

// Meldungsnummer SM-JJJJMMTT-XXXX
export function meldungsnummer(datum: Date, zufall: () => number = Math.random) {
  const p = (n: number) => String(n).padStart(2, "0");
  const zeichen = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const x = Array.from({ length: 4 }, () => zeichen[Math.floor(zufall() * zeichen.length)]).join("");
  return `SM-${datum.getFullYear()}${p(datum.getMonth() + 1)}${p(datum.getDate())}-${x}`;
}
