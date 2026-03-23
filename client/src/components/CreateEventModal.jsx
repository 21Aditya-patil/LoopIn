import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createEvent } from "../reducers/eventSlice";
import { uploadMedia } from "../reducers/uploadSlice";


function CreateEventModal({ close }) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    venue: "",
    contact: "",
    organizer: "",
    howToRegister: "",
  });

  // Close on ESC + disable background scroll
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (selectedFile) {
      const formDataUpload = new FormData();
      formDataUpload.append("files", selectedFile);

      const uploaded = await dispatch(
        uploadMedia(formDataUpload, "events"),
      ).unwrap();

      imageUrl = uploaded[0].url;
    }

    const finalEvent = {
      ...formData,
      img: imageUrl,
    };

    const result = await dispatch(createEvent(finalEvent));

    if (result.meta.requestStatus === "fulfilled") {
      close();
    }
  };

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
        className="w-full max-w-[600px] bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Event</h2>
          <IoIosClose className="text-3xl cursor-pointer" onClick={close} />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-2 rounded border dark:bg-slate-500 bg-slate-300 text-black dark:text-white"
          />

          <textarea
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            required
            className="p-2 rounded border dark:bg-slate-500 bg-slate-300 text-black dark:text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="p-2 rounded border dark:bg-slate-500 bg-slate-300 text-black dark:text-white"
          />

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            className="p-2 rounded border dark:bg-slate-500 bg-slate-300 text-black dark:text-white"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            className="p-2 rounded border dark:bg-slate-500 bg-slate-300 text-black dark:text-white"
          />

          <input
            type="text"
            name="organizer"
            placeholder="Organizer Details"
            value={formData.organizer}
            onChange={handleChange}
            className="p-2 rounded border dark:bg-slate-500 bg-slate-300 text-black dark:text-white"
          />

          <textarea
            name="howToRegister"
            placeholder="How to Register"
            value={formData.howToRegister}
            onChange={handleChange}
            className="p-2 rounded border dark:bg-slate-500 bg-slate-300 text-black dark:text-white"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white py-2 rounded-lg font-bold"
          >
            Create Event
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CreateEventModal;
