import React from "react";
import page from "/pageconstruct.jpg";
import { chatData } from "../Data/chatData";
import ChatOne from "./ChatOne";
import { motion } from "motion/react";

function Chatside() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col max-h-screen overflow-y-auto pb-24 lg:pb-8 pt-[80px] lg:pt-0"
    >
      <div className="w-full h-14 text-3xl mb-0">Messages</div>
      {chatData.map((chat, id) => {
        return <ChatOne data={chat} key={id} />;
      })}
    </motion.div>
  );
}

export default Chatside;
