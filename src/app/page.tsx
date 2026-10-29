import { Alltag } from "@/components/Alltag";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LichtEffekt } from "@/components/LichtEffekt";
import { Nav } from "@/components/Nav";
import { OhneUmstellung } from "@/components/OhneUmstellung";
import { Projekte } from "@/components/Projekte";
import { ScrollEffekte } from "@/components/ScrollEffekte";
import { Termin } from "@/components/Termin";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Alltag />
        <Projekte />
        <Termin />
        <OhneUmstellung />
        <Faq />
      </main>
      <Footer />
      <ScrollEffekte />
      <LichtEffekt />
    </>
  );
}
