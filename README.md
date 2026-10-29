# MaklerAI Landingpage

Landingpage für MaklerAI: Digitalisierung des Innendienstes für kleine Versicherungsmaklerbüros.
Next.js (App Router), TypeScript, Tailwind CSS, Zod. Bewegungen laufen über CSS und einen kleinen
IntersectionObserver (`src/components/ScrollEffekte.tsx`), ohne zusätzliche Bibliothek.

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
- `npm test`: prüft die Ersparnisrechnung (`src/lib/ersparnis.ts`, derzeit nicht auf der Seite eingebunden), die Schrittprüfung des Terminformulars (`pruefeSchritt`) und die Demo

## Platzhalter ausfüllen

Alle offenen Angaben stehen zentral in `src/config/site.ts` unter `platzhalter`
(USt-IdNr., Hosting-Anbieter, Stand der Datenschutzerklärung).
Dort werden auch Markenname (`name`), Anschrift, E-Mail und der Kalenderlink (`person.terminLink`) gepflegt, sie stehen nirgends fest im Text.
Als Kontaktweg steht auf der Seite bewusst nur die E-Mail, keine Telefonnummer und kein WhatsApp.

Weitere Platzhalter in eckigen Klammern stehen direkt in `src/app/datenschutz/page.tsx`
(Speicherdauer, Auftragsverarbeitung mit Google, Aufsichtsbehörde, Drittlandhinweis).
Impressum und Datenschutz vor dem Livegang rechtlich prüfen lassen.

**Personenzeile:** Statt Foto zeigt die Seite einen Kreis mit den Initialen aus `site.person.initialen`. Das alte Foto `public/amadou-jalloh.jpg` ist noch im Ordner, wird aber nicht mehr verwendet.

## E-Mail-Adresse maklerai@jalloh.net

Auf der Seite steht als Kontakt nur `maklerai@jalloh.net` (`site.person.email`). Die Adresse ist ein Alias im
Google-Workspace-Konto von jalloh.net, Mails landen also im selben Postfach. Damit Sie auch von dieser Adresse
antworten können, fügen Sie sie in Gmail unter Einstellungen, Konten, „Senden als“ hinzu.

## Anfragen in Google Sheets

Das Terminformular hat zwei kurze Schritte (Name, dann Erreichbarkeit mit Einwilligung) und danach
den Button zum Kalender. Bürogröße, Interessen und Zeitfresser fragt es nicht mehr ab, diese Spalten im Sheet bleiben leer. Ohne JavaScript erscheinen alle Felder untereinander, das Formular wird normal abgeschickt
und leitet danach direkt in den Kalender weiter.

Das Formular schickt an `POST /api/pilot`. Die Route prüft die Angaben und den Spam-Schutz
(verstecktes Feld, Mindestzeit 4 Sekunden) und gibt die Anfrage an ein Google Sheet weiter.
Das Sheet schickt Ihnen zusätzlich eine Mail.

So richten Sie das ein:

1. **Sheet anlegen:** In Google Drive eine neue Tabelle anlegen, zum Beispiel „MaklerAI Anfragen“.
2. **Script einfügen:** In der Tabelle Erweiterungen, Apps Script öffnen. Den Inhalt von
   `docs/google-apps-script.gs` hineinkopieren und speichern.
3. **Schlüssel setzen:** Einen langen, zufälligen Schlüssel ausdenken (mindestens 32 Zeichen) und
   im Script bei `SECRET` eintragen.
4. **Als Web-App bereitstellen:** Bereitstellen, Neue Bereitstellung, Typ Web-App.
   Ausführen als: Ich. Zugriff: Jeder. Beim ersten Mal die Berechtigungen bestätigen.
   Die angezeigte URL kopieren.
5. **Eintragen:** `.env.example` nach `.env.local` kopieren, dort `GOOGLE_SHEETS_WEBHOOK_URL` (die URL)
   und `GOOGLE_SHEETS_SECRET` (derselbe Schlüssel wie im Script) eintragen. Server neu starten.
6. **Einmal testen:** Das Formular auf der Seite absenden. In der Tabelle erscheint eine neue Zeile
   im Blatt „Anfragen“, und an maklerai@jalloh.net geht eine Mail.

Ohne URL wird in der Entwicklung (`npm run dev`) jede Anfrage in `data/pilot-anfragen.json` gespeichert
(Ordner ist in `.gitignore`). In der Produktion ohne URL oder bei einem Fehler sieht der Besucher eine
Meldung mit E-Mail-Adresse, der Kalender-Button erscheint trotzdem. Ins Log werden nur Büroname und Zeitpunkt geschrieben.

Ändern Sie später das Script, müssen Sie unter Bereitstellungen verwalten eine neue Version bereitstellen.

## Demo Schadenmeldung

Klickbarer Prototyp unter `/demo/schadenmeldung`, lokal http://localhost:3000/demo/schadenmeldung.
Es wird nichts gespeichert oder versendet, alles bleibt im Browser. Beim Neuladen beginnt die Demo von vorn.
Die Seite ist für Suchmaschinen gesperrt (`noindex`).

- **Farbe des Büros:** über die drei Farbtupfer oben oder per Adresse, zum Beispiel
  `/demo/schadenmeldung?farbe=gruen`. Möglich sind `blau` (Standard), `gruen` und `rot`.
  Der Wechsel behält alle Eingaben.
- **Für Gespräche:** Auf jedem Schritt füllt „Beispieldaten einfügen“ die gewählte Sparte (ohne Auswahl: Kfz)
  mit erfundenen, vollständigen Angaben und drei erzeugten Beispielfotos. Danach nur noch „Weiter“ klicken,
  so ist die Demo in unter einer Minute gezeigt.
- **Ergebnis:** Nach dem Absenden zeigt die Demo die PDF-Vorschau (über „Als PDF speichern“ als A4 drucken)
  und den E-Mail-Entwurf an den Versicherer.

Technik: Felder je Sparte stehen als Daten in `src/lib/demo/sparten.ts`, neue Sparten kommen dort dazu.
Prüfung in `src/lib/demo/schema.ts` und `vollstaendigkeit.ts`, Mailtext in `email.ts`, Tests in `demo.test.mjs`.

**Offen:** Auf der Startseite ist neben dem Demo-Button ein Platzhalter `[QR-CODE ZUR DEMO, nach Livegang erzeugen]`.
Nach dem Livegang einen QR-Code zur echten Demo-Adresse erzeugen und dort als Bild einsetzen
(`src/components/Ablauf.tsx`).

## Später auf Vercel

1. Repo bei https://vercel.com importieren, Framework wird erkannt.
2. Unter Settings, Environment Variables `GOOGLE_SHEETS_WEBHOOK_URL` und `GOOGLE_SHEETS_SECRET` setzen.
3. Region auf Frankfurt (`fra1`) stellen, passend zum Versprechen „Hosting in der EU“.
4. Domain verbinden und `url` in `src/config/site.ts` prüfen.
