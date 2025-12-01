import React from "react";
import logo from "/another.svg";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";


function Navbar() {
  return (
    <div className="flex gap-3 items-center">
      <Link
        to="/"
      >
        <motion.img
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: 1,
          rotate: [0, 4, -4, 0],
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          rotate: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
        }} 
        src={logo} alt="logo" className="w-14"/>
      </Link>
      <input
        type="text"
        placeholder="Search something..."
        className="outline-none p-2 text-base rounded-xl dark:bg-gray-600 bg-white dark:border-none border border-slate-300"
      />
      <FaSearch className="text-[#ff9a3b] text-base hover:text-[#fccc89] cursor-pointer" />
    </div>
  );
}

export default Navbar;

