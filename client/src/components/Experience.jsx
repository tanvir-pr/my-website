import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { site } from "../data/site";

const Experience = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="education" className="relative w-full overflow-hidden">
      <div className="section-shell !py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8"
        >
          <p className="section-eyebrow">Background</p>
          <h2 className="section-title">Education & activities</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-card p-6 md:p-8 text-left border-l-2 border-[var(--accent-color)]"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-color)] font-semibold">
              {site.education.period}
            </p>
            <h3 className={`mt-2 text-2xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              {site.education.degree}
            </h3>
            <p className="mt-2 text-[var(--text-secondary)]">{site.education.school}</p>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{site.education.detail}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-card p-6 md:p-8 text-left space-y-5"
          >
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Certification
              </h3>
              {site.certifications.map((c) => (
                <p key={c.title} className="mt-2 text-[var(--text-secondary)]">
                  {c.title} · {c.org}
                </p>
              ))}
            </div>
            <div className="h-px bg-[var(--border-color)]" />
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Activities
              </h3>
              <ul className="mt-2 space-y-2 text-[var(--text-secondary)]">
                {site.activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
