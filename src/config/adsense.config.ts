/**
 * Google AdSense Configuration
 * 
 * Replace 'client' with your actual Google AdSense publisher ID (e.g., 'ca-pub-1234567890123456')
 * and update the slot IDs with your Google AdSense dashboard ad units.
 * 
 * When 'isTestMode' is true:
 * - Attractive, responsive placeholder ads are shown with mock sponsored content
 * - Allows testing CTR, responsive design, and layout shifts without risking AdSense policy violations
 * 
 * When 'isTestMode' is false:
 * - Real Google AdSense tags (<ins class="adsbygoogle">) and scripts are executed.
 */

export interface AdSenseConfig {
  client: string;
  isTestMode: boolean;
  slots: {
    headerLeaderboard: string;
    stickyAnchor: string;
    sidebarSkyscraper: string;
    inFeedNative: string;
    toolResultBanner: string;
    articleMidContent: string;
  };
}

export const ADSENSE_CONFIG: AdSenseConfig = {
  // Set your actual Google AdSense Publisher ID here (starts with 'ca-pub-')
  client: "ca-pub-0000000000000000",
  
  // Set to false when your AdSense account is approved and you want to serve live ads
  isTestMode: true,

  // Replace with slot IDs created in your Google AdSense console
  slots: {
    headerLeaderboard: "1001001001",
    stickyAnchor: "2002002002",
    sidebarSkyscraper: "3003003003",
    inFeedNative: "4004004004",
    toolResultBanner: "5005005005",
    articleMidContent: "6006006006",
  },
};
