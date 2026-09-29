import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyAnchorAd from "@/components/ads/StickyAnchorAd";
import { FileCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Service | OmniPulse",
  description: "Terms and conditions of using OmniPulse tools, calculators, and informational content.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
          <FileCheck className="w-4 h-4" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400 mb-8">Effective Date: September 29, 2026</p>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing and using OmniPulse, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2. Educational &amp; Informational Disclaimer</h2>
            <p>
              All tools, calculators, simulations, and articles provided on OmniPulse are for educational and informational purposes only. None of the calculations or content constitute financial, investment, legal, or tax advice. Past performance is no guarantee of future returns. Users should seek independent professional financial advice before executing any monetary transactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">3. Advertising Disclosures</h2>
            <p>
              OmniPulse is supported by advertisements served by Google AdSense and accredited advertising networks. Users agree not to artificially manipulate, click, or deploy automated bots against any sponsored links or advertisements displayed on the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">4. Limitation of Liability</h2>
            <p>
              In no event shall OmniPulse or its creators be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of our tools and services.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <StickyAnchorAd />
    </div>
  );
}
