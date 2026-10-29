import Link from "next/link";
import { site } from "@/config/site";
import { MobilMenue } from "./MobilMenue";
import { Container } from "./ui/Basis";
import { TerminButton } from "./ui/TerminButton";

const links = [
  { href: "/#projekte", label: "Projekte" },
  { href: "/#ohne-umstellung", label: "Ohne Umstellung" },
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
      <Container className="relative flex h-[68px] items-center justify-between gap-2 sm:gap-4">
        <Logo />
        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-full bg-surface-2 p-1 lg:gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-[36px] items-center rounded-full px-3 text-[14px] text-ink-2 transition-colors can-hover:bg-surface can-hover:text-ink lg:px-4"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden min-[400px]:block">
            <TerminButton />
          </div>
          <MobilMenue links={links} />
        </div>
      </Container>
    </header>
  );
}
