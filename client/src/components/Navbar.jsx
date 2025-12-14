import React from "react";
import logo from "/another.svg";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

function Navbar() {
  return (
    <div className="flex gap-2 items-center">
      <Link to="/">
        <motion.img
          initial={{ opacity: 0, scale:0.6 }}
          animate={{
            opacity: 1,
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            rotate: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
          }}
          src={logo}
          alt="logo"
        />
      </Link>
      <div className="relative">
        <input
          type="text"
          placeholder="Search something..."
          className="outline-none pl-3 pr-10 py-2 rounded-xl w-48
      dark:bg-gray-800 bg-white border border-slate-600"
        />

        <FaSearch
          className="absolute right-3 top-1/2 -translate-y-1/2
      text-[#ff9a3b] text-lg cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Navbar;
