"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Calculator, 
  Wrench, 
  BrainCircuit, 
  BookOpen, 
  Menu, 
  X, 
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { ADSENSE_CONFIG } from "@/config/adsense.config";

interface NavbarProps {
  onSearchChange?: (term: string) => void;
  searchTerm?: string;
}

export default function Navbar({ onSearchChange, searchTerm = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConfigHelp, setShowConfigHelp] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
                OmniPulse
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                PRO
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/#tools"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-emerald-500" />
              <span>Finance Tools</span>
            </Link>
            <Link
              href="/#utilities"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4 text-blue-500" />
              <span>Web Utilities</span>
            </Link>
            <Link
              href="/#trivia"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <BrainCircuit className="w-4 h-4 text-purple-500" />
              <span>Daily Trivia</span>
            </Link>
            <Link
              href="/articles"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>Insights</span>
            </Link>
          </nav>

          {/* Right Section: Search & Status */}
          <div className="flex items-center gap-2.5">
            {onSearchChange && (
              <div className="relative hidden md:block w-48 xl:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search 10+ free tools..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            )}

            {/* AdSense Status Pill */}
            <button
              onClick={() => setShowConfigHelp(true)}
              className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all"
              title="Click to see AdSense connection guide"
            >
              {ADSENSE_CONFIG.isTestMode ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="hidden sm:inline">AdSense Preview Mode</span>
                  <span className="sm:hidden">Ads Ready</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>AdSense Live</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-2">
            {onSearchChange && (
              <div className="relative my-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            )}
            <Link
              href="/#tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <Calculator className="w-4 h-4 text-emerald-500" />
              <span>Finance Calculators</span>
            </Link>
            <Link
              href="/#utilities"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <Wrench className="w-4 h-4 text-blue-500" />
              <span>Web Utilities</span>
            </Link>
            <Link
              href="/#trivia"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <BrainCircuit className="w-4 h-4 text-purple-500" />
              <span>Daily Trivia Game</span>
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>High CPC Articles</span>
            </Link>
          </div>
        )}
      </header>

      {/* AdSense Integration Helper Modal */}
      {showConfigHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">Google AdSense Guide</h3>
              </div>
              <button
                onClick={() => setShowConfigHelp(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                Your website is currently configured in <strong className="text-amber-400">AdSense Preview Mode</strong>.
                All responsive ad zones (leaderboard, sidebar skyscraper, bottom sticky anchor, in-feed native, and interstitial modal) are running active test simulations.
              </p>
              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 font-mono text-[11px] text-slate-200">
                📁 File: <span className="text-indigo-400">src/config/adsense.config.ts</span>
                <br /><br />
                1. Set <span className="text-emerald-400">client: &quot;ca-pub-YOUR_ID&quot;</span>
                <br />
                2. Set <span className="text-emerald-400">isTestMode: false</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Policy-compliant labels</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>GDPR & Cookie Consent built-in</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>High-retaining tools maximize ad impressions</span>
                </div>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowConfigHelp(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
