import type { SVGProps } from "react";

// Eigenes Linien-Icon-Set, 24er Raster, 1,8 px Strich, weiß auf Orange-Kachel.
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconDokumentBlitz(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="m12.5 10.5-2.5 4h4l-2.5 4" />
    </Base>
  );
}

export function IconSprechblaseFunken(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 12.5a7.5 7.5 0 0 1-11 6.6L4 20.5l1.4-4.6A7.5 7.5 0 1 1 20 12.5z" />
      <path d="M12.5 9v4M10.5 11h4" />
      <path d="M19.5 3v2M18.5 4h2" />
    </Base>
  );
}

export function IconPersonStift(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 9.5-4.9" />
      <path d="m18.5 12.5 2 2-5 5H13.5v-2z" />
    </Base>
  );
}

export function IconHaken(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Base>
  );
}

export function IconPfeilRechts(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function IconSchild(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5 6v5.5c0 4.3 3 7.7 7 9.5 4-1.8 7-5.2 7-9.5V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Base>
  );
}

export function IconEU(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.2 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.2-3.5-8.5S9.7 5.8 12 3.5z" />
    </Base>
  );
}

export function IconVertrag(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M9 12h6M9 16h3" />
      <path d="m14.5 16.5 1 1 2-2.2" />
    </Base>
  );
}

export function IconTrennung(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="4.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="4.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
    </Base>
  );
}

export function IconKeinTraining(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="5" width="14" height="14" rx="3" />
      <path d="M9 2.5v2.5M15 2.5v2.5M9 19v2.5M15 19v2.5M2.5 9h2.5M2.5 15h2.5M19 9h2.5M19 15h2.5" />
      <path d="m9 9 6 6" />
    </Base>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </Base>
  );
}

export function IconPdf(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </Base>
  );
}

// Abtippen: Tastatur
export function IconTastatur(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M6 13.5h.01M18 10h.01M8.5 14.5h7" />
    </Base>
  );
}

// Nachhaken: Sprechblase mit Fragezeichen
export function IconNachhaken(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 5.5h16v10.5H9l-5 4z" />
      <path d="M10 9.2a2 2 0 1 1 2.6 1.9c-.4.2-.6.5-.6.9v.4M12 14.2h.01" />
    </Base>
  );
}

// Suchen: Lupe über Ordner
export function IconLupe(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 7.5V18a1.5 1.5 0 0 0 1.5 1.5H11" />
      <path d="M3 7.5V6a1.5 1.5 0 0 1 1.5-1.5h4l2 2h7A1.5 1.5 0 0 1 20 8v2.5" />
      <circle cx="16" cy="15.5" r="3" />
      <path d="m18.2 17.7 2.3 2.3" />
    </Base>
  );
}

// Änderungen: mehrere Briefe
export function IconBriefe(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="7" width="14" height="11" rx="1.8" />
      <path d="m3.5 8 6.5 5 6.5-5" />
      <path d="M7 4.5h12.2A1.8 1.8 0 0 1 21 6.3V15" />
    </Base>
  );
}

// Immer dieselben Fragen: zwei Sprechblasen
export function IconFragen(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 4.5h11v7.5H7.5L3 15.5z" />
      <path d="M17 8.5h4V19l-3.5-2.8H10V15" />
    </Base>
  );
}

// Verstreute Kanäle: vier Punkte, die auseinanderlaufen
export function IconKanaele(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="2" />
      <circle cx="5" cy="5" r="1.6" />
      <circle cx="19" cy="5" r="1.6" />
      <circle cx="5" cy="19" r="1.6" />
      <circle cx="19" cy="19" r="1.6" />
      <path d="m6.3 6.3 4.2 4.2M17.7 6.3l-4.2 4.2M6.3 17.7l4.2-4.2M17.7 17.7l-4.2-4.2" />
    </Base>
  );
}

// Eigenes Projekt: Puzzleteil
export function IconPuzzle(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 8h3.2a2 2 0 1 1 3.6 0H15v3.2a2 2 0 1 1 0 3.6V18h-3.2a2 2 0 1 0-3.6 0H5v-3.2a2 2 0 1 0 0-3.6z" />
    </Base>
  );
}

// Keine neue Software: Bildschirm mit Haken
export function IconBildschirm(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M8.5 20h7M12 16.5V20" />
      <path d="m9 10.3 2 2 4-4" />
    </Base>
  );
}

// Kein Datenumzug: Datenbank
export function IconDatenbank(props: IconProps) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" />
      <path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </Base>
  );
}

// Persönlicher Kontakt: Person mit Herz
export function IconPersoenlich(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3 20c0-3.6 2.9-6 6.5-6 1.5 0 2.8.4 3.9 1.1" />
      <path d="M17.5 20.5s-3.5-2.1-3.5-4.5a1.9 1.9 0 0 1 3.5-1 1.9 1.9 0 0 1 3.5 1c0 2.4-3.5 4.5-3.5 4.5z" />
    </Base>
  );
}
