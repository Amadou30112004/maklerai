import { z } from "zod";

export const bueroGroessen = [
  "Nur ich",
  "2 bis 3 Personen",
  "4 bis 5 Personen",
  "mehr als 5 Personen",
] as const;

export const schwerpunkte = ["Privatkunden", "Gewerbekunden", "beides"] as const;

export const loesungIds = [
  "schadenmeldung",
  "whatsapp",
  "ablage",
  "aenderungen",
  "dokumente",
] as const;

export type LoesungId = (typeof loesungIds)[number];

export const schritt1Schema = z.object({
  groesse: z.enum(bueroGroessen, { error: "Bitte wählen Sie die Größe Ihres Büros." }),
  schwerpunkt: z.enum(schwerpunkte, { error: "Bitte wählen Sie Ihren Schwerpunkt." }),
  interessen: z
    .array(z.enum(loesungIds))
    .min(1, { error: "Bitte wählen Sie mindestens eine Verbesserung." }),
  zeitfresser: z.string().trim().max(1000, { error: "Bitte fassen Sie sich etwas kürzer." }),
});

export const schritt2Schema = z.object({
  name: z.string().trim().min(2, { error: "Bitte geben Sie Ihren Namen an." }).max(120),
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

// Zusatzfelder nur für den Spam-Schutz, werden nicht gespeichert.
export const spamSchema = z.object({
  website: z.string().optional(),
  startedAt: z.number().optional(),
});

export const MINDESTZEIT_MS = 4000;
