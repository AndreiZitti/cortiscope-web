import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimationProvider } from "@/contexts/AnimationContext";

export const metadata: Metadata = {
  title: "Cortiscope - Biologically-Aware Infection Surveillance",
  description: "Revolutionary infection surveillance technology using physics-based AI to predict and prevent hospital-acquired infections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnimationProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AnimationProvider>
      </body>
    </html>
  );
}
