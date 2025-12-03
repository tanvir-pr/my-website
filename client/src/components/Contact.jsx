import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaYoutube, FaGithub, FaTiktok } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0d0b1a] text-white py-16 px-6" id="contact">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl font-bold text-purple-400"
      >
        Contact Me
      </motion.h2>
      <p className="text-center text-gray-400 mt-2">
        Got a question? Send me a message, and I'll get back to you soon.
      </p>

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#16132a] p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <p className="text-gray-400 mt-2">
            Have something to discuss? Send me a message and let's talk.
          </p>
          <form className="mt-6 space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-[#0d0b1a] text-white border border-gray-600 focus:border-purple-400" />
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg bg-[#0d0b1a] text-white border border-gray-600 focus:border-purple-400" />
            <textarea placeholder="Your Message" className="w-full p-3 h-28 rounded-lg bg-[#0d0b1a] text-white border border-gray-600 focus:border-purple-400"></textarea>
            <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 py-3 rounded-lg text-white font-semibold hover:opacity-80 transition">
              🚀 Send Message
            </button>
          </form>

          {/* ✅ UPDATED "Connect With Me" SECTION */}
           {/* <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-[#5068b8] to-[#8e3427] p-2 rounded-2xl mt-6 shadow-lg"
          >
            <h4 className="text-lg font-semibold text-white">Connect With Me</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { icon: <FaLinkedin className="text-blue-400 text-3xl" />, text: "Let's Connect", subtext: "on LinkedIn", link: "#" },
                { icon: <FaInstagram className="text-pink-400 text-2xl" />, text: "Instagram", subtext: "@abnahid", link: "#" },
                { icon: <FaYoutube className="text-red-500 text-2xl" />, text: "Youtube", subtext: "@abnahid", link: "#" },
                { icon: <FaGithub className="text-gray-400 text-2xl" />, text: "Github", subtext: "@abnahid", link: "#" },
                { icon: <FaTiktok className="text-white text-2xl" />, text: "Tiktok", subtext: "@abnahid", link: "#" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-white/10 hover:bg-white/20 p-4 rounded-xl transition"
                >
                  <div className="p-3 bg-white/10 rounded-lg">{item.icon}</div>
                  <div className="ml-3 text-white">
                    <p className="font-semibold">{item.text}</p>
                    <p className="text-gray-400 text-sm">{item.subtext}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>  */}

<motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-[#44536b] to-[#393d5e] p-2 rounded-2xl mt-6 shadow-lg"
    >
      <h4 className="text-lg font-semibold text-white">Connect With Me</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {[
          { icon: <FaLinkedin className="text-blue-400 text-3xl" />, text: "Let's Connect", subtext: "on LinkedIn", link: "#", gradient: "bg-gradient-to-r from-blue-600 to-blue-400" },
          { icon: <FaInstagram className="text-pink-400 text-2xl" />, text: "Instagram", subtext: "@tanvir-pr", link: "#", gradient: "bg-gradient-to-r from-pink-500 to-pink-300" },
          { icon: <FaYoutube className="text-red-500 text-2xl" />, text: "Youtube", subtext: "@tanvir-pr", link: "#", gradient: "bg-gradient-to-r from-red-600 to-red-400" },
          { icon: <FaGithub className="text-gray-400 text-2xl" />, text: "Github", subtext: "@tanvir-pr", link: "#", gradient: "bg-gradient-to-r from-black to-gray-700" },
          { icon: <FaTiktok className="text-white text-2xl" />, text: "Tiktok", subtext: "@tanvir-pr", link: "#", gradient: "bg-gradient-to-r from-gray-700 to-gray-500" },
        ].map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center relative p-4 rounded-xl transition group overflow-hidden"
          >
            {/* Default Gray Background */}
            <div className="absolute inset-0 bg-gray-700 rounded-xl transition-all duration-500" />

            {/* Shimmer Effect */}
            <div 
              className={`absolute inset-0 ${item.gradient} bg-[length:200%_200%] transition-all duration-500 translate-x-[-100%] group-hover:translate-x-0`}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center w-full">
              <div className="p-3 bg-white/10 rounded-lg">{item.icon}</div>
              <div className="ml-3 text-white">
                <p className="font-semibold">{item.text}</p>
                <p className="text-gray-400 text-sm">{item.subtext}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>



        





        </motion.div>
        

        {/* Right Side - Comments Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#16132a] p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold">💬 Comments <span className="text-purple-400">(13)</span></h3>
          <form className="mt-4 space-y-4">
            <input type="text" placeholder="Enter your name" className="w-full p-3 rounded-lg bg-[#0d0b1a] text-white border border-gray-600 focus:border-purple-400" />
            <textarea placeholder="Write your message here..." className="w-full p-3 h-24 rounded-lg bg-[#0d0b1a] text-white border border-gray-600 focus:border-purple-400"></textarea>
            <label className="block">
              <input type="file" className="hidden" />
              <div className="border border-gray-600 p-4 rounded-lg text-center text-gray-400 cursor-pointer hover:border-purple-400">
                📁 Choose Profile Photo (Max 5MB)
              </div>
            </label>
            <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 py-3 rounded-lg text-white font-semibold hover:opacity-80 transition">
              🚀 Post Comment
            </button>
          </form>

          {/* Sample Comments */}
          <div className="mt-6 space-y-4">
            <div className="bg-[#0d0b1a] p-4 rounded-lg text-gray-300">
              <p className="font-bold text-purple-400">🔥 John Doe</p>
              <p>Awesome design! Love the UI.</p>
              <span className="text-gray-500 text-sm">12h ago</span>
            </div>
            <div className="bg-[#0d0b1a] p-4 rounded-lg text-gray-300">
              <p className="font-bold text-purple-400">🎉 Alex Smith</p>
              <p>Dark mode looks amazing! 😍</p>
              <span className="text-gray-500 text-sm">7h ago</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
