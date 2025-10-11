import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function CycleText({ options }: { options: Array<string> }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % options.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [options.length]);

  return (
    <div className="overflow h-12">
      <AnimatePresence mode="sync">
        <motion.div
          key={options[index]}
          initial={{ opacity: 0, y: -25, filter: "blur(10px)" }}
          animate={{
            opacity: [0, 0, 1],
            y: 0,
            filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
          }}
          exit={{
            opacity: [1, 0, 0],
            y: 25,
            filter: ["blur(0px)", "blur(5px)", "blur(10px)"],
          }}
          transition={{ duration: 0.5, times: [0, 0.5, 1], ease: "backInOut" }}
          className="absolute top-0 left-0 underline decoration-primary"
        >
          {options[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
