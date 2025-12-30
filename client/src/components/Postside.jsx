import React from "react";
import Postshare from "./Postshare";
import MultiPosts from "./MultiPosts";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import PostCategories from "./PostCategories";

function Postside() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col h-screen overflow-y-auto gap-4 pb-24 lg:pb-4 pt-16 lg:pt-0"
    >
      <Postshare />
      <PostCategories />
      <MultiPosts />
    </motion.div>
  );
}

export default Postside;
