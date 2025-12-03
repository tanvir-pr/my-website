import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { IoCheckmarkCircle, IoCloseCircle, IoAlertCircle } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";
import { API_BASE, site } from "../data/site";

const validateName = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, message: "Name is required" };
  if (trimmed.length < 2) return { valid: false, message: "Name must be at least 2 characters" };
  if (trimmed.length > 50) return { valid: false, message: "Name must be under 50 characters" };
  return { valid: true, message: "" };
};

const validateEmail = (value) => {
  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmed) return { valid: false, message: "Email is required" };
  if (!emailRegex.test(trimmed)) return { valid: false, message: "Please enter a valid email" };
  return { valid: true, message: "" };
};

const validateMessage = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, message: "Message is required" };
  if (trimmed.length < 10) return { valid: false, message: "Message must be at least 10 characters" };
  if (trimmed.length > 1000) return { valid: false, message: "Message must be under 1000 characters" };
  return { valid: true, message: "" };
};

const AnimatedInput = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  theme,
  as: Component = "input",
  rows,
  name,
  shakeKey = 0,
}) => {
  const showError = touched && error;
  const isValid = touched && !error && value.trim();
  const isTextarea = Component === "textarea";
  const isDark = theme === "dark";

  return (
    <motion.div layout className="relative">
      <motion.div
        key={shakeKey}
        animate={{ x: showError ? [0, -8, 8, -4, 4, 0] : 0 }}
        transition={{ duration: 0.45 }}
      >
        <Component
          {...(isTextarea ? {} : { type })}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...(isTextarea && { rows })}
          className={`w-full p-3 rounded-xl transition-all duration-300 outline-none pr-12 ${
            isDark
              ? "bg-[#0d0f18] text-white placeholder-gray-500"
              : "bg-gray-50 text-gray-900 placeholder-gray-400"
          } ${
            showError
              ? "border-2 border-red-500"
              : isValid
                ? "border-2 border-emerald-500"
                : "border border-[var(--border-color)] focus:border-[var(--accent-color)]"
          }`}
        />
        <AnimatePresence>
          {touched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute right-3 pointer-events-none ${isTextarea ? "top-3" : "top-1/2 -translate-y-1/2"}`}
            >
              {showError ? (
                <IoCloseCircle size={22} className="text-red-500" />
              ) : isValid ? (
                <IoCheckmarkCircle size={22} className="text-emerald-500" />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
          >
            <IoAlertCircle size={16} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SuccessResetEffect = ({ onReset }) => {
  useEffect(() => {
    const timer = setTimeout(onReset, 3000);
    return () => clearTimeout(timer);
  }, [onReset]);
  return null;
};

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const [apiError, setApiError] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "message":
        return validateMessage(value);
      default:
        return { valid: true, message: "" };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const result = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: result.message }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const result = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: result.message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    setApiError("");

    const nameResult = validateName(formData.name);
    const emailResult = validateEmail(formData.email);
    const messageResult = validateMessage(formData.message);
    setErrors({
      name: nameResult.message,
      email: emailResult.message,
      message: messageResult.message,
    });

    if (!nameResult.valid || !emailResult.valid || !messageResult.valid) {
      setSubmitAttempts((c) => c + 1);
      return;
    }

    setSubmitStatus("submitting");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not send message");
      }
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setErrors({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitStatus("idle");
      setApiError(err.message || "Could not send message");
    }
  };

  const isFormValid =
    validateName(formData.name).valid &&
    validateEmail(formData.email).valid &&
    validateMessage(formData.message).valid;

  const links = [
    {
      icon: <AiOutlineMail className="text-xl" />,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: <AiOutlinePhone className="text-xl" />,
      label: "Phone",
      value: site.phone,
      href: site.phoneHref,
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      label: "LinkedIn",
      value: "Connect",
      href: site.linkedin,
    },
    {
      icon: <FaGithub className="text-xl" />,
      label: "GitHub",
      value: "@tanvir-pr",
      href: site.github,
    },
  ];

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-10"
        >
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">Let’s talk</h2>
          <p className="section-lead">
            Hiring for AI/ML or full-stack? Send a note — I usually reply within a day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="surface-card flex items-center gap-4 p-4 transition hover:border-[var(--accent-color)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-color)]">
                  {item.icon}
                </span>
                <span className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    {item.label}
                  </span>
                  <span className={`block text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {item.value}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-card p-6 md:p-8 text-left"
          >
            <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Send a message
            </h3>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <AnimatedInput
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                theme={theme}
                shakeKey={submitAttempts}
              />
              <AnimatedInput
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                theme={theme}
                shakeKey={submitAttempts}
              />
              <AnimatedInput
                as="textarea"
                name="message"
                placeholder="Your message (min 10 characters)"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.message}
                touched={touched.message}
                theme={theme}
                rows={5}
                shakeKey={submitAttempts}
              />

              {apiError && <p className="text-sm text-red-400">{apiError}</p>}

              <motion.button
                type="submit"
                disabled={submitStatus === "submitting"}
                whileHover={isFormValid && submitStatus === "idle" ? { scale: 1.01 } : {}}
                whileTap={submitStatus === "idle" ? { scale: 0.98 } : {}}
                className={`w-full py-3.5 rounded-xl font-semibold text-white ${
                  submitStatus === "success"
                    ? "bg-emerald-600"
                    : "bg-[var(--accent-color)]"
                } ${!isFormValid && submitStatus === "idle" ? "opacity-70" : ""}`}
              >
                {submitStatus === "submitting"
                  ? "Sending..."
                  : submitStatus === "success"
                    ? "Message sent"
                    : "Send message"}
              </motion.button>
              {submitStatus === "success" && (
                <SuccessResetEffect onReset={() => setSubmitStatus("idle")} />
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
