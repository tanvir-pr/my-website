import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch(`https://server-pearl-delta.vercel.app/projects/${id}`)
            .then(res => res.json())
            .then(data => setProject(data))
            .catch(err => console.error("Error fetching project:", err));
    }, [id]);

    if (!project) return <div className="text-center text-white">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="bg-gray-900 p-6 rounded-xl shadow-lg"
            >
                <img src={project.image} alt={project.name} className="rounded-md w-full h-64 object-cover mb-4" />
                <h2 className="text-3xl font-bold text-white">{project.name}</h2>
                <p className="text-gray-400 mt-2">{project.description}</p>

                <h3 className="text-2xl font-semibold text-white mt-6">Technology Stack</h3>
                <p className="text-gray-400">{project.techStack}</p>

                <div className="mt-6 flex space-x-4">
                    <a href={project.liveLink} target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                        Live Project
                    </a>
                    <a href={project.github} target="_blank" className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg">
                        GitHub Repo
                    </a>
                </div>

                <h3 className="text-2xl font-semibold text-white mt-6">Challenges & Improvements</h3>
                <p className="text-gray-400">{project.challenges}</p>
                <p className="text-gray-400">{project.improvements}</p>
            </motion.div>
        </div>
    );
};

export default ProjectDetails;
