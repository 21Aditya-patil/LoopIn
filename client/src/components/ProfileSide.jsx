import React from "react";
import { motion } from "motion/react";
import ProfileMain from "./ProfileMain";

function ProfileSide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col h-full overflow-y-auto gap-4 pb-24 lg:pb-4 pt-16 lg:pt-0"
    >
      <ProfileMain />
    </motion.div>
  );
}

export default ProfileSide;
