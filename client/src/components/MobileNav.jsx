import { useState } from "react";
import React from "react";
import logo from "/logo.png";
import { GoHome, GoCalendar } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

function MobileNav() {
  const [mode, setMode] = useState(true);

  const toggleMode = () => setMode(!mode);
  return (
    <>
      <div className="lg:hidden flex justify-between items-center top-0 left-0 right-0 p-4 w-full bg-white fixed z-50 rounded-b-xl md:shadow-lg shadow-soft shadow-[#ff9a3b]">
        <Link to="/">
          <img src={logo} alt="logo" className="h-12 w-12" />
        </Link>
        <div
          onClick={toggleMode}
          className="cursor-pointer hover:text-[#ff9a3b] transition-all ease-in-out text-2xl"
        >
          {mode ? <MdLightMode /> : <MdDarkMode />}
        </div>
      </div>
      <div className="lg:hidden flex text-3xl items-center justify-between bottom-0 left-0 right-0 p-4 bg-white fixed z-50 rounded-t-xl shadow-lg shadow-[#ff9a3b]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-[#E8DCC4]" : null
            }`
          }
        >
          <GoHome />
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `cursor-pointer text-[#EF5757] py-2 px-4 rounded-xl ${
              isActive ? "bg-[#E8DCC4]" : null
            }`
          }
        >
          <GoCalendar />
        </NavLink>
        <NavLink
          to="/chats"
          className={({ isActive }) =>
            `cursor-pointer text-[#EF5757] py-2 px-4 rounded-xl ${
              isActive ? "bg-[#E8DCC4]" : null
            }`
          }
        >
          <CiChat1 />
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            `cursor-pointer text-[#EF5757] py-2 px-4 rounded-xl ${
              isActive ? "bg-[#E8DCC4]" : null
            }`
          }
        >
          <BsPersonCircle />
        </NavLink>
      </div>
    </>
  );
}

export default MobileNav;
