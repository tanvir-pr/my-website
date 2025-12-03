import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineGithub, AiOutlineArrowRight } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";
import { API_BASE, mediaUrl, site } from "../data/site";

/** 12-col grid: 4 small · 3 medium · 2 large · 1 XL full row — same math from sm+ */
const sizeClass = {
  sm: "col-span-12 sm:col-span-3",
  md: "col-span-12 sm:col-span-4",
  lg: "col-span-12 sm:col-span-6",
  xl: "col-span-12",
};

const mediaAspect = {
  sm: "aspect-[16/10]",
  md: "aspect-[16/10]",
  lg: "aspect-[16/9]",
  xl: "aspect-[21/9] sm:aspect-[24/9]",
};

const ProjectCard = ({ project, index, theme }) => {
  const isDark = theme === "dark";
  const stack = Array.isArray(project.stack) ? project.stack : [];
  const cardSize = sizeClass[project.card_size] ? project.card_size : "md";
  const size = sizeClass[cardSize];
  const aspect = mediaAspect[cardSize];
  const cover = mediaUrl(project.image_url);
  const github =
    project.github_url && project.github_url !== "#" ? project.github_url : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative overflow-hidden surface-card text-left ${size}`}
    >
      <Link to={`/project/${project.id}`} className="absolute inset-0 z-10" aria-label={project.title} />

      <div className={`relative overflow-hidden bg-[var(--bg-tertiary)] ${aspect}`}>
        {cover ? (
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-end bg-[linear-gradient(160deg,#1a1d2b_0%,#0d1018_55%,#151028_100%)] p-5">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
              {project.is_featured ? "Featured" : "Case study"}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-0 p-5">
        <h3 className={`text-lg font-semibold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
          {project.title}
        </h3>
        {project.description ? (
          <p className={`mt-2 line-clamp-2 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {project.description}
          </p>
        ) : null}

        {stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stack.slice(0, 4).map((tag) => (
              <span key={tag} className="skill-chip">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border-color)] pt-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-color)]">
            Details <AiOutlineArrowRight />
          </span>
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-20 inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent-color)]"
            >
              <AiOutlineGithub />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
};

const isPlaceholderProject = (project) => {
  const title = (project.title || "").trim();
  if (/^project slot\b/i.test(title)) return true;
  if (!title) return true;
  const hasBody =
    Boolean(project.description?.trim()) ||
    Boolean(project.about?.trim()) ||
    (Array.isArray(project.stack) && project.stack.length > 0) ||
    Boolean(project.image_url?.trim());
  return !hasBody && /^project\s*\d*$/i.test(title);
};

const Portfolio = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setProjects(data.projects || []);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProjects = projects.filter((p) => !isPlaceholderProject(p));

  return (
    <section id="work" className="relative w-full overflow-hidden">
      <div className="section-shell">
        <div className="mb-9 text-left">
          <p className="section-eyebrow">Selected work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-lead">A few builds that show product thinking and technical depth.</p>
        </div>

        {status === "loading" && (
          <div className="grid grid-cols-12 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="col-span-12 h-64 animate-pulse surface-card sm:col-span-4" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="surface-card p-8 text-[var(--text-secondary)]">
            Couldn’t load projects. Start the API on port 4000.
          </div>
        )}

        {status === "ready" && (
          <>
            {visibleProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                  {visibleProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} theme={theme} />
                  ))}
                </div>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-between gap-4 rounded-[1.15rem] border border-[var(--border-color)] bg-[color-mix(in_srgb,var(--surface)_96%,transparent)] px-5 py-4 transition hover:border-[var(--accent-color)]"
                >
                  <div className="text-left">
                    <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      More on GitHub
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">Experiments and work-in-progress.</p>
                  </div>
                  <AiOutlineGithub className="shrink-0 text-xl text-[var(--text-secondary)]" />
                </a>
              </>
            ) : (
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="surface-card flex items-center justify-between gap-4 p-6 md:p-7 transition hover:border-[var(--accent-color)]"
              >
                <div className="text-left">
                  <p className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Case studies coming next
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
                    Featured builds are being prepared. Recent experiments already live on GitHub.
                  </p>
                </div>
                <AiOutlineGithub className="shrink-0 text-2xl text-[var(--text-secondary)]" />
              </a>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
