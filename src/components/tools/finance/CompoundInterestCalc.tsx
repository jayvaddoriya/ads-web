"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, DollarSign, Calendar, Percent, Sparkles } from "lucide-react";
import AdBanner from "@/components/ads/AdBanner";
import { ADSENSE_CONFIG } from "@/config/adsense.config";

export default function CompoundInterestCalc({ onTriggerModal }: { onTriggerModal?: () => void }) {
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [rate, setRate] = useState<number>(8.5);
  const [years, setYears] = useState<number>(15);

  const results = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    let balance = principal;
    let totalInvested = principal;

    const yearlyData: { year: number; balance: number; invested: number; interest: number }[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;

      if (month % 12 === 0) {
        const currentYear = month / 12;
        yearlyData.push({
          year: currentYear,
          balance: Math.round(balance),
          invested: Math.round(totalInvested),
          interest: Math.round(balance - totalInvested),
        });
      }
    }

    const totalInterest = balance - totalInvested;

    return {
      finalBalance: Math.round(balance),
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      yearlyData,
    };
  }, [principal, monthlyContribution, rate, years]);

  const investedPercent = Math.round((results.totalInvested / results.finalBalance) * 100) || 50;
  const interestPercent = 100 - investedPercent;

  return (
    <div id="compound" className="rounded-3xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Compound Interest &amp; Wealth Visualizer
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Simulate your investment growth, monthly compounding returns, and long-term passive wealth.
          </p>
        </div>
        <button
          onClick={onTriggerModal}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Full Wealth Projection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Sliders & Inputs */}
        <div className="lg:col-span-5 space-y-5">
          {/* Initial Investment */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                Initial Investment
              </span>
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700/80">
                <span className="text-xs text-slate-400">$</span>
                <input
                  type="number"
                  min={0}
                  max={1000000}
                  step={500}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-20 text-xs font-bold text-indigo-400 bg-transparent text-right outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={500}
              max={200000}
              step={500}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
            />
          </div>

          {/* Monthly Contribution */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                Monthly Contribution
              </span>
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700/80">
                <span className="text-xs text-slate-400">$</span>
                <input
                  type="number"
                  min={0}
                  max={50000}
                  step={50}
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-16 text-xs font-bold text-indigo-400 bg-transparent text-right outline-none"
                />
                <span className="text-[10px] text-slate-400">/mo</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={10000}
              step={50}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            />
          </div>

          {/* Annual Return */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-emerald-400" />
                Annual Return Rate
              </span>
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700/80">
                <input
                  type="number"
                  min={0.5}
                  max={30}
                  step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-12 text-xs font-bold text-emerald-400 bg-transparent text-right outline-none"
                />
                <span className="text-xs text-emerald-400 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="accent-emerald"
            />
          </div>

          {/* Investment Horizon */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Investment Horizon
              </span>
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700/80">
                <input
                  type="number"
                  min={1}
                  max={50}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-10 text-xs font-bold text-indigo-400 bg-transparent text-right outline-none"
                />
                <span className="text-xs text-indigo-400 font-medium">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Results & Breakdown */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          {/* Main Hero Card: Final Balance */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/90 via-slate-900 to-purple-950/70 border border-indigo-500/40 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Final Estimated Balance
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                +{interestPercent}% Growth
              </span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 tracking-tight">
              ${results.finalBalance.toLocaleString()}
            </div>
          </div>

          {/* Secondary Metrics: 2 Spacious Columns That Never Break Awkwardly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">
                Total Principal Invested
              </span>
              <div className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                ${results.totalInvested.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                {investedPercent}% of final balance
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/50">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide block">
                Total Compound Interest
              </span>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                +${results.totalInterest.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-500/80 block mt-1">
                Generated purely from compounding
              </span>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>Principal ({investedPercent}%)</span>
              <span>Compound Growth ({interestPercent}%)</span>
            </div>
            <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${investedPercent}%` }}
                className="bg-indigo-500 transition-all duration-300"
              />
              <div
                style={{ width: `${interestPercent}%` }}
                className="bg-emerald-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Milestones Preview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Wealth Milestones Breakdown
            </h4>
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              {results.yearlyData
                .filter((_, idx) => idx === 0 || idx === Math.floor(results.yearlyData.length / 2) || idx === results.yearlyData.length - 1)
                .map((item) => (
                  <div key={item.year} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Year {item.year}</span>
                    <strong className="text-white font-bold block mt-0.5 text-xs sm:text-sm">
                      ${item.balance.toLocaleString()}
                    </strong>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded High CPC Ad Placement */}
      <AdBanner
        slotId={ADSENSE_CONFIG.slots.toolResultBanner}
        format="inFeed"
        className="mt-6"
        customMockTitle="Top 5 High-Yield Cash Accounts Offering Up To 5.3% APY"
        customMockCta="Compare Rates"
      />
    </div>
  );
}
