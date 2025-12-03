import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { API_BASE } from "../data/site";

const Certificates = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/certificates`)
      .then((res) => res.json())
      .then((data) => setCertificates(data.certificates || []))
      .catch(() => setCertificates([]));
  }, []);

  if (!certificates.length) return null;

  return (
    <section id="certificates" className="relative w-full overflow-hidden">
      <div className="section-shell !py-14">
        <div className="mb-8 text-left">
          <p className="section-eyebrow">Credentials</p>
          <h2 className="section-title">Certifications</h2>
          <p className="section-lead">Validated learning alongside shipped projects.</p>
        </div>

        <div
          className={`grid gap-3.5 ${
            certificates.length === 1
              ? "max-w-md"
              : certificates.length === 2
                ? "sm:grid-cols-2 max-w-3xl"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {certificates.map((cert, index) => {
            const card = (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="panel-card !min-h-0 group"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-color)]">
                  {cert.year || "Certificate"}
                </p>
                <h3 className={`mt-3 text-base font-semibold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  {cert.title}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{cert.org}</p>
              </motion.div>
            );

            return cert.url ? (
              <a key={cert.id} href={cert.url} target="_blank" rel="noreferrer">
                {card}
              </a>
            ) : (
              <div key={cert.id}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
