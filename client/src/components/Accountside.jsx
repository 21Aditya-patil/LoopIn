import React from "react";
import { motion } from "motion/react";
import Usercard from "./Usercard";
import PostSide from "./Postside"
import AccountCard from "./AccountCard";

function Accountside() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col max-h-screen overflow-y-auto gap-4 pb-24 lg:pb-8 pt-[80px] lg:pt-0"
    >
      <AccountCard />
      <PostSide />
    </motion.div>
  );
}

export default Accountside;
