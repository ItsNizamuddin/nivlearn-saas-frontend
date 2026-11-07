import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "./sprits.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LeadModalProvider } from "@/context/LeadModalContext";
import GeoLocationInitializer from "@/context/GeoLocationInitializer";
import { LeadModal } from "@/components/forms";
import { getCategories, getCourseOptions } from "@/services/catalog.service";
import { getRibbons } from "@/services/content.service";
import DynamicScripts from "@/components/logics/DynamicScripts";
import Ribbons from "@/components/ui/others/Ribbons";
import { SITE_URL } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, courseOptions, ribbonsResponse] = await Promise.all([
    getCategories(),
    getCourseOptions(),
    getRibbons(),
  ]);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="NivLearn" />
        <link rel="preconnect" href="https://cloud-storage.skilldeck.net" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cloud-storage.skilldeck.net" />
        {/* Asynchronously loads the live CDN stylesheet without blocking initial render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://cloud-storage.skilldeck.net/static/editor/skilldeck-rich-text.min.css';document.head.appendChild(l);})()`,
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cloud-storage.skilldeck.net/static/editor/skilldeck-rich-text.min.css"
          />
        </noscript>
        <DynamicScripts position="head" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <DynamicScripts position="body" />
        <LeadModalProvider courses={courseOptions}>
          <GeoLocationInitializer />
          <Ribbons type="header" response={ribbonsResponse} />
          <NavBar initialCategories={categories} />
          <main className="flex-1">{children}</main>
          <Footer />
          <Ribbons type="footer" response={ribbonsResponse} />
          <LeadModal courses={courseOptions} />
        </LeadModalProvider>
      </body>
    </html>
  );
}
