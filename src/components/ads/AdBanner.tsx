"use client";

import React, { useEffect, useRef } from "react";
import { ADSENSE_CONFIG } from "@/config/adsense.config";
import { ExternalLink, Sparkles, ShieldCheck, Zap } from "lucide-react";

export type AdFormat = "leaderboard" | "rectangle" | "skyscraper" | "inFeed" | "fluid";

interface AdBannerProps {
  slotId?: string;
  format?: AdFormat;
  className?: string;
  label?: string;
  customMockTitle?: string;
  customMockCta?: string;
}

// Sample sponsor presets for preview/test mode
const MOCK_ADS = [
  {
    tag: "High Yield Savings",
    title: "Earn 5.35% APY with Zero Monthly Fees",
    desc: "FDIC Insured up to $2.5M. Automate savings & get instant transfers.",
    cta: "Open Account",
    sponsor: "NovaBank Direct",
    icon: Sparkles,
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
  },
  {
    tag: "Cloud & AI Infrastructure",
    title: "Deploy Full-Stack Apps in Seconds with $200 Free Credits",
    desc: "Instant CI/CD, global edge latency < 30ms, zero server maintenance.",
    cta: "Claim $200 Credit",
    sponsor: "HyperCloud Edge",
    icon: Zap,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
  },
  {
    tag: "Automated Wealth & Stocks",
    title: "Smart Portfolio Rebalancing with Zero Commission",
    desc: "Tax-loss harvesting algorithms optimized to maximize your net return.",
    cta: "Start Investing",
    sponsor: "ApexWealth AI",
    icon: ShieldCheck,
    gradient: "from-amber-600 via-orange-600 to-rose-600",
  },
];

export default function AdBanner({
  slotId = ADSENSE_CONFIG.slots.inFeedNative,
  format = "rectangle",
  className = "",
  label = "Advertisement",
  customMockTitle,
  customMockCta,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Only attempt to push real ad if not in test mode and not already pushed
    if (!ADSENSE_CONFIG.isTestMode && typeof window !== "undefined" && !pushedRef.current) {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
        pushedRef.current = true;
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, []);

  // If live mode is enabled and client configured, render real Google AdSense <ins>
  if (!ADSENSE_CONFIG.isTestMode && !ADSENSE_CONFIG.client.includes("0000000000000000")) {
    return (
      <div className={`my-4 flex flex-col items-center justify-center overflow-hidden ${className}`}>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
          {label}
        </span>
        <div className="w-full flex justify-center bg-slate-900/5 dark:bg-slate-900/50 rounded-xl p-2 border border-slate-200/50 dark:border-slate-800">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-client={ADSENSE_CONFIG.client}
            data-ad-slot={slotId}
            data-ad-format={format === "leaderboard" ? "horizontal" : format === "skyscraper" ? "vertical" : "auto"}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Pick deterministic mock based on slotId length/character to have varied ads
  const mockIndex = Math.abs((slotId.charCodeAt(0) || 0) + (slotId.length || 0)) % MOCK_ADS.length;
  const mock = MOCK_ADS[mockIndex];
  const IconComponent = mock.icon;

  // Render high-converting, compliant preview unit
  if (format === "leaderboard") {
    return (
      <div className={`w-full my-4 ${className}`}>
        <div className="flex items-center justify-between px-2 mb-1">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            {label}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
            Ads by Google
          </span>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300">
                    {mock.tag}
                  </span>
                  <span className="text-xs text-slate-400">{mock.sponsor}</span>
                </div>
                <h4 className="font-semibold text-sm sm:text-base text-white mt-0.5">
                  {customMockTitle || mock.title}
                </h4>
                <p className="hidden md:block text-xs text-slate-300 mt-0.5">{mock.desc}</p>
              </div>
            </div>
            <a
              href="#sponsored"
              onClick={(e) => {
                e.preventDefault();
                alert(`Redirecting to sponsored partner: ${mock.sponsor}\n(In live mode, Google AdSense ads automatically track impressions & clicks)`);
              }}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <span>{customMockCta || mock.cta}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (format === "skyscraper") {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            {label}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Ads by Google</span>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-5 text-white shadow-md flex flex-col justify-between min-h-[380px] sticky top-24">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[11px] font-medium text-indigo-300">
                {mock.tag}
              </span>
              <span className="text-[11px] text-slate-400">{mock.sponsor}</span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <IconComponent className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-base leading-snug text-white mb-2">
              {customMockTitle || mock.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{mock.desc}</p>
          </div>
          <div className="pt-6">
            <a
              href="#sponsored"
              onClick={(e) => {
                e.preventDefault();
                alert(`Sponsor: ${mock.sponsor}\nAdSense unit ready.`);
              }}
              className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>{customMockCta || mock.cta}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Default rectangle / inFeed
  return (
    <div className={`my-4 w-full ${className}`}>
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          {label}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">Ads by Google</span>
      </div>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-11 w-11 shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-md bg-indigo-100 dark:bg-indigo-900/40 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
                  Sponsored • {mock.tag}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{mock.sponsor}</span>
              </div>
              <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                {customMockTitle || mock.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {mock.desc}
              </p>
            </div>
          </div>
          <a
            href="#sponsored"
            onClick={(e) => {
              e.preventDefault();
              alert(`Visiting Sponsor: ${mock.sponsor}`);
            }}
            className="shrink-0 w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
          >
            <span>{customMockCta || mock.cta}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
