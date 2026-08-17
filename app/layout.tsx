import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { clinica } from "@/config/clinica";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${clinica.nome} · Harmonização facial e estética avançada`,
  description:
    "Protocolos individualizados de harmonização e rejuvenescimento facial, conduzidos com técnica, segurança e respeito à sua identidade.",
  openGraph: {
    title: `${clinica.nome} · Harmonização facial e estética avançada`,
    description:
      "Protocolos individualizados de harmonização e rejuvenescimento facial, conduzidos com técnica, segurança e respeito à sua identidade.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="overflow-x-clip">
        {children}
        <WhatsappFloat />
      </body>
    </html>
  );
}
