import React from "react";
import { followers } from "../Data/followersData";

function Followersactivitycard() {
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
          <button className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-md font-bold px-4 py-1 hover:-translate-x-1 hover:bg-[#faad64] ease-in-out transition-all">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Followersactivitycard;
