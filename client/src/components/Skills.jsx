import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { API_BASE } from "../data/site";
import { skillGroups as fallbackGroups, SKILL_GROUP_ORDER } from "../section/db";

const skillsUrl = `${API_BASE}/api/skills`;

const fallbackAsApiShape = fallbackGroups.map((g, index) => ({
  id: index + 1,
  name: g.title,
  summary: g.summary || "",
  details: g.details || "",
  sort_order: index + 1,
  topics: (g.items || []).map((name, i) => ({ id: i, name })),
}));

const Skills = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [groups, setGroups] = useState(fallbackAsApiShape);

  useEffect(() => {
    let cancelled = false;
    fetch(skillsUrl)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data.groups?.length) return;
        const ordered = [...data.groups]
          .filter((g) => g.id)
          .sort((a, b) => {
            const ai = SKILL_GROUP_ORDER.indexOf(a.name);
            const bi = SKILL_GROUP_ORDER.indexOf(b.name);
            const ao = ai === -1 ? 999 : ai;
            const bo = bi === -1 ? 999 : bi;
            return ao - bo || (a.sort_order || 0) - (b.sort_order || 0);
          });
        setGroups(ordered);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="skills" className="relative w-full overflow-hidden">
      <div className="section-shell">
        <div className="mb-9 text-left">
          <p className="section-eyebrow">Stack</p>
          <h2 className="section-title">Skills</h2>
          <p className="section-lead">Eight focused categories — open any box for the full list.</p>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, gi) => (
            <motion.div
              key={group.id || group.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(gi * 0.03, 0.2), duration: 0.35 }}
            >
              <Link to={`/skill/${group.id}`} className="panel-card group">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`text-[0.95rem] font-semibold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                    {group.name}
                  </h3>
                  <span className="text-[10px] tabular-nums text-[var(--text-secondary)] opacity-60">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                  {(group.topics || []).slice(0, 6).map((topic) => (
                    <span key={topic.id || topic.name} className="skill-chip">
                      {topic.name}
                    </span>
                  ))}
                  {(group.topics || []).length > 6 && (
                    <span className="skill-chip opacity-70">+{(group.topics || []).length - 6}</span>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--border-color)] pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)] transition group-hover:text-[var(--accent-color)]">
                  <span>Details</span>
                  <span aria-hidden>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
