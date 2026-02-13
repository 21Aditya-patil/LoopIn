import React, { useState, useRef } from "react";
import dp from "/one.jpg";
import { MdInsertPhoto } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { useSelector } from "react-redux" 

function Postshare() {
  const [media, setMedia] = useState(null);

  const imageRef = useRef();
  const videoRef = useRef();
  const { user } = useSelector((state) => state.auth.user)

  const onMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setMedia({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
        file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPost = {
    }
  }

  return (
    <div className="flex gap-4 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] p-4 rounded-2xl dark:shadow-xsoft shadow-soft">
      
      {/* Profile Image */}
      <img src={dp} alt="dp" className="w-10 h-10 rounded-full" />

      <div className="flex w-full flex-col">
        
        {/* Input */}
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full text-xl outline-none border-none mb-2 dark:bg-gray-600 bg-slate-200 p-2 rounded-xl"
        />

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">

            {/* Image Upload */}
            <div
              onClick={() => imageRef.current.click()}
              className="pt-4 px-2 flex items-center gap-1 text-[#f9a225] text-2xl md:text-lg hover:text-[#f95f35] cursor-pointer"
            >
              <MdInsertPhoto />
              <span className="hidden md:flex">Photo</span>
            </div>

            {/* Video Upload */}
            <div
              onClick={() => videoRef.current.click()}
              className="pt-4 px-2 flex items-center gap-1 text-[#f9a225] text-2xl md:text-lg hover:text-[#f95f35] cursor-pointer"
            >
              <FaVideo />
              <span className="hidden md:flex">Video</span>
            </div>
          </div>

          {/* Post Button */}
          <motion.button
            whileHover={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-xl font-bold px-6 py-1"
          >
            Post
          </motion.button>
        </div>

        {/* Hidden Inputs */}
        <input
          type="file"
          accept="image/*"
          ref={imageRef}
          onChange={onMediaChange}
          hidden
        />

        <input
          type="file"
          accept="video/*"
          ref={videoRef}
          onChange={onMediaChange}
          hidden
        />

        {/* Media Preview */}
        {media && (
          <div className="relative mt-4">
            <IoCloseOutline
              onClick={() => setMedia(null)}
              className="cursor-pointer absolute right-4 top-2 text-2xl text-white bg-black/40 rounded-full z-20"
            />

            {media.type === "image" ? (
              <img
                src={media.url}
                alt="preview"
                className="rounded-2xl w-full max-h-80 object-cover"
              />
            ) : (
              <video
                src={media.url}
                controls
                className="rounded-2xl w-full max-h-80"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Postshare;
