"use client";

import React, { useState } from "react";
import { Braces, Copy, Check, Minimize2, CheckCircle2, AlertCircle } from "lucide-react";

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState(`{
  "project": "OmniPulse",
  "status": "active",
  "rating": 4.9,
  "features": ["Finance Tools", "Productivity", "Brain Games"],
  "settings": {
    "theme": "modern",
    "adSenseReady": true
  }
}`);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = (spaces: number = 2) => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JSON format");
      }
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JSON format");
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="json" className="rounded-3xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Braces className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              JSON Prettifier &amp; Syntax Validator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Format, minify, and inspect JSON payloads with real-time parse error diagnostics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleFormat(2)}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            Format (2-Spaces)
          </button>
          <button
            onClick={handleMinify}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {error ? (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>JSON Syntax Error: {error}</span>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-900/50 text-xs text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Valid JSON payload ready</span>
          </div>
        )}

        <textarea
          rows={9}
          value={inputJson}
          onChange={(e) => {
            setInputJson(e.target.value);
            try {
              JSON.parse(e.target.value);
              setError(null);
            } catch (err: unknown) {
              if (err instanceof Error) {
                setError(err.message);
              }
            }
          }}
          className="w-full font-mono text-xs p-4 rounded-2xl border border-slate-800 bg-slate-950 text-emerald-400 focus:ring-2 focus:ring-teal-500 outline-none resize-y"
        />
      </div>
    </div>
  );
}
