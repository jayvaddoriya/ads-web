"use client";

import React, { useState, useMemo } from "react";
import { Coins, ArrowUpRight, ArrowDownRight, DollarSign, Percent } from "lucide-react";
import AdBanner from "@/components/ads/AdBanner";
import { ADSENSE_CONFIG } from "@/config/adsense.config";

export default function CryptoRoiCalc() {
  const [investment, setInvestment] = useState<number>(5000);
  const [entryPrice, setEntryPrice] = useState<number>(65000);
  const [exitPrice, setExitPrice] = useState<number>(95000);
  const [feePercent, setFeePercent] = useState<number>(0.2);

  const { units, totalExitValue, totalFees, netProfit, roiPercent, isProfitable } = useMemo(() => {
    if (entryPrice <= 0 || exitPrice <= 0 || investment <= 0) {
      return { units: 0, totalExitValue: 0, totalFees: 0, netProfit: 0, roiPercent: 0, isProfitable: true };
    }

    const buyFee = (investment * feePercent) / 100;
    const netInvested = investment - buyFee;
    const cryptoUnits = netInvested / entryPrice;

    const grossExit = cryptoUnits * exitPrice;
    const sellFee = (grossExit * feePercent) / 100;
    const finalPayout = grossExit - sellFee;

    const profit = finalPayout - investment;
    const roi = (profit / investment) * 100;

    return {
      units: cryptoUnits,
      totalExitValue: Math.round(finalPayout * 100) / 100,
      totalFees: Math.round((buyFee + sellFee) * 100) / 100,
      netProfit: Math.round(profit * 100) / 100,
      roiPercent: Math.round(roi * 100) / 100,
      isProfitable: profit >= 0,
    };
  }, [investment, entryPrice, exitPrice, feePercent]);

  return (
    <div id="crypto" className="rounded-3xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Coins className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Crypto &amp; Stock Profit / ROI Calculator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Simulate your buy/sell target profits, percentage gains, and net broker exchange fees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Inputs */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Total Investment ($)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 text-sm font-semibold rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Entry / Buy Price ($)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 text-sm font-semibold rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Exit / Sell Target ($)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={exitPrice}
                onChange={(e) => setExitPrice(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 text-sm font-semibold rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Exchange Fee Rate (%)
            </label>
            <div className="relative">
              <Percent className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                step="0.05"
                value={feePercent}
                onChange={(e) => setFeePercent(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 text-sm font-semibold rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-2xl border ${
                isProfitable
                  ? "bg-emerald-950/30 border-emerald-900/50"
                  : "bg-rose-950/30 border-rose-900/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Net Profit / Loss
                </span>
                {isProfitable ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div
                className={`text-2xl sm:text-3xl font-black mt-1.5 ${
                  isProfitable ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {isProfitable ? "+" : ""}${netProfit.toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-900/50">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide block">
                Total Return (ROI)
              </span>
              <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-1.5">
                {isProfitable ? "+" : ""}{roiPercent}%
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Total Payout at Exit:</span>
              <strong className="text-white font-bold">
                ${totalExitValue.toLocaleString()}
              </strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Total Exchange Fees Paid:</span>
              <span className="text-slate-300 font-medium">${totalFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Equivalent Asset Units:</span>
              <span className="font-mono text-purple-400 font-semibold">
                {units.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <AdBanner
        slotId={ADSENSE_CONFIG.slots.inFeedNative}
        format="rectangle"
        className="mt-6"
        customMockTitle="Zero-Commission Trading App: Get $200 in Crypto or Stock Rewards"
        customMockCta="Trade Now"
      />
    </div>
  );
}
