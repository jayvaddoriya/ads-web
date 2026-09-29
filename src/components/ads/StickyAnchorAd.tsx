"use client";

import React, { useState, useEffect } from "react";
import { ADSENSE_CONFIG } from "@/config/adsense.config";
import { ChevronDown, ChevronUp, ExternalLink, Zap } from "lucide-react";

export default function StickyAnchorAd() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-[calc(100%-26px)]"
      }`}
    >
      {/* Tab Control */}
      <div className="max-w-4xl mx-auto flex justify-end px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/90 hover:bg-slate-900 text-slate-300 hover:text-white text-[11px] font-medium rounded-t-lg shadow-lg border-t border-x border-slate-700/60 backdrop-blur-md transition-colors"
          aria-label={isOpen ? "Minimize Advertisement" : "Show Advertisement"}
        >
          <span>{isOpen ? "Hide Ad" : "Show Sponsor"}</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Anchor Ad Body */}
      <div className="bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl px-4 py-2.5 shadow-2xl text-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="hidden sm:flex h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 items-center justify-center text-white shrink-0 shadow-sm">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  Featured Partner
                </span>
                <span className="text-[10px] text-slate-400">Ads by Google</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-100 mt-0.5 line-clamp-1">
                Get up to $1,000 Stock Bonus + 5.1% APY on uninvested cash today
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#anchor-partner"
              onClick={(e) => {
                e.preventDefault();
                alert("Navigating to Verified Sponsor. High-converting bottom anchor ad ready.");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <span>Claim Offer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
