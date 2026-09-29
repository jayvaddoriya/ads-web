"use client";

import React, { useState, useMemo } from "react";
import { FileText, Copy, Check, Clock, Volume2, Sparkles, Trash2 } from "lucide-react";

export default function TextAnalyzer() {
  const [text, setText] = useState(
    "OmniPulse is a high-speed productivity and financial analytics suite engineered for creators, developers, and investors worldwide."
  );
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
      };
    }

    const words = trimmed.split(/\s+/).filter(Boolean).length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    const sentences = trimmed.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = trimmed.split(/\n+/).filter(Boolean).length;

    // Average reading speed: 225 wpm; speaking speed: 130 wpm
    const readingTimeMinutes = Math.ceil(words / 225);
    const speakingTimeMinutes = Math.ceil(words / 130);

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
    };
  }, [text]);

  const handleTransform = (type: "upper" | "lower" | "title" | "sentence" | "slug") => {
    if (!text) return;
    let transformed = text;
    if (type === "upper") {
      transformed = text.toUpperCase();
    } else if (type === "lower") {
      transformed = text.toLowerCase();
    } else if (type === "title") {
      transformed = text
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    } else if (type === "sentence") {
      transformed = text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    } else if (type === "slug") {
      transformed = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    setText(transformed);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="text" className="rounded-3xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Smart Text &amp; Word Density Analyzer
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Real-time character counters, reading duration estimates, and fast case transformations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setText("")}
            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors border border-slate-800"
            title="Clear text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 my-6">
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Words</span>
          <h3 className="text-xl font-black text-white mt-0.5">{stats.words}</h3>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Characters</span>
          <h3 className="text-xl font-black text-white mt-0.5">{stats.charsWithSpaces}</h3>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">No Spaces</span>
          <h3 className="text-xl font-black text-white mt-0.5">{stats.charsNoSpaces}</h3>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Sentences</span>
          <h3 className="text-xl font-black text-white mt-0.5">{stats.sentences}</h3>
        </div>
        <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-900/50 text-center flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Read Time</span>
          </span>
          <h3 className="text-lg font-black text-cyan-300 mt-0.5">
            ~{stats.readingTimeMinutes} min
          </h3>
        </div>
        <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-900/50 text-center flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            <span>Speak Time</span>
          </span>
          <h3 className="text-lg font-black text-indigo-300 mt-0.5">
            ~{stats.speakingTimeMinutes} min
          </h3>
        </div>
      </div>

      {/* Editor Box */}
      <div className="space-y-4">
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write your article, copy, or essay here..."
          className="w-full p-4 text-sm rounded-2xl border border-slate-800 bg-slate-950 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500 outline-none resize-y"
        />

        {/* Transformation Tools */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transform:</span>
          </span>
          <button
            onClick={() => handleTransform("upper")}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => handleTransform("lower")}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            lowercase
          </button>
          <button
            onClick={() => handleTransform("title")}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            Title Case
          </button>
          <button
            onClick={() => handleTransform("sentence")}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            Sentence case
          </button>
          <button
            onClick={() => handleTransform("slug")}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            url-slug
          </button>
        </div>
      </div>
    </div>
  );
}
