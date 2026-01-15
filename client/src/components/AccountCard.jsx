import React from "react";
import { useState } from "react";
import cover from "/cover.jpg";
import one from "/one.jpg";
import InfoModel from "./InfoModel";

function AccountCard() {
  const [openModel, setOpenModel] = useState(false);
  return (
    <div className="w-full rounded-2xl p-1 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 dark:shadow-xsoft dark:shadow-[#ff9a3b] shadow-[#ff9a3b] shadow-soft bg-[#ffffffa3]">
      <div className="dark:bg-[#0b1220] bg-white rounded-2xl overflow-hidden relative dark:text-white text-black">
        {/* Cover */}
        <div
          className="h-40 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${cover})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            aria-label="Edit cover"
            className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-black dark:text-white px-3 py-1 rounded-md text-xs flex items-center gap-2 transition"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-0 ">
          <div className="flex items-end gap-4 -mt-12">
            <div className="relative">
              <img
                src={one}
                alt="Vineet"
                className="w-28 h-28 rounded-full ring-4  ring-[#0b1220] object-cover shadow-xl"
              />
              <span className="absolute right-0 bottom-0 w-4 h-4 bg-green-400 rounded-full ring-2 ring-[#0b1220]" />
            </div>

            <div className="flex-1 mt-12">
              <h2 className="dark:text-white text-black text-xl font-semibold">
                Vineet
              </h2>
              <p className="text-xs dark:text-slate-400 text-black">
                @vineet_dev
              </p>
              <p className="text-sm dark:text-slate-300 text-black mt-1">
                Web Developer • Bengaluru
              </p>
              <p className="mt-1 dark:text-slate-200 text-black text-[14px]">
                Passionate about building beautiful and accessible user
                interfaces. I love crafting delightful experiences and solving
                problems with elegant code.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs bg-slate-200 dark:bg-white/5 dark:text-slate-200 text-black px-2 py-1 rounded-full">
                  React
                </span>
                <span className="text-xs bg-slate-200 dark:bg-white/5 dark:text-slate-200 text-black px-2 py-1 rounded-full">
                  Node.js
                </span>
                <span className="text-xs bg-slate-200 dark:bg-white/5 dark:text-slate-200 text-black px-2 py-1 rounded-full">
                  Tailwind
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="dark:text-white text-black font-bold text-lg">
                120
              </p>
              <p className="text-xs text-slate-400">Posts</p>
            </div>
            <div>
              <p className="dark:text-white text-black font-bold text-lg">
                5.2k
              </p>
              <p className="text-xs text-slate-400">Followers</p>
            </div>
            <div>
              <p className="dark:text-white text-black font-bold text-lg">10</p>
              <p className="text-xs text-slate-400">Following</p>
            </div>
          </div>

          <div className="mt-5 lg:ml-32 flex items-center justify-start gap-3">
            <button
              className="bg-transparent w-20 border border-slate-700 dark:text-slate-200 text-black  py-2 rounded-lg shadow-md transition hover:bg-white/"
              onClick={() => setOpenModel(true)}
            >
              Edit
            </button>
            {openModel && <InfoModel modelClose={() => setOpenModel(false)} />}
            <button className="bg-transparent border border-slate-700 dark:text-slate-200 text-black py-2 px-4 rounded-lg hover:bg-white/5 transition">
              Message
            </button>
            <button
              aria-label="More"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between dark:text-slate-400 text-slate-700 text-sm">
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="dark:text-slate-300 hover:text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="dark:text-slate-300 hover:text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5V24H0zM7 8h4.8v2.2h.1C13.2 8.7 15.3 8 17.9 8 22.6 8 24 10.3 24 14.8V24h-5v-8.6c0-2-.1-4.6-2.8-4.6-2.8 0-3.2 2.1-3.2 4.4V24H7z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="dark:text-slate-300 hover:text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 .5C5.65.5.5 5.64.5 12c0 5.08 3.29 9.39 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.95.1-.74.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.18-3.11-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.85 1.18 3.11 0 4.43-2.7 5.4-5.28 5.69.41.35.77 1.03.77 2.08v3.09c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.36-5.15-11.5-12-11.5z" />
                </svg>
              </a>
            </div>

            <div className="text-xs">Member since 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
