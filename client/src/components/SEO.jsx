import { useEffect } from "react";

const defaultMeta = {
  title: "Tanvir Hasan | AI/ML Engineer",
  description:
    "CSE student in Budapest targeting junior AI/ML roles. GenAI, RAG, and LLM apps — plus 2+ years shipping React/Node full-stack products.",
  image: "/og-image.png",
  url: "https://tanvirhasan.com",
  siteName: "Tanvir Hasan Portfolio",
  twitterHandle: "@tanvir-pr",
  type: "website",
  keywords:
    "AI/ML Engineer, GenAI, RAG, PyTorch, Machine Learning, Full-Stack, React, Tanvir Hasan, Budapest",
};

const SEO = ({
  title = defaultMeta.title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.url,
  siteName = defaultMeta.siteName,
  twitterHandle = defaultMeta.twitterHandle,
  type = defaultMeta.type,
  keywords = defaultMeta.keywords,
} = {}) => {
  const fullUrl = url.startsWith("http") ? url : `${defaultMeta.url}${url}`;
  const fullImage = image.startsWith("http") ? image : `${defaultMeta.url}${image}`;

  useEffect(() => {
    document.title = title;

    const setMeta = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", fullImage);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:site_name", siteName);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullImage);
    setMeta("name", "twitter:creator", twitterHandle);

    let jsonLd = document.getElementById("person-jsonld");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.id = "person-jsonld";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Tanvir Hasan",
      jobTitle: "AI/ML Engineer",
      email: "mailto:tanvirhasaneror@gmail.com",
      url: fullUrl,
      address: { "@type": "PostalAddress", addressLocality: "Budapest", addressCountry: "HU" },
      sameAs: [
        "https://github.com/tanvir-pr",
        "https://www.linkedin.com/in/tanvir-hasan",
      ],
    });
  }, [title, description, fullImage, fullUrl, siteName, type, keywords, twitterHandle]);

  return null;
};

export default SEO;
export { defaultMeta };
