// Gerüst. Vor dem Livegang rechtlich prüfen lassen.
import type { Metadata } from "next";
import { Rechtsseite } from "@/components/Rechtsseite";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzSeite() {
  const p = site.platzhalter;
  return (
    <Rechtsseite titel="Datenschutzerklärung">
      <p>Stand: {p.datum}</p>

      <h2>1. Verantwortlicher</h2>
      <p>
        {site.person.name}
        <br />
        {site.person.anschrift}
        <br />
        E-Mail: {site.person.email}
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei {p.hoster} gehostet. Beim Aufruf werden technisch notwendige Daten wie IP-Adresse,
        Datum und Uhrzeit sowie die aufgerufene Seite verarbeitet (Art. 6 Abs. 1 lit. f DSGVO). [Speicherdauer der
        Server-Logs und Angaben zum Auftragsverarbeitungsvertrag ergänzen.]
      </p>

      <h2>3. Kontaktformular für das Erstgespräch</h2>
      <p>
        Wenn Sie das Formular nutzen, verarbeiten wir Ihre Angaben (Name, Maklerbüro, E-Mail, optional Telefon sowie
        Ihre Antworten zu Büro und Interessen), um das Erstgespräch vorzubereiten. Rechtsgrundlage ist Ihre Einwilligung
        (Art. 6 Abs. 1 lit. a DSGVO) sowie vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Sie können Ihre
        Einwilligung jederzeit per E-Mail widerrufen. [Speicherdauer und ggf. E-Mail-Versanddienst ergänzen.]
      </p>

      <h2>4. Terminbuchung über Google</h2>
      <p>
        Für die Terminwahl leiten wir Sie auf die Buchungsseite von Google Kalender weiter (Google Ireland Limited,
        Gordon House, Barrow Street, Dublin 4, Irland). Dort gelten die Datenschutzbestimmungen von Google. Die
        Weiterleitung erfolgt erst, wenn Sie auf „Termin auswählen“ klicken. [Hinweis zu Drittlandübermittlung prüfen.]
      </p>

      <h2>5. Schriftarten</h2>
      <p>
        Die Schriftart Geist wird lokal von unserem Server ausgeliefert. Es findet keine Verbindung zu externen
        Schriftarten-Diensten statt.
      </p>

      <h2>6. Cookies und Tracking</h2>
      <p>Diese Website setzt keine Cookies und verwendet keine Tracking- oder Analysedienste.</p>

      <h2>7. Ihre Rechte</h2>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
        <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO), z. B. [ZUSTÄNDIGE AUFSICHTSBEHÖRDE]</li>
      </ul>
    </Rechtsseite>
  );
}
