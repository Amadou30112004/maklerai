import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "./Nav";
import { Container } from "./ui/Basis";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-12">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto]">
        <div className="max-w-[360px]">
          <Logo />
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            Wir automatisieren den Innendienst von Versicherungsmaklern, ohne Umstellung. Die KI bereitet vor, Ihr Team
            prüft und gibt frei.
          </p>
        </div>
        <div className="text-[15px] leading-relaxed">
          <p className="font-medium">Kontakt</p>
          <p className="mt-2 text-ink-2">{site.person.name}</p>
          <a href={`mailto:${site.person.email}`} className="text-ink-2 underline decoration-line underline-offset-4 can-hover:text-ink">
            {site.person.email}
          </a>
          <p className="text-ink-2">
            {site.person.strasse}
            <br />
            {site.person.ort}
          </p>
        </div>
        <nav aria-label="Rechtliches" className="text-[15px]">
          <p className="font-medium">Rechtliches</p>
          <ul className="mt-1">
            <li>
              <Link href="/impressum" className="inline-flex min-h-[40px] items-center text-ink-2 can-hover:text-ink">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="inline-flex min-h-[40px] items-center text-ink-2 can-hover:text-ink">
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
      <Container className="mt-10 text-[13px] text-ink-2">
        © {site.name}
      </Container>
    </footer>
  );
}
