import { Agendar } from "@/components/Agendar";
import { Bastidores } from "@/components/Bastidores";
import { Duvidas } from "@/components/Duvidas";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Numeros } from "@/components/Numeros";
import { Procedimentos } from "@/components/Procedimentos";
import { Resultados } from "@/components/Resultados";
import { Sobre } from "@/components/Sobre";
import { WhatsappFloat } from "@/components/WhatsappFloat";

export default function Page() {
  return (
    <div className="mx-auto max-w-[2200px] overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Numeros />
        <Procedimentos />
        <Sobre />
        <Resultados />
        <Bastidores />
        <Duvidas />
        <Agendar />
      </main>
      <Footer />
      <WhatsappFloat />
    </div>
  );
}
