import type { Metadata } from "next";
import { satoshi, jetbrainsMono } from "@/lib/fonts";
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
        {children}
      </body>
    </html>
  );
}
