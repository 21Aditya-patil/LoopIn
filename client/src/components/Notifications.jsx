import React from "react";
import { FaLightbulb } from "react-icons/fa";
import collegeTips from "../Data/collegeTips";

function Notifications() {
  const randomTip = collegeTips[Math.floor(Math.random() * collegeTips.length)];

  return (
    <div
      className="relative p-5 rounded-2xl overflow-hidden bg-[#ffffffa3]
      dark:bg-gradient-to-br from-blue-900/40 via-slate-900 to-black
      backdrop-blur-xl border border-blue-800/30
      animate-glowPulse
      dark:text-white text-black "
    >
      <div className="flex items-center gap-3 border-b border-blue-800/30 pb-3">
        <div className="p-2 rounded-full bg-blue-600/20 text-blue-400">
          <FaLightbulb />
        </div>
        <h3 className="text-lg font-semibold tracking-wide">Tip of the Day</h3>
      </div>

      <p className="mt-4 text-sm text-gray-800 dark:text-gray-300 leading-relaxed">{randomTip}</p>
    </div>
  );
}

export default Notifications;
