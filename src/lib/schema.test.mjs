// Ausführen mit: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { pruefeSchritt } from "./schema.ts";

test("Schritt 1 ohne Nachname ist ungültig", () => {
  const r = pruefeSchritt(1, { vorname: "Julia", nachname: "" });
  assert.equal(r.ok, false);
  assert.ok(r.fehler.nachname);
});

test("Schritt 2 mit falscher E-Mail ist ungültig", () => {
  const r = pruefeSchritt(2, { buero: "Becker Versicherungen", email: "julia@", telefon: "" });
  assert.equal(r.ok, false);
  assert.ok(r.fehler.email);
});

test("Schritt 3 ohne Einwilligung ist ungültig", () => {
  const r = pruefeSchritt(3, { zeitfresser: "", interessen: [], groesse: "", einwilligung: false });
  assert.equal(r.ok, false);
  assert.ok(r.fehler.einwilligung);
});

test("Schritt 3 nur mit Einwilligung ist gültig", () => {
  const r = pruefeSchritt(3, { zeitfresser: "", interessen: [], groesse: "", einwilligung: true });
  assert.equal(r.ok, true);
});
