import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from "lucide-react";
import { ARTICLES } from "@/data/articlesData";
import AdBanner from "@/components/ads/AdBanner";
import { ADSENSE_CONFIG } from "@/config/adsense.config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyAnchorAd from "@/components/ads/StickyAnchorAd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Top Header Leaderboard Ad */}
        <AdBanner
          slotId={ADSENSE_CONFIG.slots.headerLeaderboard}
          format="leaderboard"
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all guides</span>
            </Link>

            <div className="space-y-4">
              <span className="font-semibold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/60">
                {article.category}
              </span>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 py-3 border-y border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* In-Content Paragraphs with Mid-Content Ad */}
            <div className="mt-8 space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-200 leading-relaxed border-l-4 border-indigo-500 pl-4">
                {article.content[0]}
              </p>

              <p>{article.content[1]}</p>

              {/* Prime High CTR In-Article Ad Placement */}
              <AdBanner
                slotId={ADSENSE_CONFIG.slots.articleMidContent}
                format="rectangle"
                className="my-8"
                customMockTitle="Grow Your Savings 10x Faster with Automated Smart Yield Portfolios"
                customMockCta="Learn More"
              />

              {article.content.slice(2).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Bottom In-Article Native Ad */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <AdBanner
                slotId={ADSENSE_CONFIG.slots.inFeedNative}
                format="leaderboard"
                customMockTitle="Special Rate: Refinance Commercial & Personal Loans at Historic Lows"
                customMockCta="Compare Offers"
              />
            </div>
          </article>

          {/* Sticky Sidebar with Skyscraper Ad & Related Tools */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sticky Skyscraper Ad Unit */}
            <AdBanner
              slotId={ADSENSE_CONFIG.slots.sidebarSkyscraper}
              format="skyscraper"
              customMockTitle="Elite Financial Planning & Automated Tax Shields"
              customMockCta="Schedule Free Consultation"
            />

            {/* Quick Interactive Tool Box */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Try Free Calculators
              </h4>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link
                    href="/#compound"
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500 transition-colors"
                  >
                    <strong className="block text-slate-800 dark:text-slate-200">
                      Compound Interest Calculator
                    </strong>
                    <span className="text-slate-400">Calculate 10-30 year wealth projections</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#loan"
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500 transition-colors"
                  >
                    <strong className="block text-slate-800 dark:text-slate-200">
                      Mortgage &amp; Loan EMI
                    </strong>
                    <span className="text-slate-400">Analyze principal vs interest payment split</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#trivia"
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500 transition-colors"
                  >
                    <strong className="block text-slate-800 dark:text-slate-200">
                      Daily Brain IQ Trivia
                    </strong>
                    <span className="text-slate-400">Compete in 5 quick intellectual challenges</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <StickyAnchorAd />
    </div>
  );
}
