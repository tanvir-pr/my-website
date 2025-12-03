import React from "react";
import profilepic from "../assets/profpic.png";
import { TypeAnimation } from "react-type-animation";
import ShinyEffect from "./ShinyEffect";
import { motion } from "framer-motion";
import { AiOutlineGithub, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import Marquee from "../section/Marquee";
import AuroraButton from "../section/AuroraButton";
import ShinyButton from "../section/ShinyButton";
import Home from "./Home";
// import ParticlesBackground from "../section/ParticlesBackground";

const Hero = () => {
  return (
    <div id="home" >
     
      <Home></Home>
      <div className="mt-24 max-w-[1200px] mx-auto relative">
        <div className="grid md:grid-cols-2 place-items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Hero Text Section */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-gray-200 md:text-6xl text-3xl font-bold tracking-tight mb-2"
            >
              Hey, I am <br />
              <span className="text-purple-500">Tanvir Hasan</span>
            </motion.p>
            <TypeAnimation
              sequence={[
                "Fullstack Developer",
                1000,
                "Web Designer",
                1000,
                "Engineer",
                1000,
              ]}
              speed={50}
              repeat={Infinity}
              className="font-semibold text-gray-400 text-lg md:text-3xl italic mb-4"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="text-gray-300 max-w-[300px] md:max-w-[500px] text-lg md:text-2xl mb-4"
            >
              I am a passionate fullstack developer with over 1 year of experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col gap-6 my-2 md:mb-0"
            >
              {/* Buttons */}
              <div className="flex flex-row items-center gap-6">
                {/* <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
                  }}
                  className="z-10 cursor-pointer font-bold text-gray-200 md:w-auto p-3 border border-purple-400 rounded-xl"
                >
                  Resume
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
                  }}
                  className="z-10 cursor-pointer font-bold text-gray-200 md:w-auto p-3 border border-purple-400 rounded-xl"
                >
                  Contact
                </motion.button> */}
                <div> <ShinyButton>Resume</ShinyButton></div>
                <div><ShinyButton>Contact</ShinyButton></div>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 flex-row text-3xl text-white pb-3">
                <motion.a whileHover={{ scale: 1.2 }} href="#">
                  <AiOutlineGithub />
                </motion.a>

                <motion.a whileHover={{ scale: 1.2 }} href="#">
                  <AiOutlineLinkedin />
                </motion.a>

                <motion.a whileHover={{ scale: 1.2 }} href="#">
                  <AiOutlineInstagram />
                </motion.a>
              </div>
            </motion.div>

            {/* Marquee */}
          
          </motion.div>
        

          {/* Profile Picture */}
          {/* <ParticlesBackground></ParticlesBackground> */}
          {/* <motion.img
            src={profilepic}
            className="w-[300px] md:w-[450px] rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          /> */}
          <h3 className="text-rose-600 text-xl">Particle motion effect working .............</h3>
        </div>

        {/* Shiny Effect */}
        <div className="absolute inset-0 hidden md:block">
          <ShinyEffect left={0} top={0} size={1400} />
        </div>
      </div>
      <Marquee></Marquee>
    </div>
  );
};

export default Hero;
