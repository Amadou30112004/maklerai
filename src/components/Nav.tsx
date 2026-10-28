import Link from "next/link";
import { site } from "@/config/site";
import { Container, PrimaryButton } from "./ui/Basis";

const links = [
  { href: "/#loesungen", label: "Lösungen" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#rechner", label: "Rechner" },
  { href: "/#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <Link href="/" className="inline-flex min-h-[44px] items-center gap-2.5 font-medium tracking-[-0.02em]">
      <span className="bg-grad grid size-8 place-items-center rounded-[10px] text-white" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 18V7l7 6 7-6v11" />
        </svg>
      </span>
      <span className="text-[17px]">{site.name}</span>
    </Link>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-bg/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full bg-surface-2 p-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-[36px] items-center rounded-full px-4 text-[14px] text-ink-2 transition-colors can-hover:bg-surface can-hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <PrimaryButton href="/#pilot">Erstgespräch</PrimaryButton>
      </Container>
    </header>
  );
}
