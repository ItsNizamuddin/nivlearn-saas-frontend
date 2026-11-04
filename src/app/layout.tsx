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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, courseOptions] = await Promise.all([
    getCategories(),
    getCourseOptions(),
  ]);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="NivLearn" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LeadModalProvider courses={courseOptions}>
          <GeoLocationInitializer />
          <NavBar initialCategories={categories} />
          <main className="flex-1">{children}</main>
          <Footer />
          <LeadModal courses={courseOptions} />
        </LeadModalProvider>
      </body>
    </html>
  );
}
