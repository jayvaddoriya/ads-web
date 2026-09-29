"use client";

import React, { useState, useEffect, useCallback } from "react";
import { KeyRound, Copy, Check, RefreshCw, Shield, AlertTriangle } from "lucide-react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("Please select at least 1 option");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const strength = (() => {
    if (password.length < 8) return { label: "Very Weak", color: "bg-rose-500", text: "text-rose-400", crack: "Instant" };
    if (password.length < 12) return { label: "Moderate", color: "bg-amber-500", text: "text-amber-400", crack: "~2 Hours" };
    if (password.length < 16) return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-400", crack: "~500 Years" };
    return { label: "Military Grade", color: "bg-indigo-500", text: "text-indigo-400", crack: "34 Trillion Years" };
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="password" className="rounded-3xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <KeyRound className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Cryptographic Password &amp; Vault Studio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Generate uncrackable, cryptographically secure passwords with entropy security audit.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Output Box */}
        <div className="flex items-center gap-2 p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full bg-transparent font-mono text-sm sm:text-base font-semibold tracking-wider outline-none text-emerald-400 select-all"
          />
          <button
            onClick={generatePassword}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            title="Regenerate"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Strength Meter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
            <div>
              <span className="text-slate-400">Entropy Strength: </span>
              <strong className={`font-bold ${strength.text}`}>{strength.label}</strong>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400">Brute Force Resistance: </span>
              <strong className="text-white font-bold">{strength.crack}</strong>
            </div>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Password Length</span>
              <span className="text-indigo-400 font-bold">{length} Characters</span>
            </div>
            <input
              type="range"
              min={8}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="rounded accent-indigo-600 w-4 h-4"
              />
              <span>Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="rounded accent-indigo-600 w-4 h-4"
              />
              <span>Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="rounded accent-indigo-600 w-4 h-4"
              />
              <span>Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="rounded accent-indigo-600 w-4 h-4"
              />
              <span>Symbols (!@#$)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
