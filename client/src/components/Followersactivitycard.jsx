import React, { useState } from "react";
import { followers } from "../Data/followersData";
import { motion } from "motion/react";

function Followersactivitycard() {

  const [followStates, setFollowStates] = useState(
    followers.reduce((acc, _, id) => ({ ...acc, [id]: true }), {})
  )

  const toggleFol = (id) => {
    setFollowStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="w-full rounded-xl flex flex-col text-sm gap-4">
      <h4>Who is following you?</h4>

      {followers.map((follower, id) => (
        <div key={id} className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={follower.img}
              alt="dp"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="font-bold">{follower.name}</span>
              <span>{follower.username}</span>
            </div>
          </div>
          <motion.button
            whileHover={{
              scale: 0.9,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5 }}
            onClick={() => toggleFol(id)}
            className={`px-4 py-1 rounded-full font-semibold ${followStates[id] ? 'bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white' : 'bg-gray-300 text-black'} `}>
            {followStates[id] ? "Follow" : "Unfollow"}

          </motion.button>
        </div>
      ))}
    </div>
  );
}

export default Followersactivitycard;
