import React from "react";
import page from "/pageconstruct.jpg";
import { motion } from "motion/react";

function Accountside() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex w-full justify-center items-center pt-80 md:pt-0"
    >
      <div className="bg-white justify-center items-center rounded-2xl">
        <img src={page} alt="page" className="rounded-2xl" />
      </div>
    </motion.div>
  );
}

export default Accountside;
