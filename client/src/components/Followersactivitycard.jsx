import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { followUserThunk } from "../reducers/userSlice";
import dp from "/default-avatar.jpg";

function Followersactivitycard() {
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchSuggestions();
    }
  }, [user?._id, user?.following]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/user/suggestions/${user._id}`
      );

      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (targetUserId) => {
    await dispatch(followUserThunk(targetUserId));

    // Refetch suggestions after following
    fetchSuggestions();
  };

  return (
    <div className="w-full rounded-xl flex flex-col text-sm gap-4">
      <h4>Who you may know</h4>

      {loading && (
        <span className="text-gray-400 text-sm">
          Loading suggestions...
        </span>
      )}

      {!loading && suggestions.length === 0 && (
        <span className="text-gray-400 text-sm">
          No suggestions available
        </span>
      )}

      {suggestions.map((person) => (
        <div
          key={person._id}
          className="flex items-center justify-between"
        >
          <div className="flex gap-2 items-center">
            <img
              src={person.profilePicture || dp}
              alt="dp"
              className="w-8 h-8 rounded-full aspect-square object-cover"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="font-bold">{person.name}</span>
              <span className="text-gray-400 text-xs">
                @{person.username}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 0.95 }}
            onClick={() => handleFollow(person._id)}
            className="px-4 py-2 rounded-xl font-semibold bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white"
          >
            Follow
          </motion.button>
        </div>
      ))}
    </div>
  );
}

export default Followersactivitycard;