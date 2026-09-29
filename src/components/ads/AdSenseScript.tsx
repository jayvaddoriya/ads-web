"use client";

import Script from "next/script";
import { ADSENSE_CONFIG } from "@/config/adsense.config";

export default function AdSenseScript() {
  if (ADSENSE_CONFIG.isTestMode || !ADSENSE_CONFIG.client || ADSENSE_CONFIG.client.includes("0000000000000000")) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.client}`}
    />
  );
}
