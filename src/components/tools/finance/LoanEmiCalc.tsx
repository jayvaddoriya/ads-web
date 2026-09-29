"use client";

import React, { useState, useMemo } from "react";
import { Landmark, DollarSign, Calendar, Percent, ShieldCheck } from "lucide-react";
import AdBanner from "@/components/ads/AdBanner";
import { ADSENSE_CONFIG } from "@/config/adsense.config";

export default function LoanEmiCalc() {
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenureYears, setTenureYears] = useState<number>(30);

  const { monthlyEmi, totalInterest, totalPayment } = useMemo(() => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    if (ratePerMonth === 0) {
      const emi = principal / totalMonths;
      return {
        monthlyEmi: Math.round(emi),
        totalInterest: 0,
        totalPayment: principal,
      };
    }

    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths)) /
      (Math.pow(1 + ratePerMonth, totalMonths) - 1);

    const totalAmt = emi * totalMonths;
    const interest = totalAmt - principal;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(interest),
      totalPayment: Math.round(totalAmt),
    };
  }, [loanAmount, interestRate, tenureYears]);

  const principalRatio = Math.round((loanAmount / totalPayment) * 100) || 50;
  const interestRatio = 100 - principalRatio;

  return (
    <div id="loan" className="rounded-3xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Landmark className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Mortgage &amp; Loan EMI Calculator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Calculate your monthly mortgage payments, interest burden, and loan amortization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Loan Amount */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                Loan Amount
              </span>
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700/80">
                <span className="text-xs text-slate-400">$</span>
                <input
                  type="number"
                  min={1000}
                  max={5000000}
                  step={5000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-24 text-xs font-bold text-blue-400 bg-transparent text-right outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={10000}
              max={1500000}
              step={10000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>

          {/* Interest Rate */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-blue-400" />
                Interest Rate (p.a.)
              </span>
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700/80">
                <input
                  type="number"
                  min={0.1}
                  max={25}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-12 text-xs font-bold text-blue-400 bg-transparent text-right outline-none"
                />
                <span className="text-xs text-blue-400 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={18}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>

          {/* Tenure */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                Loan Tenure (Years)
              </span>
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700/80">
                <input
                  type="number"
                  min={1}
                  max={40}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-10 text-xs font-bold text-blue-400 bg-transparent text-right outline-none"
                />
                <span className="text-xs text-blue-400 font-medium">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Breakdown Output */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          {/* Main Hero: Monthly EMI */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/90 via-slate-900 to-indigo-950/70 border border-blue-500/40 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Monthly Payment (EMI)
              </span>
              <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                Fixed Monthly
              </span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 tracking-tight">
              ${monthlyEmi.toLocaleString()}
            </div>
          </div>

          {/* Secondary 2-Column Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/50">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide block">
                Total Interest Payable
              </span>
              <div className="text-xl sm:text-2xl font-bold text-amber-400 mt-1">
                ${totalInterest.toLocaleString()}
              </div>
              <span className="text-[11px] text-amber-500/80 block mt-1">
                {interestRatio}% of total loan payout
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">
                Total Amount Payable
              </span>
              <div className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                ${totalPayment.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                Principal + total interest
              </span>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>Principal ({principalRatio}%)</span>
              <span>Total Interest ({interestRatio}%)</span>
            </div>
            <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${principalRatio}%` }} className="bg-blue-600 transition-all duration-300" />
              <div style={{ width: `${interestRatio}%` }} className="bg-amber-500 transition-all duration-300" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-900/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Looking to refinance or secure pre-approval?</span>
            </div>
            <span className="font-semibold text-blue-400">Rates from 5.4%</span>
          </div>
        </div>
      </div>

      <AdBanner
        slotId={ADSENSE_CONFIG.slots.inFeedNative}
        format="inFeed"
        className="mt-6"
        customMockTitle="Refinance Your Mortgage & Save Up to $450/Month"
        customMockCta="Check Eligibility"
      />
    </div>
  );
}
