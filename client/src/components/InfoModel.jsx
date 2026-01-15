import React from "react";
import { IoIosClose } from "react-icons/io";
import { motion } from "motion/react";

function InfoModel({ modelClose }) {
  return (
    <div className="fixed inset-0 bg-[#ffffffa3] text-black dark:text-white dark:bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-whitetext-black bg-white dark: rounded-xl p-6 w-[90%] max-w-2xl h-auto shadow-lg"
      >
        <div className="flex justify-between items-center mb-6 border-b-2 border-slate-600">
          <h2 className="text-xl font-semibold mb-2">Your Info</h2>
          <IoIosClose
            className="text-3xl cursor-pointer"
            onClick={modelClose}
          />
        </div>
        <div>
          <form className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                className="bg-transparent outline-none border border-slate-700 rounded-lg p-2 w-full"
                name="UserName"
                placeholder="Username"
              />

              <input
                type="text"
                className="bg-transparent outline-none border border-slate-700 rounded-lg p-2 w-full"
                name="Name"
                placeholder="Name"
              />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                className="bg-transparent outline-none border border-slate-700 rounded-lg p-2 w-full"
                name="Works at"
                placeholder="Works at"
              />
              <input
                type="text"
                className="bg-transparent outline-none border border-slate-700 rounded-lg p-2 w-full"
                name="Role"
                placeholder="Role"
              />
            </div>

            <div className="flex gap-2 ">
              <input
                type="text"
                className="bg-transparent outline-none border border-slate-700 rounded-lg p-2 w-full"
                name="Skills"
                placeholder="Skills"
              />

              <input
                type="text"
                className="bg-transparent outline-none border border-slate-700 rounded-lg p-2 w-full"
                name="Country"
                placeholder="Country"
              />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                className="bg-transparent outline-none border border-slate-700 rounded-lg p-2 w-full"
                name="About"
                placeholder="About"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* Profile Image */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-black  dark:text-slate-300 w-24">
                    Profile Image
                  </span>

                  <label className="cursor-pointer flex items-center gap-3">
                    <input type="file" className="hidden" />
                    <div className="px-4 py-2 bg-slate-200 dark:bg-white/5 border border-slate-600 rounded-lg text-sm text-black  dark:text-slate-200 hover:bg-white/10 transition">
                      Choose File
                    </div>
                  </label>
                </div>

                {/* Cover Image */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-black dark:text-slate-300 w-24">
                    Cover Image
                  </span>

                  <label className="cursor-pointer flex items-center gap-3">
                    <input type="file" className="hidden" />
                    <div className="px-4 py-2 bg-slate-200 dark:bg-white/5 border border-slate-600 rounded-lg text-sm text-black  dark:text-slate-200 hover:bg-white/10 transition">
                      Choose File
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 0.9,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-xl font-bold px-6 py-2 hover:bg-[#faad64] mt-4"
            >
              Update
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default InfoModel;
