import React, { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";

import InfoModel from "./InfoModel";
import { logout } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";

function InfoCard() {
  const [openModel, setOpenModel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-3 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] p-4 rounded-2xl h-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-gray-600 pb-2">
        <h4>Your Info</h4>
        <FaRegPenToSquare
          className="cursor-pointer"
          onClick={() => setOpenModel(true)}
        />
      </div>

      {openModel && <InfoModel modelClose={() => setOpenModel(false)} />}

      {/* Username */}
      <div>
        <span>
          <b>Username: </b>
        </span>
        <span>@{user.username}</span>
      </div>

      {/* Name */}
      <div>
        <span>
          <b>Name: </b>
        </span>
        <span>{user.name}</span>
      </div>

      {/* Location */}
      <div>
        <span>
          <b>Stream: </b>
        </span>
        <span>{user.stream || "Not Added yet"}</span>
      </div>

      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-slate-200 dark:bg-white/5 dark:text-slate-200 text-black px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Logout */}
      <motion.button
        whileHover={{
          scale: 0.9,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          if (window.confirm("Are you sure you want to logout?")) {
            dispatch(logout());
            navigate("/auth");
          }
        }}
        className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-xl font-bold px-6 py-1 hover:bg-[#faad64] mt-8"
      >
        Logout
      </motion.button>
    </div>
  );
}

export default InfoCard;
