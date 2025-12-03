/**
 * Google Analytics 4 integration
 * Add VITE_GA_MEASUREMENT_ID to your .env file (e.g., G-XXXXXXXXXX)
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;

export const initAnalytics = () => {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "YOUR_GA_ID") {
    if (import.meta.env.DEV) {
      console.info("[Analytics] GA4 disabled - add VITE_GA_MEASUREMENT_ID to .env");
    }
    return;
  }

  if (typeof window === "undefined" || isInitialized) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });

  isInitialized = true;
};

export const trackPageView = (path, title) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path || window.location.pathname,
    page_title: title || document.title,
  });
};

export const trackEvent = (eventName, params = {}) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", eventName, params);
};

// Predefined events for common interactions
export const analyticsEvents = {
  contactFormSubmit: () => trackEvent("contact_form_submit"),
  projectView: (projectName) => trackEvent("view_project", { project_name: projectName }),
  resumeDownload: () => trackEvent("resume_download"),
  socialClick: (platform) => trackEvent("social_click", { platform }),
};
