import React, { useState } from "react";
import { GoHome, GoCalendar } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Notifications from "./Notifications";

function Navside() {
  const [mode, setMode] = useState(true);

  const toggleMode = () => setMode(!mode);
  return (
    <div className="hidden lg:flex flex-col gap-8">
      <div className="flex text-3xl items-center justify-between">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-[#E8DCC4]" : null
            }`
          }
        >
          <GoHome className="cursor-pointer hover:translate-x-2 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-[#E8DCC4]" : null
            }`
          }
        >
          <GoCalendar className="cursor-pointer hover:translate-x-2 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>

        <NavLink
          to="/chats"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-[#E8DCC4]" : null
            }`
          }
        >
          <CiChat1 className="cursor-pointer hover:translate-x-2 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-[#E8DCC4]" : null
            }`
          }
        >
          <BsPersonCircle className="cursor-pointer hover:translate-x-2 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>

        <div
          onClick={toggleMode}
          className="cursor-pointer hover:text-[#ff9a3b] transition-all ease-in-out"
        >
          {mode ? <MdLightMode /> : <MdDarkMode />}
        </div>
      </div>
      <Notifications />
    </div>
  );
}

export default Navside;
