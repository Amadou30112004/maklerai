import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ComponentType, ReactNode, SVGProps } from "react";
import { site } from "@/config/site";
import { IconPfeilRechts } from "./Icons";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink shadow-[var(--shadow-soft)] ${className}`}
    >
      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
} & Omit<ComponentProps<"a">, "href">;

// Primärbutton: schwarz, weißer Text, rechts weiße Kachel mit Pfeil
export function PrimaryButton({ href, children, className = "", size = "md", ...rest }: ButtonProps) {
  const pad = size === "lg" ? "py-2 pl-5 pr-2 text-base min-h-[52px]" : "py-1.5 pl-4 pr-1.5 text-[15px] min-h-[44px]";
  const kachel = size === "lg" ? "size-9" : "size-8";
  const cls = `press group inline-flex items-center gap-3 rounded-[12px] bg-ink font-medium text-white ${pad} ${className}`;
  const inhalt = (
    <>
      <span>{children}</span>
      <span
        className={`grid ${kachel} place-items-center rounded-[9px] bg-white text-ink transition-transform duration-200 ease-out motion-safe:group-can-hover:translate-x-0.5`}
        aria-hidden="true"
      >
        <IconPfeilRechts className="size-4" />
      </span>
    </>
  );
  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls} {...rest}>
        {inhalt}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inhalt}
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  titel,
  text,
  center = false,
  id,
}: {
  eyebrow?: string;
  titel: ReactNode;
  text?: ReactNode;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`max-w-[720px] ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-4 text-[32px] leading-[1.08] sm:text-[44px]">
        {titel}
      </h2>
      {text && <p className="mt-4 text-[17px] leading-relaxed text-ink-2 sm:text-lg">{text}</p>}
    </div>
  );
}

export function IconKachel({
  icon: Icon,
  className = "",
  klein = false,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  klein?: boolean;
}) {
  return (
    <span
      className={`bg-grad grid shrink-0 place-items-center text-white shadow-[0_8px_20px_-8px_rgb(232_80_30/0.6)] ${
        klein ? "size-10 rounded-[12px]" : "size-14 rounded-[16px]"
      } ${className}`}
      aria-hidden="true"
    >
      <Icon className={klein ? "size-5" : "size-7"} />
    </span>
  );
}

// Foto von Amadou, nur klein und rund
export function Avatar({ groesse = 64, rand = false }: { groesse?: 56 | 64 | 72; rand?: boolean }) {
  return (
    <Image
      src={site.person.foto}
      alt={site.person.name}
      width={groesse}
      height={groesse}
      className={`shrink-0 rounded-full object-cover object-top ${rand ? "ring-[3px] ring-white" : ""}`}
      style={{ width: groesse, height: groesse }}
    />
  );
}
