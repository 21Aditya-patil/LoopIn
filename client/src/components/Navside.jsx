import { useTheme } from "../context/ThemeContext";
import { GoHome, GoCalendar } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Notifications from "./Notifications";

function Navside() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="hidden lg:flex flex-col gap-8">
      <div className="flex text-3xl items-center justify-between">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-2xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-white dark:bg-gray-700" : null
            }`
          }
        >
          <GoHome className="cursor-pointer hover:scale-110 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-2xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-white dark:bg-gray-700" : null
            }`
          }
        >
          <GoCalendar className="cursor-pointer hover:scale-110 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>

        <NavLink
          to="/chats"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-2xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-white dark:bg-gray-700" : null
            }`
          }
        >
          <CiChat1 className="cursor-pointer hover:scale-110 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-2xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-white dark:bg-gray-700" : null
            }`
          }
        >
          <BsPersonCircle className="cursor-pointer hover:scale-110 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>

        <div
          onClick={toggleTheme}
          className="cursor-pointer text-[#EF5757] hover:text-[#ff9a3b] transition-all ease-in-out"
        >
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </div>
      </div>
      <Notifications />
    </div>
  );
}

export default Navside;
