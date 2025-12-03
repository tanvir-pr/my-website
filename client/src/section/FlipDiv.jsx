import { motion } from "framer-motion";

const FlipDiv = ({ text, under }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="marquee-chip"
      title={text}
    >
      <span className="inline-flex items-center gap-2">
        {under ? <span className="text-base opacity-80">{under}</span> : null}
        <span>{text}</span>
      </span>
    </motion.div>
  );
};

export default FlipDiv;
