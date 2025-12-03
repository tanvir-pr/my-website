import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 }, // Ensure it covers the full screen
        background: { color: "#0a0a0a" }, // Set background color
        particles: {
          number: {
            value: 100, // Adjust the number of particles
            density: { enable: true, value_area: 800 },
          },
          shape: { type: "circle" }, // You can change to "square", "triangle", etc.
          size: { value: 3 },
          move: { enable: true, speed: 2 },
          opacity: { value: 0.5 },
          links: {
            enable: true, // Enables connecting lines
            color: "#ffffff",
            distance: 150, // Adjust distance for linking
          },
        },
      }}
    />
  );
};

export default ParticleBackground;