import { useState, useEffect } from "react";
import logo from "/fulllogo.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { searchData, clearSearch } from "../reducers/searchSlice";
import dp from "/default-avatar.jpg";

function Navbar() {
  const [query, setQuery] = useState("");
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
    <div className="flex gap-2 items-center">
      <Link to="/">
        <motion.img
          initial={{ opacity: 0, scale: 1 }}
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
          value={query}
          onChange={handleSearch}
          className="outline-none pl-3 pr-10 py-2 rounded-xl w-48
          dark:bg-gray-800 bg-white border border-slate-600"
        />

        <FaSearch
          className="absolute right-3 top-1/2 -translate-y-1/2
          text-[#ff9a3b] text-lg cursor-pointer"
        />

        {results.map((item) => (
          <div
            key={item._id}
            className="mt-1 px-4 py-2 dark:bg-gray-800 bg-white border border-slate-600 cursor-pointer flex flex-col absolute z-50 w-full h-content dark:text-white text-black rounded-xl"
          >
            <div className="flex h-12 flex-row gap-4 justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-700 px-1 rounded-xl">
              <div>
                <Link to={`/profile/${item._id}`}>
                  <img
                    src={item.profilePicture || dp}
                    alt="dp"
                    className="w-6 h-6 rounded-full aspect-square object-cover"
                  />
                </Link>

              </div>
              <div>
                <Link to={`/profile/${item._id}`}>
                  <span className="text-sm">{item.name}</span>
                  <span className="text-xs">{item.username}</span><br />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;