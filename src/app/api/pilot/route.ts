import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/config/site";
import { anfrageSchema, loesungNamen, MINDESTZEIT_MS, spamSchema } from "@/lib/schema";

const DATEI = path.join(process.cwd(), "data", "pilot-anfragen.json");
const TIMEOUT_MS = 10_000;

const FEHLER_MELDUNG = `Das hat leider nicht geklappt. Schreiben Sie mir gern direkt an ${site.person.email}.`;

// Spalten des Google Sheets bleiben unverändert (siehe docs/google-apps-script.gs)
type Eintrag = {
  eingegangen: string;
  name: string;
  buero: string;
  email: string;
  telefon: string;
  groesse: string;
  schwerpunkt: string;
  interessen: string[];
  zeitfresser: string;
};

// Ohne JavaScript schickt der Browser ein normales Formular. Daraus dasselbe Objekt bauen wie per fetch.
async function lesen(request: Request): Promise<{ body: unknown; formular: boolean }> {
  const typ = request.headers.get("content-type") ?? "";
  if (typ.includes("application/x-www-form-urlencoded") || typ.includes("multipart/form-data")) {
    const f = await request.formData();
    const text = (k: string) => String(f.get(k) ?? "");
    const startedAt = Number(text("startedAt"));
    return {
      formular: true,
      body: {
        vorname: text("vorname"),
        nachname: text("nachname"),
        buero: text("buero"),
        email: text("email"),
        telefon: text("telefon"),
        zeitfresser: text("zeitfresser"),
        interessen: f.getAll("interessen").map(String),
        groesse: text("groesse"),
        einwilligung: f.get("einwilligung") === "on",
        website: text("website"),
        startedAt: Number.isFinite(startedAt) && startedAt > 0 ? startedAt : undefined,
      },
    };
  }
  return { formular: false, body: await request.json() };
}

export async function POST(request: Request) {
  let body: unknown;
  let formular = false;
  try {
    ({ body, formular } = await lesen(request));
  } catch {
    return Response.json({ meldung: "Ungültige Anfrage." }, { status: 400 });
  }

  // Ohne JavaScript geht es nach dem Absenden direkt in den Kalender bzw. zurück zum Formular
  const weiter = (ok: boolean) =>
    formular
      ? Response.redirect(ok ? site.person.terminLink : new URL("/?anfrage=fehler#pilot", request.url), 303)
      : ok
        ? Response.json({ ok: true })
        : null;

  // Spam-Schutz: Honeypot gefüllt oder zu schnell abgeschickt. Still „erfolgreich“ antworten.
  const spam = spamSchema.safeParse(body);
  if (spam.success) {
    const { website, startedAt } = spam.data;
    const zuSchnell = !startedAt || Date.now() - startedAt < MINDESTZEIT_MS;
    if (website || zuSchnell) {
      console.warn("[pilot] Anfrage als Spam verworfen", { honeypot: !!website, zuSchnell });
      return weiter(true)!;
    }
  }

  const r = anfrageSchema.safeParse(body);
  if (!r.success) {
    if (formular) return weiter(false)!;
    const fehler: Record<string, string> = {};
    for (const i of r.error.issues) {
      const key = String(i.path[0]);
      fehler[key] ??= i.message;
    }
    return Response.json({ fehler }, { status: 422 });
  }

  const d = r.data;
  const eintrag: Eintrag = {
    eingegangen: new Date().toISOString(),
    name: `${d.vorname} ${d.nachname}`,
    buero: d.buero,
    email: d.email,
    telefon: d.telefon,
    groesse: d.groesse || "nicht angegeben",
    schwerpunkt: "",
    interessen: d.interessen.map((id) => loesungNamen[id]),
    zeitfresser: d.zeitfresser,
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
    if (formular) return weiter(false)!;
    return Response.json({ meldung: FEHLER_MELDUNG }, { status: 500 });
  }

  console.log("[pilot] Neue Anfrage gespeichert", { buero: eintrag.buero, eingegangen: eintrag.eingegangen });
  return weiter(true)!;
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
