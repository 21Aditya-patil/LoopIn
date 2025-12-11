import React, { useState } from "react";
import EventModel from "./EventModel";
import { motion } from "motion/react";

function EventsPost({ event, openEvent }) {
  const [showModel, setShowModel] = useState(false)
  return (
    <div className="w-full dark:bg-gray-800 bg-[#ffffffa3] rounded-xl p-4 dark:shadow-[#ff9a3b] shadow-[#ff9a3b] shadow-soft dark:shadow-xsoft flex flex-col gap-4 h-full">
      <div className="rounded-xl overflow-hidden">
        <img src={event.img} alt="Poster" className="w-full rounded-xl h-48 object-cover" />
      </div>
      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <h1 className="text-xl font-bold">{event.title}</h1>
        <p className="text-sm flex-1">{event.desc}</p>
        <span className="text-slate-400 text-sm">{event.created}</span>
      </div>
      <motion.button
      whileHover={{
              scale: 0.9,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-lg font-bold px-6 py-2 hover:bg-[#faad64] text-lg w-full"
        onClick={() => setShowModel(true)}
      >
        View more
      </motion.button>
      {showModel && <EventModel event={event} close={() => setShowModel(false)}/> }
    </div>
  );
}

export default EventsPost;
