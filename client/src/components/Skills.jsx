import React from "react";
import { motion } from "framer-motion";
import {
  DiHtml5,
  DiCss3,
  DiSass,
  DiBootstrap,
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiMongodb,
  DiGithubBadge,
} from "react-icons/di";
import Reveal from "./Reveal";

const skills = [
  { name: "HTML", icon: <DiHtml5 />, color: "from-orange-500 to-yellow-500" },
  { name: "CSS", icon: <DiCss3 />, color: "from-blue-500 to-cyan-500" },
  { name: "Sass", icon: <DiSass />, color: "from-pink-500 to-red-500" },
  { name: "Bootstrap", icon: <DiBootstrap />, color: "from-purple-500 to-indigo-500" },
  { name: "JavaScript", icon: <DiJavascript1 />, color: "from-yellow-500 to-orange-500" },
  { name: "React", icon: <DiReact />, color: "from-blue-400 to-blue-600" },
  { name: "Node.js", icon: <DiNodejsSmall />, color: "from-green-500 to-lime-500" },
  { name: "MongoDB", icon: <DiMongodb />, color: "from-green-600 to-green-800" },
  { name: "GitHub", icon: <DiGithubBadge />, color: "from-gray-500 to-gray-700" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const Skills = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0b1a] text-white py-16 px-6">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text"
      >
        My Skills
      </motion.h2>
      
      <p className="text-center text-gray-400 mt-2">
        Explore the technologies I use in development.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 max-w-4xl">
        {skills.map((skill, index) => (
         
          <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: -50 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
            key={index}
            variants={cardVariants}
            // initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ scale: 1.1 }}
            className={`group relative bg-gradient-to-br ${skill.color} p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-transform`}
          >
            <Reveal>
            <div className="absolute inset-0 bg-black opacity-40 rounded-2xl group-hover:opacity-10 transition"></div>
            <div className="text-4xl relative z-10">{skill.icon}</div>
            <span className="mt-2 font-semibold text-lg relative z-10">{skill.name}</span>
            </Reveal>
          </motion.div>
         
        ))}
      </div>
    </div>
  );
};

export default Skills;
