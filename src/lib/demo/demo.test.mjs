// Ausführen mit: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { beispielMeldung } from "./beispieldaten.ts";
import { erzeugeBetreff } from "./email.ts";
import { pruefeDatum } from "./schema.ts";
import { sparten } from "./sparten.ts";
import { pruefeVollstaendigkeit } from "./vollstaendigkeit.ts";

const HEUTE = new Date(2026, 9, 28);
const FOTO = [{ id: "1", url: "blob:test", name: "Beispielfoto 1" }];

test("vollständige Kfz-Meldung ist vollständig", () => {
  const m = beispielMeldung("kfz", HEUTE, FOTO);
  const r = pruefeVollstaendigkeit(m, HEUTE);
  assert.equal(r.vollstaendig, true, JSON.stringify(r.fehlend));
});

test("Hausrat Leitungswasser ohne Foto ist unvollständig", () => {
  const m = beispielMeldung("hausrat", HEUTE);
  assert.equal(m.felder.ursache, "Leitungswasser");
  const r = pruefeVollstaendigkeit(m, HEUTE);
  assert.equal(r.vollstaendig, false);
  assert.ok(r.fehlend.some((f) => f.key === "fotos"));
});

test("Diebstahl ohne Foto ist vollständig", () => {
  const m = beispielMeldung("hausrat", HEUTE);
  m.felder = { ursache: "Einbruch oder Diebstahl", anzeige: "Ja" };
  const r = pruefeVollstaendigkeit(m, HEUTE);
  assert.equal(r.vollstaendig, true, JSON.stringify(r.fehlend));
});

test("Datum in der Zukunft wird abgelehnt", () => {
  assert.equal(pruefeDatum("2026-10-29", HEUTE), "Bitte prüfen Sie das Datum.");
  assert.equal(pruefeDatum("2022-01-01", HEUTE), "Bitte prüfen Sie das Datum.");
  assert.equal(pruefeDatum("2026-10-28", HEUTE), null);
});

test("E-Mail-Betreff ohne Vertragsnummer enthält „wird nachgereicht“", () => {
  const m = beispielMeldung("glas", HEUTE, FOTO);
  assert.equal(m.vertragsnummer, "");
  assert.match(erzeugeBetreff(m), /wird nachgereicht/);
  assert.match(erzeugeBetreff(m), /Schadentag 26\.10\.2026/);
});

test("Beispieldaten jeder Sparte bestehen die Vollständigkeitsprüfung", () => {
  for (const s of sparten) {
    const r = pruefeVollstaendigkeit(beispielMeldung(s.id, HEUTE, FOTO), HEUTE);
    assert.equal(r.vollstaendig, true, `${s.name}: ${JSON.stringify(r.fehlend)}`);
  }
});

test("abhängige Pflichtfelder greifen erst nach der Antwort", () => {
  const m = beispielMeldung("kfz", HEUTE, FOTO);
  m.felder.fahrer = "eine andere Person";
  const r = pruefeVollstaendigkeit(m, HEUTE);
  assert.ok(r.fehlend.some((f) => f.key === "f.fahrerName"));
});
