import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-opacity-70 backdrop-blur-md z-50">
      <div className="mx-auto flex justify-between text-gray-200 text-xl items-center px-12 h-20">
        <a href="#">Tanvir H </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-12 cursor-pointer relative">
          {["home", "about", "portfolio", "contact"].map((section) => (
            <li key={section} className="relative">
              <Link
                to={section}
                smooth={true}
                offset={-50}
                duration={500}
                onSetActive={() => setActiveSection(section)}
                className={`relative transition duration-300 ${
                  activeSection === section ? "text-purple-400" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
              {/* Moving Underline */}
              {activeSection === section && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-purple-400 rounded-full"
                />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div onClick={toggleNav} className="md:hidden z-50 text-gray-200">
          {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>

        {/* Mobile Menu */}
        {nav && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ stiffness: 20, damping: 15 }}
            className="fixed left-0 top-0 w-full min-h-screen bg-gray-900 z-40 flex flex-col items-center pt-20"
          >
            <ul className="font-semibold text-4xl space-y-8 text-center">
              {["home", "skills", "portfolio", "contact"].map((section) => (
                <li key={section}>
                  <Link
                    to={section}
                    onClick={() => {
                      closeNav();
                      setActiveSection(section);
                    }}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    className={`transition duration-300 ${
                      activeSection === section ? "text-purple-400" : ""
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
