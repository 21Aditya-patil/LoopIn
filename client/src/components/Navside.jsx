import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reducers/themeSlice";
import { GoHome, GoCalendar } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Notifications from "./Notifications";
import dp from "/default-avatar.jpg";

function Navside() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <div className="hidden lg:flex flex-col gap-8">
      <div className="flex text-3xl items-center justify-between">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-2xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-white dark:bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-900" : null
            }`
          }
        >
          <GoHome className="cursor-pointer hover:scale-110 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-2xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-white dark:bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-900" : null
            }`
          }
        >
          <GoCalendar className="cursor-pointer hover:scale-110 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>

        <NavLink
          to="/chats"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-2xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-white dark:bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-900" : null
            }`
          }
        >
          <CiChat1 className="cursor-pointer hover:scale-110 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `cursor-pointer py-2 px-4 rounded-2xl text-text-[#EF5757] text-[#EF5757] ${
              isActive ? "bg-white dark:bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-900" : null
            }`
          }
        >
          <div className="border border-[#EF5757]  rounded-full">
            <img src={user?.profilePicture || dp} alt="account-image" className="w-8 h-8 rounded-full"/>
          </div>
        </NavLink>

        <div
          onClick={() => dispatch(toggleTheme())}
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
