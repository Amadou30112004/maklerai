import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

// next/font lädt die Schrift beim Build herunter und liefert sie selbst aus, kein externer Abruf im Browser.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const titel = `${site.name}: ${site.claim}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: titel,
    template: `%s | ${site.name}`,
  },
  description: site.beschreibung,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: titel,
    description: site.beschreibung,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5F3EF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
