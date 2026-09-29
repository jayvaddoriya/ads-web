"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Palette, 
  Globe, 
  Wifi, 
  Mail, 
  FileText,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import AdBanner from "@/components/ads/AdBanner";
import { ADSENSE_CONFIG } from "@/config/adsense.config";

type QrType = "url" | "wifi" | "email" | "text";

const COLOR_PRESETS = [
  { name: "Midnight", color: "#0f172a" },
  { name: "Indigo", color: "#4f46e5" },
  { name: "Emerald", color: "#059669" },
  { name: "Purple", color: "#7c3aed" },
  { name: "Rose", color: "#e11d48" },
];

export default function QrCodeGenerator() {
  const [qrType, setQrType] = useState<QrType>("url");
  const [urlInput, setUrlInput] = useState("https://omnipulse-tools.com");
  const [wifiSsid, setWifiSsid] = useState("MyHomeNetwork");
  const [wifiPassword, setWifiPassword] = useState("SecurePass123");
  const [wifiAuth, setWifiAuth] = useState("WPA");
  const [emailTo, setEmailTo] = useState("hello@example.com");
  const [plainText, setPlainText] = useState("Scan to connect with OmniPulse!");

  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute final QR payload based on selected type
  const rawQrValue = (() => {
    switch (qrType) {
      case "url":
        return urlInput.startsWith("http") ? urlInput : `https://${urlInput}`;
      case "wifi":
        return `WIFI:S:${wifiSsid};T:${wifiAuth};P:${wifiPassword};;`;
      case "email":
        return `mailto:${emailTo}`;
      case "text":
        return plainText;
      default:
        return urlInput;
    }
  })();

  useEffect(() => {
    if (canvasRef.current && rawQrValue.trim()) {
      QRCode.toCanvas(
        canvasRef.current,
        rawQrValue,
        {
          width: 220,
          margin: 1.5,
          errorCorrectionLevel: errorCorrection,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        },
        (error) => {
          if (error) console.error("QR Code generation error:", error);
        }
      );
    }
  }, [rawQrValue, fgColor, bgColor, errorCorrection]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `omnipulse-qr-${Date.now()}.png`;
    link.href = url;
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawQrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="qr" className="rounded-3xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <QrCode className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Instant Custom QR Code Studio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Generate high-resolution, branded QR codes for URLs, WiFi networks, email contacts, and text.
          </p>
        </div>

        {/* Live Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>HD Scan Ready</span>
        </div>
      </div>

      {/* Type Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-6">
        <button
          onClick={() => setQrType("url")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            qrType === "url"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Website URL</span>
        </button>

        <button
          onClick={() => setQrType("wifi")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            qrType === "wifi"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Wifi className="w-3.5 h-3.5" />
          <span>WiFi Connect</span>
        </button>

        <button
          onClick={() => setQrType("email")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            qrType === "email"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email Address</span>
        </button>

        <button
          onClick={() => setQrType("text")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            qrType === "text"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Plain Text</span>
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Dynamic Content Inputs */}
          {qrType === "url" && (
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Destination Website URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          )}

          {qrType === "wifi" && (
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Password</label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Encryption</label>
                  <select
                    value={wifiAuth}
                    onChange={(e) => setWifiAuth(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="WPA">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {qrType === "email" && (
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Recipient Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          )}

          {qrType === "text" && (
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Raw Text Content</label>
              <textarea
                rows={2}
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-slate-800 bg-slate-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>
          )}

          {/* Color Customization */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
                <span>QR Color Styling</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">{fgColor}</span>
            </div>

            {/* Color Presets */}
            <div className="flex items-center gap-2 pt-1">
              {COLOR_PRESETS.map((p) => (
                <button
                  key={p.color}
                  onClick={() => setFgColor(p.color)}
                  className={`h-7 w-7 rounded-full transition-transform hover:scale-110 flex items-center justify-center border-2 ${
                    fgColor === p.color ? "border-white scale-110 shadow-md shadow-indigo-500/30" : "border-transparent"
                  }`}
                  style={{ backgroundColor: p.color }}
                  title={p.name}
                >
                  {fgColor === p.color && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}

              <div className="h-6 w-px bg-slate-800 mx-1" />

              {/* Custom Color Input */}
              <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer hover:text-white">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-7 w-7 rounded-lg cursor-pointer border border-slate-700 bg-transparent p-0.5"
                />
                <span className="text-[11px]">Custom</span>
              </label>
            </div>
          </div>

          {/* Error Correction & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-2">
              <span>Scan Reliability:</span>
              {(["L", "M", "Q", "H"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setErrorCorrection(lvl)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors ${
                    errorCorrection === lvl
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-950 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setFgColor("#0f172a");
                setBgColor("#ffffff");
              }}
              className="text-[11px] text-slate-500 hover:text-indigo-400 underline"
            >
              Reset Colors
            </button>
          </div>
        </div>

        {/* Right Column: Live QR Preview & Instant Download */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between bg-slate-950/80 border border-slate-800 rounded-3xl p-6 text-center space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Live High-Definition QR Code
            </span>

            {/* QR Canvas Frame */}
            <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl border border-slate-200">
              <canvas ref={canvasRef} className="rounded-lg max-w-[210px] h-auto block" />
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 mt-3 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Camera Scannable &amp; Print Ready</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-2.5 pt-2">
            <button
              onClick={handleDownload}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res PNG</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Payload String"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Sponsored Ad */}
      <AdBanner
        slotId={ADSENSE_CONFIG.slots.inFeedNative}
        format="inFeed"
        className="mt-6"
        customMockTitle="Scale Your Brand with Enterprise Link Management & QR Analytics"
        customMockCta="Get Started Free"
      />
    </div>
  );
}
