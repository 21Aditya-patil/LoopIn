import React, { useState } from "react";
import EventModel from "./EventModel";
import { motion } from "motion/react";

function EventsPost({ event, openEvent }) {
  const [showModel, setShowModel] = useState(false)
  return (
    <div className="w-full dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] rounded-xl p-2 md:p-4 dark:shadow-[#ff9a3b] shadow-[#ff9a3b] shadow-soft dark:shadow-xsoft flex flex-col gap-4 h-full">
      <div className="rounded-xl overflow-hidden">
        <img src={event.img} alt="Poster" className="w-full rounded-xl h-32 md:h-48 object-cover" />
      </div>
      <div className="p-2 md:p-4 space-y-2 flex-1 flex flex-col">
        <h1 className="text-base md:text-xl font-bold">{event.title}</h1>
        <p className="text-xs md:text-sm flex-1">{event.desc}</p>
        <span className="text-slate-400 text-xs md:text-sm">{event.created}</span>
      </div>
      <motion.button
      whileHover={{
              scale: 0.9,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-lg font-bold px-4 md:px-6 py-1 md:py-2 hover:bg-[#faad64] text-sm md:text-lg w-full"
        onClick={() => setShowModel(true)}
      >
        View more
      </motion.button>
      {showModel && <EventModel event={event} close={() => setShowModel(false)}/> }
    </div>
  );
}

export default EventsPost;
