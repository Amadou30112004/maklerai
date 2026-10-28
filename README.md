# MaklerAI Landingpage

Landingpage für MaklerAI: Digitalisierung des Innendienstes für kleine Versicherungsmaklerbüros.
Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Zod.

## Starten

Voraussetzung: Node.js 22.18 oder neuer.

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen.

Weitere Befehle:

- `npm run lint`: Code prüfen
- `npm run build`: Produktions-Build
- `npm test`: prüft die Ersparnisrechnung (Startwerte 3,0 Std., 105 €, 1.260 €)

## Platzhalter ausfüllen

Alle offenen Angaben stehen zentral in `src/config/site.ts` unter `platzhalter`
(Anschrift, USt-IdNr., Telefon, Hosting-Anbieter, Stand der Datenschutzerklärung).
Dort wird auch der Markenname gepflegt (`name`), er steht nirgends fest im Text.

Weitere Platzhalter in eckigen Klammern stehen direkt in `src/app/datenschutz/page.tsx`
(Speicherdauer, Aufsichtsbehörde, Drittlandhinweis). Impressum und Datenschutz vor dem Livegang rechtlich prüfen lassen.

**Foto:** `public/amadou-jalloh.jpg` ist aktuell ein Platzhalterbild mit Initialen.
Echtes Foto (quadratisch, mindestens 200 × 200 px) unter genau diesem Namen ablegen.

## Anfragen

Das Formular schickt an `POST /api/pilot`. Lokal wird jede Anfrage an `data/pilot-anfragen.json`
angehängt (Ordner ist in `.gitignore`) und in der Konsole ausgegeben.
Spam-Schutz: verstecktes Honeypot-Feld und Mindestzeit von 4 Sekunden zwischen Laden und Absenden.

## Mailversand über Resend aktivieren

1. Konto bei https://resend.com anlegen und Domain verifizieren.
2. `.env.example` nach `.env.local` kopieren.
3. `RESEND_API_KEY` eintragen, optional `RESEND_FROM` mit verifizierter Absenderadresse.
4. Server neu starten. Jede Anfrage geht dann zusätzlich an amadou@jalloh.net.

## Später auf Vercel

1. Repo bei https://vercel.com importieren, Framework wird erkannt.
2. Unter Settings, Environment Variables `RESEND_API_KEY` (und `RESEND_FROM`) setzen.
3. Region auf Frankfurt (`fra1`) stellen, passend zum Versprechen „Hosting in der EU“.
4. Wichtig: Auf Vercel ist das Dateisystem nicht dauerhaft. Die lokale JSON-Speicherung funktioniert dort nicht,
   dann über Resend versenden oder eine Datenbank anbinden.
5. Domain verbinden und `url` in `src/config/site.ts` prüfen.
