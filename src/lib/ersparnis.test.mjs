// Ausführen mit: npm test (Node 22.18+ führt TypeScript direkt aus)
import { test } from "node:test";
import assert from "node:assert/strict";
import { berechneErsparnis, formatEuro, formatStunden } from "./ersparnis.ts";

test("Startwerte ergeben 3,0 Stunden, 105 € und 1.260 €", () => {
  const e = berechneErsparnis({
    meldungenProMonat: 15,
    minutenHeute: 15,
    minutenMitTool: 3,
    stundensatz: 35,
  });
  assert.equal(e.minutenProMonat, 180);
  assert.equal(formatStunden(e.stundenProMonat), "3,0");
  assert.equal(formatEuro(e.euroProMonat), "105 €");
  assert.equal(formatEuro(e.euroProJahr), "1.260 €");
});

test("keine negative Ersparnis, wenn das Tool länger braucht", () => {
  const e = berechneErsparnis({
    meldungenProMonat: 10,
    minutenHeute: 5,
    minutenMitTool: 15,
    stundensatz: 50,
  });
  assert.equal(e.minutenProMonat, 0);
  assert.equal(e.euroProJahr, 0);
});
