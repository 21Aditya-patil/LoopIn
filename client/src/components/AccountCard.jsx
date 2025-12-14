import React from "react";
import cover from "/cover.jpg";
import one from "/one.jpg";

function AccountCard() {
  return (
    <div className="w-full rounded-2xl border border-slate-600 bg-[#1f2937] overflow-hidden shadow-xl h-[4000px]">
      {/* Cover */}
      <div className="relative h-[360px] w-full">
        <img src={cover} alt="cover" className="w-full h-full object-cover" />

        {/* DP */}
        <img
          src={one}
          alt="dp"
          className="
            absolute
            left-1/2
            -bottom-24
            -translate-x-1/2
            w-48
            h-48
            rounded-full
            object-cover
            shadow-2xl
            ring-4 ring-[#1f2937]
          "
        />
      </div>

      {/* Content */}
      <div className="pt-28 pb-8 flex flex-col items-center text-white">
        <h2 className="text-2xl font-bold">Vineet</h2>
        <p className="text-gray-300">Web Developer</p>

        <hr className="w-2/3 my-6 border-gray-500" />

        <div className="flex gap-16 text-center">
          <div>
            <p className="text-xl font-bold">255</p>
            <p className="text-gray-300">Followers</p>
          </div>
          <div>
            <p className="text-xl font-bold">255</p>
            <p className="text-gray-300">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
