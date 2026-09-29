import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, User } from "lucide-react";
import { ARTICLES } from "@/data/articlesData";
import AdBanner from "@/components/ads/AdBanner";
import { ADSENSE_CONFIG } from "@/config/adsense.config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyAnchorAd from "@/components/ads/StickyAnchorAd";

export const metadata = {
  title: "Insights & Wealth Guides | OmniPulse",
  description: "Expert analysis on compound interest, debt amortization, developer workflows, and digital wealth creation.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Leaderboard Ad */}
        <AdBanner
          slotId={ADSENSE_CONFIG.slots.headerLeaderboard}
          format="leaderboard"
          className="mb-8"
        />

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Knowledge Base &amp; Editorial</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Financial Independence &amp; Technology Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            In-depth guides, mathematical models, and actionable strategies written to accelerate your financial freedom and engineering efficiency.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article, idx) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/60">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {article.author}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mid Page Native Ad Banner */}
        <AdBanner
          slotId={ADSENSE_CONFIG.slots.inFeedNative}
          format="leaderboard"
          className="mt-12"
          customMockTitle="Open a High-Yield Treasury Account with Zero State or Local Taxes"
          customMockCta="View Treasury Rates"
        />
      </main>

      <Footer />
      <StickyAnchorAd />
    </div>
  );
}
