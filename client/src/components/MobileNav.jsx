import { useState } from "react";
import React from "react";
import logo from "/logo.png";
import { GoHome, GoCalendar } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function MobileNav() {
  const [mode, setMode] = useState(true);

  const toggleMode = () => setMode(!mode);
  return (
    <>
      <div className="lg:hidden flex justify-between items-center top-0 left-0 right-0 p-4 w-full bg-white fixed z-50 mt-0 rounded-b-xl shadow-lg shadow-[#ff9a3b]">
        <div>
          <a href="#"><img src={logo} alt="logo" className="h-12 w-12" /></a>
        </div>
        <div
          onClick={toggleMode}
          className="cursor-pointer hover:text-[#ff9a3b] transition-all ease-in-out text-2xl"
        >
          {mode ? <MdLightMode /> : <MdDarkMode />}
        </div>
      </div>
      <div className="lg:hidden flex flex-col gap-8 bottom-0 left-0 right-0 p-4 bg-white fixed z-50 m-0 rounded-xl mb-0 shadow-lg shadow-[#ff9a3b] shadow-soft">
        <div className="flex text-3xl items-center justify-between">
          <GoHome className="cursor-pointer hover:translate-x-2 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
          <GoCalendar className="cursor-pointer hover:translate-x-2 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
          <CiChat1 className="cursor-pointer hover:translate-x-2 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
          <BsPersonCircle className="cursor-pointer hover:translate-x-2 ease-in-out transition-all text-[#EF5757] hover:text-[#ff9a3b]" />
        </div>
      </div>
    </>
  );
}

export default MobileNav;
