import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuroraButton from '../section/AuroraButton';
import Reveal from './Reveal';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('https://server-pearl-delta.vercel.app/projects') // Adjust API URL as needed
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error("Error fetching projects:", err));
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6" id='portfolio'>
            <div className="text-center py-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-6xl font-bold text-purple-500 mb-4"
                >
                    My Project
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
            <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {projects.map(project => (
                    <motion.div
                    initial={{ opacity: 0, x: -70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                        key={project._id}
                        className="relative p-[0.9px] rounded-lg"
                        style={{
                            background: "linear-gradient(145deg, #33a310, #05b55a)",
                            boxShadow: "0 px 30px rgba(16, 201, 53, 0)",
                            borderRadius: "10px",
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 40px rgba(16, 201, 59, 0.3)",
                        }}
                    >
                        <div
                            style={{
                                background: "#20204f",
                                borderRadius: "10px",
                                padding: "2px",
                                height: "400px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#fff",
                            }}
                        >
                            <Reveal>
                            <div className='flex flex-col p-3'>
                                <img src={project.image} alt={project.name} className="rounded-md w-full h-48 object-cover mb-4" />
                                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                                <p className="text-gray-400 mt-2 text-base">{project.description}</p>
                            </div>
                             </Reveal>
                            <div className='flex gap-32  overflow-x-hidden'>

                                <div>
                                    <a href={project.github}  >  
                                       <AuroraButton  > Live Site </AuroraButton>
                                    </a>
                                </div>
                                <div>
                                    <a href={`/project/${project._id}`} >
                                        <AuroraButton  >View More</AuroraButton>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Projects;
