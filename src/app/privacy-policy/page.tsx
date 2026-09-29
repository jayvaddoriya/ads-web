import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyAnchorAd from "@/components/ads/StickyAnchorAd";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | OmniPulse",
  description: "OmniPulse Privacy Policy detailing our cookie policies, Google AdSense disclosures, GDPR and CCPA rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Legal &amp; Privacy Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mb-8">Last Updated: September 29, 2026</p>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">1. Overview</h2>
            <p>
              At OmniPulse (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to respecting your digital privacy. This Privacy Policy outlines the types of personal and non-personal data collected when you use our web utilities, calculators, and content platforms, and how that information is utilized.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              2. Google AdSense &amp; Third-Party Advertising
            </h2>
            <p className="mb-2">
              We use third-party advertising companies, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>DoubleClick DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.
              </li>
              <li>
                Users may opt out of the use of the DART cookie by visiting the{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline"
                >
                  Google Ad and Content Network Privacy Policy
                </a>.
              </li>
              <li>
                You can personalize or disable tailored advertising by visiting Google&apos;s{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline"
                >
                  Ads Settings
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              3. Client-Side Data &amp; Tool Calculations
            </h2>
            <p>
              All interactive calculators (including Compound Interest, Mortgage EMI, and Crypto ROI) and utilities (QR Code Generator, Password Vault Studio, JSON Prettifier) operate entirely within your local web browser. We do NOT store, record, transmit, or sell the numbers, passwords, or data you input into our interactive tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              4. Cookies and Web Beacons
            </h2>
            <p>
              Like any modern web application, OmniPulse uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              5. GDPR &amp; CCPA / CPRA Privacy Rights
            </h2>
            <p>
              If you are a resident of the European Economic Area (EEA), United Kingdom, or State of California, you have the right to request access to, rectify, erase, or restrict the processing of your personal data, as well as the right to opt-out of the sale of personal information. If you wish to exercise any of these rights, please contact us via our Contact page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              6. Consent
            </h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <StickyAnchorAd />
    </div>
  );
}
