import React from "react";
import profilepic from "../assets/profpic.png";

import ShinyEffect from "./ShinyEffect";
import { skills } from "../section/db";
import FlipDiv from "../section/FlipDiv";
import {
    AiOutlineGithub,
    AiOutlineInstagram,
    AiOutlineLink,
    AiOutlineLinkedin,
} from "react-icons/ai";
import {
    DiCss3,
    DiHtml5,
    DiJavascript1,
    DiNodejsSmall,
    DiReact,
} from "react-icons/di";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Marquee from "../section/Marquee";
import AuroraButton from "../section/AuroraButton";
import ShinyButton from "../section/ShinyButton";



const AboutMe = () => {
    return (
        <section className="relative flex size-full items-center justify-center" id="about">
            <div>
            
            </div>
            <div className="mt-24 max-w-[1200px] mx-auto relative">
            <div className="text-center py-16">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-6xl font-bold text-purple-500 mb-4"
            >
                About Me
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-lg md:text-2xl text-gray-300"
            >
                ✨ Transforming ideas into digital experiences ✨
            </motion.p>
        </div>
                <div className="grid md:grid-cols-2 place-items-center gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >


                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-gray-200 md:text-7xl text-3xl font-bold tracking-tight mb-4"
                        >
                            Specially i am  <br />
                            <span className="text-purple-500">Frontend
                                Developer</span>
                        </motion.p>




                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 1 }}
                            className="text-gray-300 max-w-[300px] md:max-w-[500px] md:text-2xl text-lg mb-6"
                        >
                            A Computer Network and Telecommunications student passionate about Front-End development. I specialize in crafting engaging digital experiences and consistently strive to deliver the best solutions in every project
                        </motion.p>

                        <motion.div

                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 1.5 }}
                            className="flex flex-col gap-6 my-4 md:mb-0"
                        >
                            <div className="flex flex-row items-center gap-6 my-4 md:mb-0">
                                <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)" }}
                                    className="z-10 cursor-pointer font-bold text-gray-200 md:w-auto border
                                     border-purple-400 rounded-xl"
                                >
                                    <ShinyButton>Dwonload Cv</ShinyButton>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)" }}
                                    className="z-10 cursor-pointer font-bold text-gray-200 md:w-auto border
                                     border-purple-400 rounded-xl"
                                >
                                    <ShinyButton>View Project</ShinyButton>
                                </motion.button>
                            </div>
                        </motion.div>


                    </motion.div>


                    <motion.img
                        src={profilepic}
                        className="w-[300px] md:w-[450px]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 2 }}
                    className="flex flex-row text-7xl px-12 w-full justify-center items-center"
                >
                    <div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                        <div></div>
                        <div></div>
                    </div>

                </motion.div>

                <div className="absolute inset-0 hidden md:block">
                    <ShinyEffect left={0} top={0} size={1400} />
                </div>

            </div>
            </section>
    )
}

export default AboutMe
