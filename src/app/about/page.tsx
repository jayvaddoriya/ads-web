import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyAnchorAd from "@/components/ads/StickyAnchorAd";
import { Sparkles, Target, Users, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | OmniPulse",
  description: "Learn about the mission, engineering philosophy, and values behind OmniPulse.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Our Mission &amp; Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Empowering Financial Clarity &amp; Digital Productivity
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
          OmniPulse was built with a single objective: to deliver ultra-fast, zero-friction, privacy-first web utilities and wealth planning tools that anyone can use without paywalls or intrusive logins.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Precision &amp; Speed</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every calculator is verified against strict mathematical formulas, offering instant client-side responses with no server roundtrips.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Privacy by Architecture</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculations occur locally in your browser. We don&apos;t store your salaries, loans, or custom passwords.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-xl mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Have Questions or Feature Ideas?</h3>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1">
              We frequently update our algorithms and welcome community feedback.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs transition-all shadow-md hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </main>

      <Footer />
      <StickyAnchorAd />
    </div>
  );
}
