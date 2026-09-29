import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdSenseScript from "@/components/ads/AdSenseScript";
import CookieConsent from "@/components/ads/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OmniPulse | Smart Calculators, Productivity Tools & Daily Trivia",
  description:
    "Free, instant, client-side tools: Compound Interest, Loan EMI, Crypto ROI, QR Code Studio, Text Analyzer, Password Generator, and Daily Trivia Arena.",
  keywords: [
    "compound interest calculator",
    "mortgage loan emi calculator",
    "crypto profit calculator",
    "qr code generator",
    "text analyzer",
    "password generator",
    "daily trivia",
    "financial tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <head>
        <AdSenseScript />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
