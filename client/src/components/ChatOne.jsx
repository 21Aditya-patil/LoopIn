import React from "react";

function ChatOne({ data }) {
  return (
    <div className="w-full bg-[#ffffffa3] dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 rounded-lg min-h-16 border-b border-slate-900 dark:border-gray-600 p-2 flex items-start gap-3 mb-1 cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-700">
      <img
        src={data.profile}
        alt="dp"
        className="w-10 h-10 rounded-full flex-shrink-0"
      />

      <div className="flex justify-between w-full">
        <div className="flex flex-col text-start w-[75%] sm:w-auto">
          <span className="font-bold text-base leading-tight">{data.name}</span>

          <span className="dark:text-gray-400 text-sm leading-snug line-clamp-2">
            {data.lastMessage}
          </span>
        </div>

        <span className="dark:text-gray-400 text-xs whitespace-nowrap ml-2 mt-1">
          {data.time}
        </span>
      </div>
    </div>
  );
}

export default ChatOne;
