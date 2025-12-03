import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import BackgroundEffect from "./BackgroundEffect";
import profilepic from "../assets/profpic.png";
import {
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaTiktok,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const socialLinks = [
  {
    icon: FaLinkedin,
    name: "LinkedIn",
    handle: "@tanvir-pr",
    url: "https://linkedin.com/in/tanvir-pr",
    color: "from-blue-600 to-blue-400",
    hoverGlow: "group-hover:shadow-blue-500/50",
  },
  {
    icon: FaInstagram,
    name: "Instagram",
    handle: "@tanvir-pr",
    url: "https://instagram.com/tanvir-pr",
    color: "from-pink-500 via-purple-500 to-orange-400",
    hoverGlow: "group-hover:shadow-pink-500/50",
  },
  {
    icon: FaYoutube,
    name: "YouTube",
    handle: "@tanvir-pr",
    url: "https://youtube.com/@tanvir-pr",
    color: "from-red-600 to-red-400",
    hoverGlow: "group-hover:shadow-red-500/50",
  },
  {
    icon: FaGithub,
    name: "GitHub",
    handle: "@tanvir-pr",
    url: "https://github.com/tanvir-pr",
    color: "from-gray-700 to-gray-900",
    hoverGlow: "group-hover:shadow-gray-500/50",
  },
  {
    icon: FaTiktok,
    name: "TikTok",
    handle: "@tanvir-pr",
    url: "https://tiktok.com/@tanvir-pr",
    color: "from-cyan-400 to-pink-500",
    hoverGlow: "group-hover:shadow-cyan-500/50",
  },
];

// Update with your real email
const EMAIL = "tanvir@example.com";

const ContactPage = () => {
  const { theme, backgroundEffect } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${
        isDark ? "bg-[#0d0b1a]" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      {backgroundEffect && <BackgroundEffect />}
      <Navbar />
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-24 left-6 z-20"
      >
        <Link to="/">
          <motion.div
            whileHover={{ x: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              isDark ? "bg-[#16132a] text-gray-300" : "bg-white text-gray-700 shadow-lg"
            } border border-purple-500/20`}
          >
            <FaArrowLeft className="text-purple-400" />
            <span className="font-medium">Back to Home</span>
          </motion.div>
        </Link>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 mb-4"
          >
            Let's Connect
          </motion.span>
          <h1
            className={`text-4xl md:text-6xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Touch</span>
          </h1>
          <p
            className={`text-lg max-w-xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            I'd love to hear from you. Connect with me on social media or send an email.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative overflow-hidden rounded-3xl p-8 md:p-12 mb-12 ${
            isDark ? "bg-[#16132a]" : "bg-white"
          } shadow-2xl border border-purple-500/10`}
        >
          {/* Gradient overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="flex-shrink-0"
            >
              <img
                src={profilepic}
                alt="Tanvir Hasan"
                className="w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover shadow-xl ring-4 ring-purple-500/20"
              />
            </motion.div>
            <div className="text-center md:text-left flex-1">
              <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Tanvir Hasan
              </h2>
              <p className="text-purple-400 font-medium mb-2">Fullstack Developer & Web Designer</p>
              <p
                className={`text-base leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                A Computer Network and Telecommunications student passionate about Front-End development.
                I specialize in crafting engaging digital experiences with React, Node.js, and modern web technologies.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Email Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="block group"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-6 p-6 rounded-2xl ${
                isDark ? "bg-[#16132a]" : "bg-white"
              } border border-purple-500/20 shadow-lg hover:shadow-purple-500/20 transition-all`}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition">
                <FaEnvelope className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Email me directly
                </p>
                <p className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} group-hover:text-purple-400 transition`}>
                  {EMAIL}
                </p>
              </div>
              <span className="text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Click to compose →
              </span>
            </motion.div>
          </a>
        </motion.div>

        {/* Social Media Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className={`text-xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
            Connect on Social Media
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex items-center gap-4 p-5 rounded-2xl ${
                  isDark ? "bg-[#16132a]" : "bg-white"
                } border border-purple-500/10 shadow-lg hover:shadow-xl ${social.hoverGlow} transition-all`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white text-xl shadow-lg`}
                >
                  <social.icon />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {social.name}
                  </p>
                  <p className="text-sm text-purple-400">{social.handle}</p>
                </div>
                <span className="text-gray-500 group-hover:text-purple-400 transition text-sm">
                  Visit →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className={`mb-6 ${isDark ? "text-gray-500" : "text-gray-600"}`}>
            Prefer to send a message? Scroll down on the homepage.
          </p>
          <Link to="/#contact">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
            >
              Go to Contact Form
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
