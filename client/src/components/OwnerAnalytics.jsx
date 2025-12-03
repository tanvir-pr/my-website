import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdBarChart, MdLock, MdVisibility, MdTouchApp, MdPeople, MdOpenInNew, MdSecurity } from "react-icons/md";

const OWNER_KEY = "owner_analytics_session";
const PASSWORD = import.meta.env.VITE_OWNER_ANALYTICS_PASSWORD || "owner2025";

const OwnerAnalytics = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unlocked = sessionStorage.getItem(OWNER_KEY);
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!password.trim()) {
      setError("Enter password");
      return;
    }
    setIsChecking(true);
    setTimeout(() => {
      if (password === PASSWORD) {
        sessionStorage.setItem(OWNER_KEY, "true");
        setIsUnlocked(true);
        setError("");
        setPassword("");
      } else {
        setError("Incorrect password");
        setPassword("");
      }
      setIsChecking(false);
    }, 600);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(OWNER_KEY);
    setIsUnlocked(false);
    setPassword("");
    navigate("/");
  };

  const stats = [
    {
      icon: MdVisibility,
      label: "Page Views",
      value: "—",
      sub: "View in Google Analytics",
      color: "from-purple-500 to-indigo-500",
      delay: 0,
    },
    {
      icon: MdPeople,
      label: "Visitors",
      value: "—",
      sub: "Real-time in GA4",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      icon: MdTouchApp,
      label: "Clicks",
      value: "—",
      sub: "Event tracking",
      color: "from-emerald-500 to-teal-500",
      delay: 0.2,
    },
  ];

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#0d0b1a] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-[#16132a] rounded-2xl p-8 shadow-2xl border border-purple-500/20"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4"
              >
                <MdLock className="text-purple-400 text-3xl" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white">Owner Access</h1>
              <p className="text-gray-400 text-sm mt-1">
                This page is private. Enter the owner password.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Password"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-[#0d0b1a] border border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                  disabled={isChecking}
                />
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm flex items-center gap-2"
                  >
                    <MdSecurity /> {error}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.button
                type="submit"
                disabled={isChecking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isChecking ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Verifying...
                  </>
                ) : (
                  "Unlock"
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0b1a] p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <MdBarChart className="text-purple-400 text-3xl" />
            <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition text-sm"
          >
            Lock & Exit
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + stat.delay, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-xl`}
            >
              <stat.icon className="text-white/90 text-2xl mb-3" />
              <p className="text-white/80 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              <p className="text-white/70 text-xs mt-2">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, x: 4 }}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition"
        >
          <MdOpenInNew className="text-xl" />
          Open Google Analytics for full data
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Add VITE_GA_MEASUREMENT_ID to view real-time data in Google Analytics
        </motion.p>
      </motion.div>
    </div>
  );
};

export default OwnerAnalytics;
