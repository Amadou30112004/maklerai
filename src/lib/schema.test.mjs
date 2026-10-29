// Ausführen mit: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { pruefeSchritt } from "./schema.ts";

const schritt2 = { buero: "Becker Versicherungen", email: "julia@becker.de", telefon: "", einwilligung: true };

test("Schritt 1 ohne Nachname ist ungültig", () => {
  const r = pruefeSchritt(1, { vorname: "Julia", nachname: "" });
  assert.equal(r.ok, false);
  assert.ok(r.fehler.nachname);
});

test("Schritt 2 mit falscher E-Mail ist ungültig", () => {
  const r = pruefeSchritt(2, { ...schritt2, email: "julia@" });
  assert.equal(r.ok, false);
  assert.ok(r.fehler.email);
});

test("Schritt 2 ohne Einwilligung ist ungültig", () => {
  const r = pruefeSchritt(2, { ...schritt2, einwilligung: false });
  assert.equal(r.ok, false);
  assert.ok(r.fehler.einwilligung);
});

test("Schritt 2 ohne Telefon ist gültig", () => {
  const r = pruefeSchritt(2, schritt2);
  assert.equal(r.ok, true);
});
