import AboutMe from "./components/AboutMe";
import Analytics from "./components/Analytics";
import BackgroundEffect from "./components/BackgroundEffect";
import SEO from "./components/SEO";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

export default function App() {
  const { theme, backgroundEffect } = useTheme();

  return (
    <div
      className={`page-atmosphere relative mx-auto min-h-screen w-full max-w-full overflow-x-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0b0d14] text-gray-100" : "bg-[#f4f5f8] text-gray-900"
      }`}
    >
      {backgroundEffect && <BackgroundEffect />}
      <SEO />
      <Analytics />
      <div className="relative z-10 w-full">
        <Navbar />
        <Hero />
        <Portfolio />
        <Skills />
        <Certificates />
        <AboutMe />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
