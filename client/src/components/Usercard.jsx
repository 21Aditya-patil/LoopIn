import React from "react";
import cover from "/cover.jpg";
import dp from "/default-avatar.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Usercard() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <div className="flex flex-col w-full rounded-2xl border dark:border-gray-600 border-gray-200 relative gap-4 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] p-3 shadow-[#ff9a3b] dark:shadow-xsoft shadow-soft">

      {/* Cover + DP */}
      <div className="relative flex flex-col justify-center items-center">
        <img
          src={user?.coverPicture || cover}
          alt="bg"
          className="w-full h-28 sm:h-32 object-cover rounded-xl"
        />

        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 -bottom-10">
          <img
            src={user?.profilePicture || dp}
            alt="dp"
            className="w-full h-full rounded-full object-cover shadow-lg shadow-gray-900 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          />
        </div>
      </div>

      {/* Name Section */}
      <div className="flex flex-col items-center mt-12 gap-1 text-center">
        <span className="font-bold text-base sm:text-lg">
          {user?.name}
        </span>
        <span className="text-sm text-gray-400">
          @{user?.username}
        </span>
      </div>

      {/* Stats */}
      <div>
        <hr className="mx-6 border border-gray-400 opacity-30" />

        <div className="flex items-center justify-evenly py-3 text-center">
          <div>
            <span className="font-bold text-lg">
              {user?.followers?.length || 0}
            </span>
            <p className="text-xs sm:text-sm text-gray-400">
              Followers
            </p>
          </div>

          <div>
            <span className="font-bold text-lg">
              {user?.following?.length || 0}
            </span>
            <p className="text-xs sm:text-sm text-gray-400">
              Following
            </p>
          </div>
        </div>

        <hr className="mx-6 border border-gray-400 opacity-30" />
      </div>

      {/* Link */}
      <Link
        to="/account"
        className="self-center font-bold text-[#ff9a3b] hover:text-[#fccc89] transition"
      >
        My Profile
      </Link>
    </div>
  );
}

export default Usercard;