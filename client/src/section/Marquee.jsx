import { motion } from "framer-motion";
import { skills } from "../section/db";
import FlipDiv from "../section/FlipDiv";

const Marquee = () => {
  const oneThirdLength = Math.floor(skills.length / 3)
  const oneHalfLength = Math.ceil(skills.length / 2)

  return (
    <div className="mx-auto space-y-6">
      <div className="flex overflow-hidden x-gradient">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 *:mr-6"
        >
          {skills
            .slice(0, oneThirdLength)
            .map(({ id, skill, icon }, i) => (
              // <div
              //   key={`un-${i}`}
              //   className="rounded-lg bg-neutral-300/10 px-6 py-4 text-lg mr-6"
              // >
              //   Skill
              // </div>

              <FlipDiv key={id} text={skill} under={icon} className={"mr-6"} />
            ))}
        </motion.div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 *:mr-6"
        >
          {skills
            .slice(0, oneThirdLength)
            .map(({ id, skill, icon }, i) => (
              // <div
              //   key={`un-${i}`}
              //   className="mr-6 rounded-lg bg-red-300/10 px-6 py-4 text-lg"
              // >
              //   Skill
              // </div>
              <FlipDiv key={id} text={skill} under={icon} className={"mr-6"} />
            ))}
        </motion.div>
      </div>

 
    </div>
  );
};
export default Marquee;
