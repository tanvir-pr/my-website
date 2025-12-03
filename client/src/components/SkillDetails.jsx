import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { API_BASE } from "../data/site";

const SkillDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setGroup(null);
    setError("");
    fetch(`${API_BASE}/api/skills/groups/${id}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Not found");
        if (!cancelled) setGroup(data.group);
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
          <Link to="/#skills" className="inline-flex items-center gap-2 text-[#7c6cff]">
            <AiOutlineArrowLeft /> Back to skills
          </Link>
          <p className="mt-8 text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0d14] text-gray-400">
        Loading skill...
      </div>
    );
  }

  const topics = group.topics || [];

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(124,108,255,0.16),transparent_65%)]" />

      <div className="relative mx-auto max-w-3xl px-5 py-10 md:py-16">
        <Link
          to="/#skills"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#7c6cff]"
        >
          <AiOutlineArrowLeft /> Back to skills
        </Link>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7c6cff]">
            Skill category
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {group.name}
          </h1>
          {group.summary ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              {group.summary}
            </p>
          ) : null}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="mt-9 rounded-2xl border border-white/10 bg-[#12141c] p-6 md:p-7"
        >
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c6cff]">
            Topics
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.length ? (
              topics.map((topic) => (
                <span key={topic.id} className="skill-chip !text-[0.8rem] !text-white/80">
                  {topic.name}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No topics yet.</p>
            )}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 rounded-2xl border border-white/10 bg-[#12141c] p-6 md:p-7"
        >
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c6cff]">
            Details
          </h2>
          <p className="mt-4 whitespace-pre-wrap text-[0.95rem] leading-relaxed text-gray-300">
            {group.details || "No details yet — edit this from /owner → Skills → Categories."}
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default SkillDetails;
