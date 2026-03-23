import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import EventModel from "./EventModel";
import cover from "/cover.jpg";

function EventsPost({ event, isAdmin, onDelete }) {
  const [selectedEventId, setSelectedEventId] = useState(null);

  const openModal = () => {
    setSelectedEventId(event._id);
  };

  const closeModal = () => {
    setSelectedEventId(null);
  };

  return (
    <>
      <div
        className="w-full max-w-[500px] h-[420px]
    dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900
    bg-[#ffffffa3]
    rounded-xl
    p-4
    shadow-[#ff9a3b] shadow-soft
    flex flex-col"
      >
        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden h-[180px]">
          <img
            src={event?.img || cover}
            alt="Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-4 flex flex-col flex-1">
          {/* TITLE */}
          <h1 className="text-lg md:text-xl font-bold">
            {event.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-sm mt-2 text-slate-300">
            {event.desc}
          </p>

          {/* DATE */}
          <span className="text-slate-400 text-sm mt-3">
            {new Date(event.createdAt).toLocaleDateString()}
          </span>

          {/* BUTTONS AT BOTTOM */}
          <div className="mt-auto flex flex-col gap-2 pt-4">
            <motion.button
              whileHover={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-[#f9a225] to-[#f95f35]
          text-white rounded-lg font-bold py-2 w-full"
              onClick={openModal}
            >
              View More
            </motion.button>

            {isAdmin && (
              <motion.button
                whileHover={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-red-500 text-white rounded-lg font-bold py-2 w-full"
                onClick={() => onDelete(event._id)}
              >
                Delete Event
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedEventId && (
          <EventModel eventId={selectedEventId} close={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}

export default EventsPost;
