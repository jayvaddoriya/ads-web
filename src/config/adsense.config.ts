/**
 * Google AdSense Configuration
 * 
 * Configured with active publisher ID: ca-pub-1539263458228927
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
  // Your verified Google AdSense Publisher ID
  client: "ca-pub-1539263458228927",
  
  // Set to false to enable real Google AdSense scripts & tags
  isTestMode: false,

  // Replace with custom slot IDs when created in your AdSense dashboard
  slots: {
    headerLeaderboard: "1001001001",
    stickyAnchor: "2002002002",
    sidebarSkyscraper: "3003003003",
    inFeedNative: "4004004004",
    toolResultBanner: "5005005005",
    articleMidContent: "6006006006",
  },
};
