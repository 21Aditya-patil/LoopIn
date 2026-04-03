import React, { useState, useEffect } from "react";
import logo from "/fulllogo.png";
import { GoHome, GoCalendar } from "react-icons/go";
import { CiChat1 } from "react-icons/ci";
import dp from "/default-avatar.jpg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { searchData, clearSearch } from "../reducers/searchSlice";
import { toggleTheme } from "../reducers/themeSlice";
import { IoMdArrowBack } from "react-icons/io";

function MobileNav() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.theme);

  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false); // NEW
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search?.results || []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 1) {
        dispatch(searchData(query));
      } else {
        dispatch(clearSearch());
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, dispatch]);
  return (
    <>
      {/* Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-white dark:bg-slate-900 z-50 shadow-lg">
        <Link to="/">
          <img src={logo} alt="logo" className="h-12 w-auto" />
        </Link>

        <div className="flex gap-5 items-center">
          <div
            onClick={() => dispatch(toggleTheme())}
            className="cursor-pointer text-[#EF5757] hover:text-[#ff9a3b] transition-all ease-in-out text-2xl"
          >
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </div>

          {/* Search Icon */}
          <div className="cursor-pointer text-[#EF5757] hover:text-[#ff9a3b] transition-all ease-in-out text-3xl">
            <FaSearch
              onClick={() => setOpenSearch(true)}
              className="text-[#ff9a3b] text-lg cursor-pointer"
            />
          </div>
        </div>
        {openSearch && (
          <div className="fixed inset-0 bg-black z-[9999] p-4">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => {
                  setOpenSearch(false);
                  setQuery("");
                  dispatch(clearSearch());
                }}
                className="text-white text-xl"
              >
                <IoMdArrowBack />
              </button>

              <input
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={handleSearch}
                className="flex-1 px-4 py-2 rounded-xl bg-slate-800 text-white outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              {results.map((item) => (
                <Link
                  key={item._id}
                  to={`/profile/${item._id}`}
                  onClick={() => setOpenSearch(false)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-900"
                >
                  <img
                    src={item.profilePicture || dp}
                    className="w-10 h-10 rounded-full aspect-square object-cover"
                  />

                  <div>
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-gray-400 text-sm">@{item.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navbar */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-2 w-full flex justify-center">
        <div className="flex items-center justify-between w-full max-w-sm px-5 py-2.5
    bg-white dark:bg-slate-900
    border border-gray-200 dark:border-slate-700
    rounded-full shadow-xl text-[#EF5757]">

          <NavLink
            to="/home"
            className={({ isActive }) =>
              `p-2 rounded-full transition-all ${isActive
                ? "bg-[#EF5757] text-white shadow-md"
                : "text-gray-400"
              }`
            }
          >
            <GoHome className="text-2xl" />
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              `p-2 rounded-full transition-all ${isActive
                ? "bg-[#EF5757] text-white shadow-md"
                : "text-gray-400"
              }`
            }
          >
            <GoCalendar className="text-2xl" />
          </NavLink>

          <NavLink
            to="/chats"
            className={({ isActive }) =>
              `p-2 rounded-full transition-all ${isActive
                ? "bg-[#EF5757] text-white shadow-md"
                : "text-gray-400"
              }`
            }
          >
            <CiChat1 className="text-2xl" />
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              `p-1 rounded-full transition-all ${isActive ? "bg-[#EF5757] shadow-md" : ""
              }`
            }
          >
            <img
              src={user?.profilePicture || dp}
              alt="account-image"
              className="w-8 h-8 rounded-full aspect-square object-cover border-2 border-[#EF5757]"
            />
          </NavLink>

        </div>
      </div>


    </>
  );
}

export default MobileNav;
