import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { Container } from "./ui/Basis";

export function Rechtsseite({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="py-12 sm:py-20">
        <Container>
          <article className="mx-auto max-w-[720px] rounded-[22px] bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-10 [&_h2]:mt-9 [&_h2]:text-[22px] [&_p]:mt-3 [&_p]:leading-relaxed [&_p]:text-ink-2 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-ink-2">
            <h1 className="text-[34px] leading-tight sm:text-[42px]">{titel}</h1>
            {children}
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
