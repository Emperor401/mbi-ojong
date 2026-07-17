import { Bebas_Neue, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const script = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  variable: "--font-script",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "Jiles Agbor Mbi Ojong | AML Investigation Analyst",
  description:
    "AML Investigation Analyst specialising in consumer transaction monitoring, financial crime detection, and compliance risk assessment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${script.variable} ${body.variable} bg-black text-white`}>
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}