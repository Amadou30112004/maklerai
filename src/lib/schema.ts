import { z } from "zod";

export const loesungIds = ["schadenmeldung", "aenderungen", "whatsapp", "chatbot", "eigenes"] as const;

export type LoesungId = (typeof loesungIds)[number];

// Schritt 1: Name
export const schritt1Schema = z.object({
  vorname: z.string().trim().min(1, { error: "Bitte geben Sie Ihren Vornamen an." }).max(60),
  nachname: z.string().trim().min(1, { error: "Bitte geben Sie Ihren Nachnamen an." }).max(60),
});

// Schritt 2: Erreichbarkeit und Einwilligung
export const schritt2Schema = z.object({
  buero: z
    .string()
    .trim()
    .min(2, { error: "Bitte geben Sie den Namen Ihres Maklerbüros an." })
    .max(160),
  email: z.email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." }),
  telefon: z
    .string()
    .trim()
    .max(40)
    .refine((v) => v === "" || /^[+\d][\d\s/()-]{5,}$/.test(v), {
      error: "Bitte prüfen Sie die Telefonnummer.",
    }),
  einwilligung: z.literal(true, {
    error: "Bitte bestätigen Sie die Einwilligung.",
  }),
});

export const anfrageSchema = schritt1Schema.extend(schritt2Schema.shape);

export type Anfrage = z.infer<typeof anfrageSchema>;

export type Schritt = 1 | 2;

const schrittSchemas = { 1: schritt1Schema, 2: schritt2Schema } as const;

export type Pruefung = { ok: true } | { ok: false; fehler: Record<string, string> };

// Prüft nur die Felder eines Schritts. Erster Fehler je Feld gewinnt.
export function pruefeSchritt(schritt: Schritt, daten: unknown): Pruefung {
  const r = schrittSchemas[schritt].safeParse(daten);
  if (r.success) return { ok: true };
  const fehler: Record<string, string> = {};
  for (const i of r.error.issues) {
    const key = String(i.path[0]);
    fehler[key] ??= i.message;
  }
  return { ok: false, fehler };
}

// Zusatzfelder nur für den Spam-Schutz, werden nicht gespeichert.
export const spamSchema = z.object({
  website: z.string().optional(),
  startedAt: z.number().optional(),
});

export const MINDESTZEIT_MS = 4000;
