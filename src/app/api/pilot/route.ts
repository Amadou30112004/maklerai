import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/config/site";
import { anfrageSchema, MINDESTZEIT_MS, spamSchema, type Anfrage } from "@/lib/schema";

const DATEI = path.join(process.cwd(), "data", "pilot-anfragen.json");

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

  const eintrag = { ...r.data, eingegangen: new Date().toISOString() };

  try {
    await speichern(eintrag);
  } catch (err) {
    console.error("[pilot] Speichern fehlgeschlagen", err);
    return Response.json(
      { meldung: `Das hat leider nicht geklappt. Schreiben Sie uns gern direkt an ${site.person.email}.` },
      { status: 500 },
    );
  }

  console.log("[pilot] Neue Anfrage", eintrag);
  await mailSenden(eintrag);

  return Response.json({ ok: true });
}

async function speichern(eintrag: Anfrage & { eingegangen: string }) {
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

// Vorbereitet, aber nur aktiv, wenn RESEND_API_KEY gesetzt ist.
async function mailSenden(eintrag: Anfrage & { eingegangen: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const from = process.env.RESEND_FROM ?? `${site.name} <onboarding@resend.dev>`;
  const zeilen = [
    `Name: ${eintrag.name}`,
    `Maklerbüro: ${eintrag.buero}`,
    `E-Mail: ${eintrag.email}`,
    `Telefon: ${eintrag.telefon || "nicht angegeben"}`,
    `Bürogröße: ${eintrag.groesse}`,
    `Schwerpunkt: ${eintrag.schwerpunkt}`,
    `Interessen: ${eintrag.interessen.join(", ")}`,
    `Zeitfresser: ${eintrag.zeitfresser || "nicht angegeben"}`,
    `Eingegangen: ${eintrag.eingegangen}`,
  ];
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [site.person.email],
        reply_to: eintrag.email,
        subject: `Neue Anfrage Erstgespräch: ${eintrag.buero}`,
        text: zeilen.join("\n"),
      }),
    });
    if (!res.ok) console.error("[pilot] Resend Fehler", res.status, await res.text());
  } catch (err) {
    console.error("[pilot] Resend nicht erreichbar", err);
  }
}
