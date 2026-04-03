import { useEffect, useState } from "react";
import EventsPost from "./EventsPost";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent, createEvent } from "../reducers/eventSlice";
import CreateEventModal from "./CreateEventModal";
import { AnimatePresence } from "motion/react";

function EventSide({ withScroll = false }) {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const user = useSelector((state) => state.auth.user);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className={`relative ${withScroll ? "h-full overflow-y-auto" : "h-full"}`}>
      <div className="mt-16 lg:mt-0 p-2 flex justify-center dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900
    bg-[#ffffffa3] rounded-xl mb-4 font-bold"><h1 className="text-3xl">Events</h1></div>
      {/* EVENTS GRID */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24 lg:pt-0 min-h-full"
      >
        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}


        {events.map((event) => (
          <EventsPost
            key={event._id}
            event={event}
            isAdmin={isAdmin}
            onDelete={handleDelete}
          />
        ))}
      </motion.div>

      {/* FLOATING ADMIN BUTTON */}
      {isAdmin && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-24 right-4 lg:bottom-6 lg:right-96 bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-xl font-bold px-6 py-2 flex items-center justify-center text-xl shadow-xl z-50"
        >
          Add Event +
        </motion.button>
      )}

      <AnimatePresence>
        {showCreateModal && (
          <CreateEventModal close={() => setShowCreateModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default EventSide;
