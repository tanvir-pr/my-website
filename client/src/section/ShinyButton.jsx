import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ShinyButton = ({ children, href, download, to, onClick, className = "" }) => {
  const motionProps = {
    initial: { "--x": "100%" },
    animate: { "--x": "-100%" },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 1,
      type: "spring",
      stiffness: 20,
      damping: 15,
      mass: 2,
    },
  };

  const baseClass = "radial-gradient relative rounded-xl px-6 py-3 transition-all duration-300 active:scale-95 inline-flex items-center justify-center";

  if (href && !download) {
    return (
      <motion.a
        href={href}
        {...motionProps}
        className={`${baseClass} ${className}`}
      >
        <span className="linear-mask relative block size-full font-light tracking-wide text-slate-300">
          {children}
        </span>
        <span className="linear-overlay absolute inset-0 block rounded-lg p-px" />
      </motion.a>
    );
  }

  if (href && download) {
    return (
      <motion.button
        onClick={() => {
          const link = document.createElement("a");
          link.href = href;
          link.download = download;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        {...motionProps}
        className={`${baseClass} ${className} cursor-pointer`}
      >
        <span className="linear-mask relative block size-full font-light tracking-wide text-slate-300">
          {children}
        </span>
        <span className="linear-overlay absolute inset-0 block rounded-lg p-px" />
      </motion.button>
    );
  }

  if (to) {
    return (
      <Link to={to}>
        <motion.span
          {...motionProps}
          className={`${baseClass} ${className} block`}
        >
          <span className="linear-mask relative block size-full font-light tracking-wide text-slate-300">
            {children}
          </span>
          <span className="linear-overlay absolute inset-0 block rounded-lg p-px" />
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      {...motionProps}
      className={`${baseClass} ${className}`}
    >
      <span className="linear-mask relative block size-full font-light tracking-wide text-slate-300">
        {children}
      </span>
      <span className="linear-overlay absolute inset-0 block rounded-lg p-px" />
    </motion.button>
  );
};
export default ShinyButton;
