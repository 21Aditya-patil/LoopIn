import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../reducers/authSlice";

function InfoModel({ modelClose }) {
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [username, setUsername] = useState(user.username || "");
  const [name, setName] = useState(user.name || "");
  const [stream, setStream] = useState(user.stream || "");
  const [about, setAbout] = useState(user.about || "");
  const [country, setCountry] = useState(user.location || "");
  const [skills, setSkills] = useState(
    user.skills ? user.skills.join(", ") : ""
  );

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImages = {};

    // Step 1: Upload images first (if any)
    if (profileImage || coverImage) {
      const imageFormData = new FormData();

      if (profileImage) {
        imageFormData.append("profilePicture", profileImage);
      }

      if (coverImage) {
        imageFormData.append("coverPicture", coverImage);
      }

      try {
        const uploadRes = await fetch(`${BASE_URL}/upload/users`, {
          method: "POST",
          body: imageFormData,
        });

        uploadedImages = await uploadRes.json();
      } catch (err) {
        console.error("Image upload failed:", err);
        return;
      }
    }

    //  Convert comma string → array
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    // 🔹 Step 2: Send JSON update request
    const updatedData = {
      username,
      name,
      stream,
      about,
      skills: skillsArray, // 👈 added here
      currentUserId: user._id,
      currentUserAdminStatus: user.isAdmin,
    };

    if (uploadedImages.profilePicture) {
      updatedData.profilePicture = uploadedImages.profilePicture.url;
    }

    if (uploadedImages.coverPicture) {
      updatedData.coverPicture = uploadedImages.coverPicture.url;
    }

    dispatch(updateUser({ userId: user._id, data: updatedData }));

    modelClose();
  };

  return (
    <div className="fixed inset-0 bg-[#ffffffa3] dark:bg-[#00000080] flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-white rounded-xl p-6 w-[90%] max-w-2xl shadow-lg"
      >
        <div className="flex justify-between items-center mb-6 border-b border-slate-600 pb-2">
          <h2 className="text-xl font-semibold">Your Info</h2>
          <IoIosClose
            className="text-3xl cursor-pointer"
            onClick={modelClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border border-slate-700 rounded-lg p-2 w-full"
              placeholder="Username"
            />

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-slate-700 rounded-lg p-2 w-full"
              placeholder="Name"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="bg-transparent border border-slate-700 rounded-lg p-2 w-full"
              placeholder="Stream"
            />

          </div>

          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="bg-transparent border border-slate-700 rounded-lg p-2 w-full"
            placeholder="About"
          />

          {/* 🔥 Skills Input */}
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="bg-transparent border border-slate-700 rounded-lg p-2 w-full"
            placeholder="Skills (comma separated e.g. React, Node.js, Tailwind)"
          />

          {/* Profile Image */}
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Profile Image</span>
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>

          {/* Cover Image */}
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Cover Image</span>
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 0.95 }}
            className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-xl font-bold px-6 py-2 mt-4"
          >
            Update
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default InfoModel;
