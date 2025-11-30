import React from "react";
import Postshare from "./Postshare";
import MultiPosts from "./MultiPosts";
import { motion } from "motion/react";

function Postside() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col max-h-screen overflow-y-auto gap-4 pb-24 lg:pb-8 pt-[80px] lg:pt-0"
    >
      <Postshare />
      <MultiPosts />
    </motion.div>
  );
}

export default Postside;
