import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import { MdOutlineBlurOn, MdOutlineBlurOff } from "react-icons/md";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { site } from "../data/site";

const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certs" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme, backgroundEffect, toggleBackgroundEffect } = useTheme();
  const isDark = theme === "dark";

  const closeNav = () => setNav(false);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 border-b border-[var(--border-color)] bg-[color-mix(in_srgb,var(--bg-primary)_78%,transparent)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-[1120px] items-center justify-between px-4 md:px-6">
        <a href="#home" className={`font-display text-lg md:text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          {site.shortName}
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="relative"
            >
              <Link
                to={item.id}
                smooth
                offset={-70}
                duration={500}
                spy
                onSetActive={() => setActiveSection(item.id)}
                className={`cursor-pointer transition ${
                  activeSection === item.id
                    ? "text-[var(--accent-color)]"
                    : isDark
                      ? "text-gray-300"
                      : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
              {activeSection === item.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-[var(--accent-color)]"
                />
              )}
            </motion.li>
          ))}

          <li>
            <a
              href={site.cvUrl}
              download={site.cvFilename}
              className="rounded-full border border-[var(--border-color)] px-4 py-2 text-sm transition hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
            >
              CV
            </a>
          </li>

          <li>
            <button
              onClick={toggleBackgroundEffect}
              className={`p-2 rounded-full transition ${backgroundEffect ? "text-[var(--accent-color)]" : "text-gray-500"}`}
              aria-label="Toggle background effect"
            >
              {backgroundEffect ? <MdOutlineBlurOn size={18} /> : <MdOutlineBlurOff size={18} />}
            </button>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-[var(--text-secondary)] transition hover:text-[var(--accent-color)]"
              aria-label="Toggle theme"
            >
              {isDark ? <BsSun size={18} /> : <BsMoon size={18} />}
            </button>
          </li>
        </ul>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2" aria-label="Toggle theme">
            {isDark ? <BsSun size={18} /> : <BsMoon size={18} />}
          </button>
          <button onClick={() => setNav(!nav)} className="p-2" aria-label="Menu">
            {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {nav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`md:hidden border-t border-[var(--border-color)] ${isDark ? "bg-[#0b0d14]" : "bg-white"}`}
        >
          <ul className="flex flex-col gap-4 px-6 py-8 text-lg font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  onClick={() => {
                    closeNav();
                    setActiveSection(item.id);
                  }}
                  smooth
                  offset={-70}
                  duration={500}
                  className={activeSection === item.id ? "text-[var(--accent-color)]" : ""}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.cvUrl} download={site.cvFilename} onClick={closeNav}>
                CV
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
