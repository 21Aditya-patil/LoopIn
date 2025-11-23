import React from "react";
import logo from "/logo.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div className="flex gap-3 items-center">
      <Link
        to="/"
      >
        <img src={logo} alt="logo" className="h-10 w-10" />
      </Link>
      <input
        type="text"
        placeholder="Search something..."
        className="outline-none p-2 text-base rounded-xl bg-white border border-slate-300"
      />
      <FaSearch className="text-[#ff9a3b] text-base hover:text-[#fccc89] cursor-pointer" />
    </div>
  );
}

export default Navbar;
