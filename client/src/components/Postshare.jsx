import React from "react";
import dp from "/one.jpg";
import { MdInsertPhoto } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { motion } from "motion/react";

function Postshare() {
  return (
    <div className="flex gap-4 dark:bg-gray-800 bg-[#ffffffa3] p-4 rounded-2xl dark:shadow-xsoft dark:shadow-[#ff9a3b] shadow-[#ff9a3b] shadow-soft">
      <img src={dp} alt="dp5" className="w-10 h-10 rounded-full" />
      <div className="flex w-full flex-col">
        <input
          type="text"
          placeholder="post..."
          className="w-full text-xl outline-none border-none mb-2 dark:bg-gray-600 bg-slate-200 p-2 rounded-xl"
        />
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="pt-4 pl-2 pr-2 flex justify-start items-center gap-1 text-[#f9a225] text-2xl md:text-lg hover:text-[#f95f35] cursor-pointer">
              <MdInsertPhoto />
              <span className="md:flex hidden">Photo</span>
            </div>
            <div className="pt-4 pl-2 pr-2 flex justify-center items-center gap-1 text-[#f9a225] text-2xl md:text-lg hover:text-[#f95f35] cursor-pointer">
              <FaVideo />
              <span className="md:flex hidden">Video</span>
            </div>
          </div>
          <motion.button
            whileHover={{
              scale: 0.9,
              // Will be used when gesture starts
              transition: { duration: 0.2 },
            }}
            // Will be used when gesture ends
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-md font-bold px-6 py-0 hover:bg-[#faad64]"
          >
            Post
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Postshare;
