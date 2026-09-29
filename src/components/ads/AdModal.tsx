"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, ExternalLink } from "lucide-react";

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function AdModal({
  isOpen,
  onClose,
  title = "Your Results Are Ready!",
}: AdModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(3);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              Sponsored Interstitial
            </span>
            <h3 className="text-lg font-bold text-white mt-1">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ad Body */}
        <div className="my-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/30 p-6 text-center">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 items-center justify-center text-white mb-3 shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="block text-[11px] font-semibold text-indigo-300 uppercase tracking-wide">
            Prime Partner Opportunity
          </span>
          <h4 className="text-xl font-bold text-white mt-1">
            Grow Your Net Worth with Automated Smart Portfolios
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm mx-auto">
            Zero commission trading, 5.4% interest on cash balances, and AI rebalancing built for smart investors.
          </p>
          <div className="mt-5">
            <a
              href="#modal-partner"
              onClick={(e) => {
                e.preventDefault();
                alert("Redirecting to Sponsor. (Interstitials deliver top CPM/RPM for publishers)");
                onClose();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Partner Offer</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>Ad by Google</span>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              secondsLeft > 0
                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {secondsLeft > 0 ? `Skip in ${secondsLeft}s` : "Continue to Results"}
          </button>
        </div>
      </div>
    </div>
  );
}
