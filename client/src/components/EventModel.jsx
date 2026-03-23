import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { IoIosClose } from "react-icons/io";

function EventModel({ eventId, close }) {
  const events = useSelector((state) => state.events.events);
  const event = events.find((e) => e._id === eventId);

  // ESC close + lock scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [close]);

  if (!event) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-2"
      onClick={close}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[650px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-2xl"
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="font-bold text-lg">{event.title}</h2>
          <IoIosClose
            onClick={close}
            className="text-3xl cursor-pointer"
          />
        </div>

        <img
          src={event.img}
          alt="Poster"
          className="w-full h-44 object-cover rounded-xl mt-3"
        />

        <p className="mt-3">{event.desc}</p>
        <p className="mt-3"><b>Venue: </b><br />{event.venue}</p>
        <p className="mt-3"><b>Contact: </b><br />{event.contact}</p>
        <p className="mt-3"><b>Organizers: </b><br />{event.organizer}</p>
        <p className="mt-3"><b>How to Register?: </b><br />{event.howToRegister}</p>
      </motion.div>
    </motion.div>
  );
}

export default EventModel;