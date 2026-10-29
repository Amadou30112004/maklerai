// Gerüst. Vor dem Livegang rechtlich prüfen lassen.
import type { Metadata } from "next";
import Link from "next/link";
import { Rechtsseite } from "@/components/Rechtsseite";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Impressum" };

export default function Impressum() {
  const p = site.platzhalter;
  return (
    <Rechtsseite titel="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {site.person.name}
        <br />
        {site.person.strasse}
        <br />
        {site.person.ort}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${site.person.email}`} className="underline underline-offset-4">{site.person.email}</a>
        <br />
        Kontaktformular: <Link href="/#pilot" className="underline underline-offset-4">Termin vereinbaren</Link>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>Umsatzsteuer-Identifikationsnummer: {p.ustId}</p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        {site.person.name}, {site.person.strasse}, {site.person.ort}
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </Rechtsseite>
  );
}
