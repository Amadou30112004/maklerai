import type { SVGProps } from "react";
import type { SpartenId } from "@/lib/demo/typen";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
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

// Eigenes Logo des erfundenen Maklerbüros
export function LogoMV({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="var(--marke)" />
      <text
        x="20"
        y="25.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="600"
        fill="#fff"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        letterSpacing="0.5"
      >
        MV
      </text>
    </svg>
  );
}

const kfz = (p: P) => (
  <Base {...p}>
    <path d="M4 16.5V13l1.8-4.6A2 2 0 0 1 7.7 7h8.6a2 2 0 0 1 1.9 1.4L20 13v3.5" />
    <path d="M3 13h18v3.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <circle cx="7.5" cy="17.5" r="1.6" />
    <circle cx="16.5" cy="17.5" r="1.6" />
  </Base>
);

const hausrat = (p: P) => (
  <Base {...p}>
    <path d="M5 11V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2" />
    <path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M6 18v2M18 18v2" />
  </Base>
);

const wohngebaeude = (p: P) => (
  <Base {...p}>
    <path d="M3.5 11 12 4l8.5 7" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M10 20v-5h4v5" />
  </Base>
);

const haftpflicht = (p: P) => (
  <Base {...p}>
    <path d="M12 3 5 6v5.5c0 4.3 3 7.7 7 9.5 4-1.8 7-5.2 7-9.5V6z" />
    <circle cx="12" cy="10" r="2.2" />
    <path d="M8.5 16a3.8 3.8 0 0 1 7 0" />
  </Base>
);

const glas = (p: P) => (
  <Base {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
    <path d="m9 3.5 2.5 5-3 3 4 4-1.5 5" />
    <path d="m11.5 8.5 4 1.5" />
  </Base>
);

export const spartenIcons: Record<SpartenId, (p: P) => React.JSX.Element> = {
  kfz,
  hausrat,
  wohngebaeude,
  haftpflicht,
  glas,
};

export function IconKamera(p: P) {
  return (
    <Base {...p}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" />
      <circle cx="12" cy="13" r="3.5" />
    </Base>
  );
}

export function IconMuell(p: P) {
  return (
    <Base {...p}>
      <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" />
    </Base>
  );
}

export function IconInfo(p: P) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </Base>
  );
}

export function IconWarnung(p: P) {
  return (
    <Base {...p}>
      <path d="M12 4 2.8 19.5h18.4z" />
      <path d="M12 10v4.5M12 17h.01" />
    </Base>
  );
}
