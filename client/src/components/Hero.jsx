import React from "react";
import profilepic from "../assets/profpic.png";
import { motion } from "framer-motion";
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import Marquee from "../section/Marquee";
import ShinyButton from "../section/ShinyButton";
import Home from "./Home";
import { useTheme } from "../context/ThemeContext";
import { site } from "../data/site";

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="home" className="relative w-full max-w-full overflow-hidden pt-24">
      <Home />
      <div className="section-shell !pt-8 !pb-10 relative z-10">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] place-items-center gap-10 md:gap-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5 text-left w-full"
          >
            <motion.p variants={itemVariants} className="section-eyebrow">
              {site.location} · {site.availability.split("·")[0].trim()}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className={`font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-semibold text-[var(--accent-color)]"
            >
              {site.role}
              <span className={`font-normal ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {" "}
                · {site.secondaryRole}
              </span>
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`max-w-xl text-base md:text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {site.headline}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <ShinyButton href={site.cvUrl} download={site.cvFilename}>
                Download CV
              </ShinyButton>
              <ScrollLink to="work" smooth offset={-70} duration={500}>
                <span className="inline-flex cursor-pointer rounded-xl border border-[var(--border-color)] px-6 py-3 text-sm font-medium transition hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]">
                  View selected work
                </span>
              </ScrollLink>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--accent-color)]"
              >
                Email me
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-5 text-2xl pt-2">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition hover:text-[var(--accent-color)] hover:scale-110"
              >
                <AiOutlineGithub />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition hover:text-[var(--accent-color)] hover:scale-110"
              >
                <AiOutlineLinkedin />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="transition hover:text-[var(--accent-color)] hover:scale-110"
              >
                <AiOutlineMail />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative w-full max-w-[22rem]"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,var(--accent-glow),transparent_55%)] blur-2xl opacity-50" />
            <div className="relative z-10 overflow-hidden rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <img
                src={profilepic}
                alt={site.name}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <Marquee />
    </section>
  );
};

export default Hero;
