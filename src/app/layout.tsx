import type { Metadata } from "next";
import { satoshi, jetbrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "monoes — Tools that think with you",
  description:
    "Four open-source instruments. One philosophy. Mono Agent, Monobrain, MonoClip, MonoTask.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ivory font-sans text-gold-bronze antialiased">
        <GrainOverlay />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
