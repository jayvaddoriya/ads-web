"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Shield, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-300 pt-16 pb-28 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                OmniPulse
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The all-in-one free platform for high-precision wealth calculators, productivity tools, and daily brain challenges. Fast, client-side, and privacy-respecting.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Google AdSense &amp; GDPR Compliant Web Platform</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Finance Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#compound" className="hover:text-indigo-400 transition-colors">
                  Compound Interest
                </Link>
              </li>
              <li>
                <Link href="/#loan" className="hover:text-indigo-400 transition-colors">
                  Loan / Mortgage EMI
                </Link>
              </li>
              <li>
                <Link href="/#crypto" className="hover:text-indigo-400 transition-colors">
                  Crypto &amp; Stock ROI
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-indigo-400 transition-colors">
                  Wealth Building Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Productivity */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Utilities &amp; Fun
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#qr" className="hover:text-indigo-400 transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/#text" className="hover:text-indigo-400 transition-colors">
                  Text &amp; Word Analyzer
                </Link>
              </li>
              <li>
                <Link href="/#password" className="hover:text-indigo-400 transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/#trivia" className="hover:text-indigo-400 transition-colors">
                  Daily Trivia Arena
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy links (Mandatory for AdSense Approval) */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Compliance &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800">
          <div>
            <h4 className="text-base font-semibold text-white">Join 25,000+ smart users</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Get weekly financial tips, productivity shortcuts, and new free tools.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom copyright & AdSense disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} OmniPulse. All rights reserved.</p>
          <p className="text-center sm:text-right text-[11px] text-slate-500 max-w-xl">
            Disclaimer: Ads displayed on this site are served by Google AdSense and verified advertising partners. All tools and calculators provide informational estimates only and do not constitute financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
