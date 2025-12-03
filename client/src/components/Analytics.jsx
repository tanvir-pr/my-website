import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../utils/analytics";

/**
 * Analytics component - initializes GA4 and tracks page views
 * Add to your root layout (e.g., App.jsx or layout wrapper)
 */
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

  return null;
};

export default Analytics;
