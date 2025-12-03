import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineGithub, AiOutlineLink, AiOutlineArrowLeft } from "react-icons/ai";
import { API_BASE, mediaUrl } from "../data/site";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/projects/${id}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Not found");
        if (!cancelled) setProject(data.project);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0d14] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-[#7c6cff]">
            <AiOutlineArrowLeft /> Back
          </Link>
          <p className="mt-8 text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0d14] text-gray-400">
        Loading project...
      </div>
    );
  }

  const stack = Array.isArray(project.stack) ? project.stack : [];
  const gallery = Array.isArray(project.gallery) ? project.gallery.filter(Boolean) : [];
  const cover = mediaUrl(project.image_url);
  const pictures = [...(cover ? [cover] : []), ...gallery.map((url) => mediaUrl(url)).filter(Boolean)].filter(
    (url, index, arr) => arr.indexOf(url) === index
  );
  const live = project.site_url && project.site_url !== "#" ? project.site_url : null;
  const github = project.github_url && project.github_url !== "#" ? project.github_url : null;

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white">
      <div className="mx-auto max-w-4xl px-5 py-10 md:py-16">
        <Link to="/#work" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#7c6cff]">
          <AiOutlineArrowLeft /> Back to work
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          {project.is_featured && (
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#7c6cff]">Featured project</p>
          )}
          <h1 className="font-display text-3xl font-bold md:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#7c6cff] px-4 py-2.5 text-sm font-medium"
              >
                <AiOutlineLink /> Live site
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm"
              >
                <AiOutlineGithub /> GitHub
              </a>
            )}
          </div>
        </motion.div>

        <section className="mt-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c6cff]">Pictures</h2>
          {pictures.length ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {pictures.map((src, index) => (
                <motion.div
                  key={`${src}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={`overflow-hidden rounded-2xl border border-white/10 bg-[#12141c] ${
                    index === 0 && pictures.length > 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt={`${project.title} ${index + 1}`}
                    className={`w-full object-cover ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-[#12141c] px-5 py-10 text-center text-sm text-gray-500">
              No pictures yet — drop images from /owner → Projects.
            </div>
          )}
        </section>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-[#12141c] p-6 md:p-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c6cff]">About</h2>
            <p className="mt-3 whitespace-pre-wrap text-[0.95rem] leading-relaxed text-gray-300">
              {project.about || "No about text yet — add it from /owner."}
            </p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-[#12141c] p-6 md:p-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c6cff]">What it does</h2>
            <p className="mt-3 whitespace-pre-wrap text-[0.95rem] leading-relaxed text-gray-300">
              {project.role_text || "No role / purpose yet — add it from /owner."}
            </p>
          </section>
        </div>

        <section className="mt-4 rounded-2xl border border-white/10 bg-[#12141c] p-6 md:p-7">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c6cff]">Tech stack</h2>
          {stack.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((tag) => (
                <span key={tag} className="skill-chip !text-[0.8rem] !text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-500">No stack tags yet.</p>
          )}
        </section>

        {project.highlights && (
          <section className="mt-4 rounded-2xl border border-white/10 bg-[#12141c] p-6 md:p-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c6cff]">Highlights</h2>
            <p className="mt-3 whitespace-pre-wrap text-[0.95rem] leading-relaxed text-gray-300">{project.highlights}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
