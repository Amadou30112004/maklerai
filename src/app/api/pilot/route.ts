import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/config/site";
import { anfrageSchema, loesungNamen, MINDESTZEIT_MS, spamSchema, type Anfrage } from "@/lib/schema";

const DATEI = path.join(process.cwd(), "data", "pilot-anfragen.json");
const TIMEOUT_MS = 10_000;

const FEHLER_MELDUNG = `Das hat leider nicht geklappt. Schreiben Sie uns gern direkt an ${site.person.email} oder rufen Sie an: ${site.person.telefonAnzeige}.`;

type Eintrag = Omit<Anfrage, "interessen"> & { interessen: string[]; eingegangen: string };

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ meldung: "Ungültige Anfrage." }, { status: 400 });
  }

  // Spam-Schutz: Honeypot gefüllt oder zu schnell abgeschickt. Still „erfolgreich“ antworten.
  const spam = spamSchema.safeParse(body);
  if (spam.success) {
    const { website, startedAt } = spam.data;
    const zuSchnell = !startedAt || Date.now() - startedAt < MINDESTZEIT_MS;
    if (website || zuSchnell) {
      console.warn("[pilot] Anfrage als Spam verworfen", { honeypot: !!website, zuSchnell });
      return Response.json({ ok: true });
    }
  }

  const r = anfrageSchema.safeParse(body);
  if (!r.success) {
    const fehler: Record<string, string> = {};
    for (const i of r.error.issues) {
      const key = String(i.path[0]);
      fehler[key] ??= i.message;
    }
    return Response.json({ fehler }, { status: 422 });
  }

  const eintrag: Eintrag = {
    ...r.data,
    interessen: r.data.interessen.map((id) => loesungNamen[id]),
    eingegangen: new Date().toISOString(),
  };

  try {
    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (url) {
      await anSheetsSenden(url, eintrag);
    } else if (process.env.NODE_ENV === "development") {
      await lokalSpeichern(eintrag);
    } else {
      throw new Error("GOOGLE_SHEETS_WEBHOOK_URL ist nicht gesetzt");
    }
  } catch (err) {
    // Keine Kundendaten ins Log, nur Büro und Zeitpunkt
    console.error("[pilot] Anfrage konnte nicht gespeichert werden", {
      buero: eintrag.buero,
      eingegangen: eintrag.eingegangen,
      grund: err instanceof Error ? err.message : "unbekannt",
    });
    return Response.json({ meldung: FEHLER_MELDUNG }, { status: 500 });
  }

  console.log("[pilot] Neue Anfrage gespeichert", { buero: eintrag.buero, eingegangen: eintrag.eingegangen });
  return Response.json({ ok: true });
}

async function anSheetsSenden(url: string, eintrag: Eintrag) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.GOOGLE_SHEETS_SECRET ?? "", ...eintrag }),
      redirect: "follow",
      signal: controller.signal,
    });
    const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || json?.ok !== true) {
      throw new Error(`Google Sheets hat nicht bestätigt (Status ${res.status})`);
    }
  } finally {
    clearTimeout(timer);
  }
}

// Nur in der Entwicklung ohne Sheets-URL
async function lokalSpeichern(eintrag: Eintrag) {
  await mkdir(path.dirname(DATEI), { recursive: true });
  let liste: unknown[] = [];
  try {
    liste = JSON.parse(await readFile(DATEI, "utf8"));
    if (!Array.isArray(liste)) liste = [];
  } catch {
    liste = [];
  }
  liste.push(eintrag);
  await writeFile(DATEI, JSON.stringify(liste, null, 2), "utf8");
}
