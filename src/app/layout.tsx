import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import NavbarFallback from "@/components/Navbar/NavbarFallback";
import Footer, { FooterFallback } from "@/components/Footer";

// Self-hosted at build time by next/font: no runtime request to Google,
// variable fonts (one file covers every weight), Latin subset only,
// and a metric-matched fallback so text swapping in causes no layout shift.
const inter = Inter({
  variable: "--font-family-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-family-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nivlearn.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | NivLearn",
    default: "NivLearn",
  },
  appleWebApp: {
    title: "NivLearn",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="NivLearn" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Suspense fallback={<NavbarFallback />}>
          <NavBar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Suspense fallback={<FooterFallback />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
