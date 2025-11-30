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
      <div className="lg:hidden flex justify-between items-center top-0 left-0 right-0 p-4 w-full dark:bg-slate-900 bg-white fixed z-50 rounded-b-xl md:shadow-lg shadow-soft shadow-[#ff9a3b] dark:shadow-[#ff9a3b] dark:shadow-xsoft h-18">
        <Link to="/">
          <img src={logo} alt="logo" className="h-14 w-auto" />
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
      <div className="lg:hidden flex text-3xl items-center justify-between bottom-0 left-0 right-0 p-4 dark:bg-gray-900 bg-white fixed z-50 rounded-t-xl shadow-lg shadow-[#ff9a3b] text-[#EF5757]">
        <NavLink to="/" className={({ isActive }) =>
          `cursor-pointer py-2 px-4 rounded-xl ${
            isActive ? "text-[#EF5757] bg-slate-100 dark:bg-gray-700" : ""
          }`
        }>
          <GoHome />
        </NavLink>

        <NavLink to="/events" className={({ isActive }) =>
          `cursor-pointer py-2 px-4 rounded-xl ${
            isActive ? "text-[#EF5757] bg-slate-100 dark:bg-gray-700" : ""
          }`
        }>
          <GoCalendar />
        </NavLink>

        <NavLink to="/chats" className={({ isActive }) =>
          `cursor-pointer py-2 px-4 rounded-xl ${
            isActive ? "text-[#EF5757] bg-slate-100 dark:bg-gray-700" : ""
          }`
        }>
          <CiChat1 />
        </NavLink>

        <NavLink to="/account" className={({ isActive }) =>
          `cursor-pointer py-2 px-4 rounded-xl ${
            isActive ? "text-[#EF5757] bg-slate-100 dark:bg-gray-700" : ""
          }`
        }>
          <BsPersonCircle />
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
