import { motion } from "framer-motion";
import { skills } from "../section/db";
import FlipDiv from "../section/FlipDiv";

const Marquee = () => {
  return (
    <div className="mx-auto space-y-6 w-full max-w-full overflow-hidden mt-8">
      <div className="flex overflow-hidden x-gradient w-full pl-12 md:pl-24">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 gap-6"
        >
          {skills.map(({ id, skill, icon }) => (
            <FlipDiv key={`first-${id}`} text={skill} under={icon} className={"min-w-fit"} />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 gap-6 ml-6"
        >
          {skills.map(({ id, skill, icon }) => (
            <FlipDiv key={`second-${id}`} text={skill} under={icon} className={"min-w-fit"} />
          ))}
        </motion.div>
      </div>

 
    </div>
  );
};
export default Marquee;
