"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyAnchorAd from "@/components/ads/StickyAnchorAd";
import { Mail, Send, CheckCircle2, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Feedback & Suggestions",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4" />
          <span>Support &amp; Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Contact the OmniPulse Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-10">
          Have an advertising inquiry, bug report, or idea for a new calculator? Send us a message and our team will get back to you within 24 hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Direct Channels</h3>
              
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Editorial &amp; Ads</strong>
                  <span>ads@omnipulse-tools.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <MessageSquare className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">General Support</strong>
                  <span>support@omnipulse-tools.com</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
              <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                Advertising Partnerships
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                For custom programmatic ad placements, direct sponsorship banners, or high-intent affiliate integration, please specify &quot;Advertising&quot; in the subject.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Received!</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you for reaching out. A representative will review your message and reply to {formData.email} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "Feedback & Suggestions", message: "" });
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option>Feedback &amp; Suggestions</option>
                      <option>Advertising &amp; Sponsorship</option>
                      <option>Report a Bug / Calculation Error</option>
                      <option>Business Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you today?"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <StickyAnchorAd />
    </div>
  );
}
