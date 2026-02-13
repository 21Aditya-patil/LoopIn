import React, { useState } from "react";
import logo from "/another.svg";
import { GoHome, GoCalendar } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { IoIosNotificationsOutline } from "react-icons/io";
import Notifications from "./Notifications";

function MobileNav() {
  const { theme, toggleTheme } = useTheme();

  const [showNoti, setShowNoti] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-white dark:bg-slate-900 z-50 shadow-lg">
        <Link to="/">
          <img src={logo} alt="logo" className="h-12 w-auto" />
        </Link>

        <div className="flex gap-5 items-center">
          <div
            onClick={toggleTheme}
            className="cursor-pointer text-[#EF5757] hover:text-[#ff9a3b] transition-all ease-in-out text-2xl"
          >
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </div>

          {/* Notification Icon */}
          <div className="cursor-pointer text-[#EF5757] hover:text-[#ff9a3b] transition-all ease-in-out text-3xl">
            <IoIosNotificationsOutline onClick={() => setShowNoti(!showNoti)} />
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 px-4 flex items-center justify-between bg-white dark:bg-gray-900 z-50 rounded-t-xl shadow-lg text-[#EF5757]">
        <NavLink to="/" className={({ isActive }) =>
          `cursor-pointer p-3 rounded-xl transition-colors duration-200 ${
            isActive ? "text-[#EF5757] bg-slate-100 dark:bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-900" : "text-gray-400"
          }`
        }>
          <GoHome className="text-2xl" />
        </NavLink>

        <NavLink to="/events" className={({ isActive }) =>
          `cursor-pointer p-3 rounded-xl transition-colors duration-200 ${
            isActive ? "text-[#EF5757] bg-slate-100 dark:bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-900" : "text-gray-400"
          }`
        }>
          <GoCalendar className="text-2xl" />
        </NavLink>

        <NavLink to="/chats" className={({ isActive }) =>
          `cursor-pointer p-3 rounded-xl transition-colors duration-200 ${
            isActive ? "text-[#EF5757] bg-slate-100 dark:bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-900" : "text-gray-400"
          }`
        }>
          <CiChat1 className="text-2xl" />
        </NavLink>

        <NavLink to="/account" className={({ isActive }) =>
          `cursor-pointer p-3 rounded-xl transition-colors duration-200 ${
            isActive ? "text-[#EF5757] bg-slate-100 dark:bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-900" : "text-gray-400"
          }`
        }>
          <BsPersonCircle className="text-2xl" />
        </NavLink>
      </div>

      {/* Notification Popup */}
      {showNoti && (
        <Notifications close={() => setShowNoti(false)} />
      )}


    </>
  );
}

export default MobileNav;
