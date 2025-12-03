import { useState } from 'react'
import { Outlet } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import BackgroundEffect from "./components/BackgroundEffect";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Home from "./components/Home";
import './App.css'


export default function App() {
  

  return (
  
        
    
     
      <div className="relative mx-auto border-l-green-500 border-2"> 
      <BackgroundEffect></BackgroundEffect>
      
      <div className="relative z-10 w-full">
        <Navbar />
          {/* <Home></Home> */}
          
          {/* <ParticlesBackground></ParticlesBackground> */}
        <Hero />
        <AboutMe></AboutMe>
        {/* <Projects></Projects> */}
      <Skills/>
      <Portfolio/>
      <Experience/>
      <Contact/>
      <Footer/>
      </div>
    
    </div>
 
   
  )
}

// export default App
