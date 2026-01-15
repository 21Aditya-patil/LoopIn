import React, { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { motion } from "motion/react";
import InfoModel from "./InfoModel";

function InfoCard() {
  const [openModel, setOpenModel] = useState(false);
  return (
    <div className="flex flex-col gap-3 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] p-4 rounded-2xl h-auto">
      <div className="flex items-center justify-between border-b-2 border-gray-600">
        <h4>Your Info</h4>
        <FaRegPenToSquare
          className="cursor-pointer"
          onClick={() => setOpenModel(true)}
        />
      </div>
      {openModel && <InfoModel modelClose={() => setOpenModel(false)} />}
      <div>
        <span>
          <b>Username: </b>
        </span>
        <span>@vineet_dev</span>
      </div>

      <div>
        <span>
          <b>Name: </b>
        </span>
        <span>Vineet</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-slate-200 dark:bg-white/5 dark:text-slate-200 text-black px-2 py-1 rounded-full">
          React
        </span>
        <span className="text-xs bg-slate-200 dark:bg-white/5 dark:text-slate-200 text-black px-2 py-1 rounded-full">
          Node.js
        </span>
        <span className="text-xs bg-slate-200 dark:bg-white/5 dark:text-slate-200 text-black px-2 py-1 rounded-full">
          Tailwind
        </span>
      </div>

      <motion.button
        whileHover={{
          scale: 0.9,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-xl font-bold px-6 py-1 hover:bg-[#faad64] mt-8"
      >
        Logout
      </motion.button>
    </div>
  );
}

export default InfoCard;
