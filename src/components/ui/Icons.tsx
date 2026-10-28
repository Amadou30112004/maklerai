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

export function IconUhr(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  );
}

export function IconEuro(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M17 6.5A7 7 0 1 0 17 17.5" />
      <path d="M4.5 10.5h8M4.5 13.5h8" />
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

export function IconHakenKreis(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.3 2.4 2.4 4.6-4.9" />
    </Base>
  );
}

export function IconTeam(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14a5.5 5.5 0 0 1 3 5" />
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

export function IconKompass(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </Base>
  );
}

export function IconPinsel(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M19.5 4.5 11 13" />
      <path d="M11 13c-2-1-4.5 0-5 2.5-.3 1.6-1 2.8-2.5 3.5 3 1 7 .5 8.5-2.5.7-1.4.3-2.7-1-3.5z" />
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

export function IconTelefon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.5 3.5h2.5l1.5 4-2 1.3a10 10 0 0 0 6.7 6.7l1.3-2 4 1.5v2.5a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
    </Base>
  );
}

export function IconChat(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12z" />
    </Base>
  );
}

export function IconFoto(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M8.5 6 10 3.5h4L15.5 6" />
      <circle cx="12" cy="12.5" r="3.5" />
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
