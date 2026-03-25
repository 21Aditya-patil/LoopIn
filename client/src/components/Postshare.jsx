import React, { useState, useRef } from "react";
import dp from "/default-avatar.jpg";
import { MdInsertPhoto } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { uploadMedia } from "../reducers/uploadSlice";
import { createPost } from "../reducers/postSlice";
import toast from "react-hot-toast";

function Postshare() {
  const dispatch = useDispatch();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");

  const imageRef = useRef();
  const videoRef = useRef();
  const desc = useRef();
  const user = useSelector((state) => state.auth.user);

  const onMediaChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const newMedia = files.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
        file,
      }));

      setMedia((prev) => (prev ? [...prev, ...newMedia] : newMedia));
    }
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let mediaUrls = [];

      if (media.length > 0) {
        const data = new FormData();
        media.forEach((item) => {
          data.append("files", item.file);
        });

        const res = await dispatch(uploadMedia(data)).unwrap();
        mediaUrls = res.map((file) => file.url);
      }

      const newPost = {
        userId: user._id,
        category,
        desc: desc.current.value,
        media: mediaUrls,
      };

      await dispatch(createPost(newPost)).unwrap();

      toast.success("New post added");

      setMedia([]);
      desc.current.value = "";
      setCategory("All");
    } catch (error) {
      toast.error("Failed to upload post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] p-4 rounded-2xl dark:shadow-xsoft shadow-soft">
      {/* Profile Image */}
      <img src={user.profilePicture || dp} alt="dp" className="w-10 h-10 rounded-full" />

      <div className="flex w-full flex-col">
        {/* Input */}
        <input
          ref={desc}
          required
          type="text"
          placeholder="What's on your mind?"
          className="w-full text-xl outline-none border-none mb-2 dark:bg-gray-600 bg-slate-200 p-2 rounded-xl"
        />
        <select
          name="category"
          required
          value={category}
          onChange={onCategoryChange}
          className="p-2 rounded-xl cursor-pointer bg-slate-200 dark:bg-gray-700 dark:text-white text-gray-400 text-xl"
        >
          <option value="All">All</option>
          <option value="Sports">Sports</option>
          <option value="Cultural">Cultural</option>
          <option value="Study">Study</option>
          <option value="Fun">Fun</option>
        </select>

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
            onClick={handleSubmit}
            disabled={loading}
            whileHover={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-xl font-bold px-6 py-1"
          >
            {loading ? "Posting..." : "Post"}
          </motion.button>
        </div>

        {/* Hidden Inputs */}
        <input
          type="file"
          accept="image/*"
          ref={imageRef}
          multiple
          onChange={onMediaChange}
          hidden
        />

        <input
          type="file"
          accept="video/*"
          ref={videoRef}
          multiple
          onChange={onMediaChange}
          hidden
        />

        {/* Media Preview */}
        {media.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {media.map((item, index) => (
              <div key={index} className="relative">
                <IoCloseOutline
                  onClick={() => setMedia(media.filter((_, i) => i !== index))}
                  className="cursor-pointer absolute right-2 top-2 text-2xl text-white bg-black/40 rounded-full z-20"
                />

                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt="preview"
                    className="rounded-2xl w-full max-h-60 object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="rounded-2xl w-full max-h-60"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Postshare;
