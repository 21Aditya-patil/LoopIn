import React from "react";
import EventsPost from "./EventsPost";
import { events } from "../Data/eventsData";
import { motion } from "motion/react";


function EventSide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-y-auto gap-4 pb-24 lg:pb-4 pt-16 lg:pt-0"
    >
      {events.map((event) => {
        return <EventsPost key={event.id} event={event} />;
      })}
      
    </motion.div>
  );
}

export default EventSide;
