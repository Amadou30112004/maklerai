import { Ablauf } from "@/components/Ablauf";
import { Datenschutz } from "@/components/Datenschutz";
import { Erstgespraech } from "@/components/Erstgespraech";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Kreislauf } from "@/components/Kreislauf";
import { Loesungen } from "@/components/Loesungen";
import { Nav } from "@/components/Nav";
import { Rechner } from "@/components/Rechner";
import { UeberMich } from "@/components/UeberMich";
import { Vorteile } from "@/components/Vorteile";
import { Warum } from "@/components/Warum";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vorteile />
        <Kreislauf />
        <Loesungen />
        <Ablauf />
        <Rechner />
        <Warum />
        <Datenschutz />
        <UeberMich />
        <Faq />
        <Erstgespraech />
      </main>
      <Footer />
    </>
  );
}
