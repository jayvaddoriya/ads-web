"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("adsense_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShowConsent(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("adsense_cookie_consent", "accepted");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("adsense_cookie_consent", "essential_only");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-14 sm:bottom-16 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-white">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
          <Cookie className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold flex items-center gap-1.5 text-white">
            <span>Cookie & Advertising Consent</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            We use cookies to personalize content, analyze traffic, and display relevant ads through Google AdSense. By clicking &quot;Accept All&quot;, you consent to our use of cookies according to our{" "}
            <Link href="/privacy-policy" className="text-indigo-400 underline hover:text-indigo-300">
              Privacy Policy
            </Link>.
          </p>
          <div className="mt-3.5 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
