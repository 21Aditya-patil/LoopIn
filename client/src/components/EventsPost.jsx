import React, { useState } from "react";

function EventsPost({ event, openEvent }) {
  return (
    <div className="w-full bg-[#ffffffa3] rounded-xl p-4 shadow-[#ff9a3b] shadow-soft flex flex-col gap-4 h-full">
      <div className="rounded-xl overflow-hidden">
        <img src={event.img} alt="Poster" className="w-full rounded-xl h-48 object-cover" />
      </div>
      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <h1 className="text-xl font-bold">{event.title}</h1>
        <p className="text-sm flex-1">{event.desc}</p>
        <span className="text-slate-400 text-sm">{event.created}</span>
      </div>
      <button
        className="bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white rounded-lg font-bold px-6 py-2 hover:-translate-y-1 hover:bg-[#faad64] ease-in-out transition-all text-lg w-full"
        onClick={openEvent}
      >
        View more
      </button>
    </div>
  );
}

export default EventsPost;
