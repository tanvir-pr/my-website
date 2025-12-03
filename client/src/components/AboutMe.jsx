import React from "react";
import { motion } from "framer-motion";
import ShinyButton from "../section/ShinyButton";
import { useTheme } from "../context/ThemeContext";
import { site } from "../data/site";

const AboutMe = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="about" className="relative w-full overflow-hidden">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-10"
        >
          <p className="section-eyebrow">About</p>
          <h2 className="section-title">Building models that ship as products</h2>
          <p className="section-lead">
            CSE path, GenAI focus, and production web experience — one story for recruiters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-left"
          >
            {site.about.map((paragraph) => (
              <p
                key={paragraph}
                className={`text-base md:text-lg leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {paragraph}
              </p>
            ))}
            <p className="text-sm text-[var(--accent-color)] font-medium pt-2">
              {site.availability}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <ShinyButton href={site.cvUrl} download={site.cvFilename}>
                Download CV
              </ShinyButton>
              <ShinyButton href={`mailto:${site.email}`}>Contact</ShinyButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-card p-6 md:p-8 text-left space-y-5"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-color)] font-semibold">
                Education
              </p>
              <h3 className={`mt-2 text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                {site.education.degree}
              </h3>
              <p className="text-[var(--text-secondary)] mt-1">{site.education.school}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                {site.education.period} · {site.education.detail}
              </p>
            </div>
            <div className="h-px bg-[var(--border-color)]" />
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-color)] font-semibold">
                Certification
              </p>
              {site.certifications.map((c) => (
                <p key={c.title} className="mt-2 text-[var(--text-primary)]">
                  {c.title}
                  <span className="text-[var(--text-secondary)]"> · {c.org}</span>
                </p>
              ))}
            </div>
            <div className="h-px bg-[var(--border-color)]" />
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-color)] font-semibold">
                Activities
              </p>
              <ul className="mt-2 space-y-1 text-[var(--text-secondary)]">
                {site.activities.map((a) => (
                  <li key={a}>· {a}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
