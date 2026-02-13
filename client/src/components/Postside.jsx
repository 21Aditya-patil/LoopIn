import React, { useState } from "react";
import Postshare from "./Postshare";
import MultiPosts from "./MultiPosts";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import PostCategories from "./PostCategories";

function Postside({ withScroll = false }) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`flex flex-col gap-4 pb-32 pt-16 lg:pt-0 lg:pb-10 ${withScroll ? 'h-screen overflow-y-auto' : ''}`}
    >
      <Postshare />
      <PostCategories active={activeCategory} setActive={setActiveCategory} />
      <MultiPosts activeCategory={activeCategory} />
    </motion.div>
  );
}

export default Postside;
