"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdBanner from "@/components/ads/AdBanner";
import StickyAnchorAd from "@/components/ads/StickyAnchorAd";
import AdModal from "@/components/ads/AdModal";
import CompoundInterestCalc from "@/components/tools/finance/CompoundInterestCalc";
import LoanEmiCalc from "@/components/tools/finance/LoanEmiCalc";
import CryptoRoiCalc from "@/components/tools/finance/CryptoRoiCalc";
import QrCodeGenerator from "@/components/tools/utilities/QrCodeGenerator";
import TextAnalyzer from "@/components/tools/utilities/TextAnalyzer";
import PasswordGenerator from "@/components/tools/utilities/PasswordGenerator";
import JsonFormatter from "@/components/tools/utilities/JsonFormatter";
import DailyQuizGame from "@/components/tools/quiz/DailyQuizGame";
import { ADSENSE_CONFIG } from "@/config/adsense.config";
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Calculator, 
  Wrench, 
  BrainCircuit, 
  BookOpen, 
  ArrowRight,
  Flame
} from "lucide-react";
import { ARTICLES } from "@/data/articlesData";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "finance" | "utilities" | "quiz">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Your Calculations Are Ready!");

  const handleTriggerReport = () => {
    setModalTitle("Generating Comprehensive Wealth Projection...");
    setIsModalOpen(true);
  };

  const handleCompleteQuiz = () => {
    setModalTitle("Calculating Brain Cognitive Score...");
    setIsModalOpen(true);
  };

  const matchesSearch = (toolName: string) => {
    if (!searchTerm) return true;
    return toolName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Navigation */}
      <Navbar onSearchChange={setSearchTerm} searchTerm={searchTerm} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Top Header Leaderboard Ad */}
        <AdBanner
          slotId={ADSENSE_CONFIG.slots.headerLeaderboard}
          format="leaderboard"
          className="mb-8"
        />

        {/* Hero Section */}
        <section className="text-center py-8 sm:py-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free • Zero Signups • Privacy-First Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            High-Precision Calculators &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Smart Web Utilities
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Project your wealth with compound interest visualizers, compute loan EMIs, test your intellect with daily trivia, and generate QR codes—all executed client-side with lightning speed.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
            <div>
              <span className="block text-xl sm:text-2xl font-black text-slate-900 dark:text-white">8+</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Free Tools</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">&lt; 15ms</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Instant Compute</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">100%</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Client Privacy</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-500"
              }`}
            >
              All Tools &amp; Games
            </button>
            <button
              onClick={() => setActiveTab("finance")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "finance"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-500"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Finance Suite</span>
            </button>
            <button
              onClick={() => setActiveTab("utilities")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "utilities"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-500"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Productivity</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "quiz"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-purple-500"
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Daily Trivia</span>
            </button>
          </div>
        </section>

        {/* Content Arena Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
          {/* Main Left / Center Area: Tools & Games */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1: Financial Suite */}
            {(activeTab === "all" || activeTab === "finance") && (
              <div id="tools" className="space-y-8">
                {matchesSearch("compound interest wealth retirement") && (
                  <CompoundInterestCalc onTriggerModal={handleTriggerReport} />
                )}

                {matchesSearch("loan mortgage emi interest amortization") && (
                  <LoanEmiCalc />
                )}

                {matchesSearch("crypto stock profit roi trading target") && (
                  <CryptoRoiCalc />
                )}
              </div>
            )}

            {/* Mid Feed Native Ad Placement */}
            <AdBanner
              slotId={ADSENSE_CONFIG.slots.inFeedNative}
              format="rectangle"
              customMockTitle="Top Rated High-Yield Money Market Funds for 2026"
              customMockCta="View Current APYs"
            />

            {/* Section 2: Web Utilities */}
            {(activeTab === "all" || activeTab === "utilities") && (
              <div id="utilities" className="space-y-8">
                {matchesSearch("qr code generator link download svg png") && (
                  <QrCodeGenerator />
                )}

                {matchesSearch("text word analyzer count reading time uppercase lowercase") && (
                  <TextAnalyzer />
                )}

                {matchesSearch("password generator entropy crypt security") && (
                  <PasswordGenerator />
                )}

                {matchesSearch("json prettifier formatter validator minify") && (
                  <JsonFormatter />
                )}
              </div>
            )}

            {/* Section 3: Daily Brain Trivia Arena */}
            {(activeTab === "all" || activeTab === "quiz") && (
              <div id="trivia" className="space-y-8">
                {matchesSearch("quiz daily trivia brain challenge iq test") && (
                  <DailyQuizGame onCompleteQuiz={handleCompleteQuiz} />
                )}
              </div>
            )}

            {/* Section 4: High CPC Evergreen Knowledge Articles */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Wealth Guides &amp; Market Insights
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Deep-dive editorials written to maximize your long-term returns.
                    </p>
                  </div>
                </div>
                <Link
                  href="/articles"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>Browse all guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {ARTICLES.slice(0, 2).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {article.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-1 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{article.readTime}</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar with Skyscraper Ad & Quick Stats */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Sticky Skyscraper Ad Unit (High RPM unit) */}
            <AdBanner
              slotId={ADSENSE_CONFIG.slots.sidebarSkyscraper}
              format="skyscraper"
              customMockTitle="Automated Wealth Management with 0% Advisory Fees"
              customMockCta="Get Started Free"
            />

            {/* Quick Navigation Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Popular Quick Utilities
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#compound"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                  >
                    <span>Compound Interest Simulator</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="#loan"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                  >
                    <span>Mortgage EMI Calculator</span>
                    <Calculator className="w-3.5 h-3.5 text-blue-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="#qr"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                  >
                    <span>QR Code Studio</span>
                    <Wrench className="w-3.5 h-3.5 text-indigo-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="#trivia"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                  >
                    <span>Daily Brain IQ Trivia</span>
                    <BrainCircuit className="w-3.5 h-3.5 text-purple-500" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Pro Tips Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-purple-950/50 border border-indigo-500/30 text-white space-y-2">
              <div className="flex items-center gap-2 text-indigo-400">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Pro Finance Tip</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Investing $15 daily in a broad market index from age 25 to 65 at an 8% average return yields over <strong>$1.5 Million</strong> at retirement.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Anchor Ad */}
      <StickyAnchorAd />

      {/* Interstitial Ad Modal */}
      <AdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      />
    </div>
  );
}
