import React from "react";
import { IoIosClose } from "react-icons/io";
import { FaRegHeart, FaRegBookmark, FaShare } from "react-icons/fa";
import { motion } from "motion/react";
import {
  MdGroups,
  MdLocationOn,
  MdPhone,
  MdAppRegistration,
} from "react-icons/md";

function EventModel({ close, event }) {
  return (
    <div className="fixed inset-0 bg-[#ffffffa3] dark:text-white dark:bg-[#00000080] bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="m-1 h-[650px] w-full lg:w-[650px] bg-white dark:shadow-[#ff9a3b] shadow-[#ff9a3b] shadow-soft dark:shadow-xsoft dark:bg-gray-800 rounded-xl p-4 flex flex-col gap-4 justify-center"
      >
        <div className="flex justify-between text-2xl items-center border-b border-slate-500">
          <span>{event.title}</span>
          <IoIosClose
            onClick={close}
            className="cursor-pointer hover:bg-slate-600 rounded-full text-3xl"
          />
        </div>
        <div className="rounded-xl overflow-hidden">
          <img
            src={event.img}
            alt="Poster"
            className="w-full rounded-xl h-44 object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto">
          <div>
            <p className="text-lg">{event.desc}</p>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <MdGroups />
              <p className="font-bold text-lg">Organizers</p>
            </div>
            <span>{event.organizerDetails}</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <MdLocationOn />
              <p className="font-bold text-lg">Venue</p>
            </div>
            <span>{event.venue}</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <MdPhone />
              <p className="font-bold text-lg">Contact</p>
            </div>
            <span>{event.contact}</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <MdAppRegistration />
              <p className="font-bold text-lg">How To Register?</p>
            </div>
            <span>{event.howToRegister}</span>
          </div>
        </div>
        <div className="bottom-0 flex gap-6 items-center border-t border-slate-500 ">
          <div className="flex gap-1 items-center mt-2">
            <FaRegHeart />
            <span>{event.likes}</span>
          </div>
          <div className="flex gap-1 items-center mt-2">
            <FaShare />
            <span>{event.shares}</span>
          </div>
          <div className="flex gap-1 items-center mt-2">
            <FaRegBookmark />
            <span>{event.saved}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EventModel;
