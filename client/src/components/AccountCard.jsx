import React, { useState, useRef, useEffect } from "react";
import cover from "/cover.jpg";
import dp from "/default-avatar.jpg";
import InfoModel from "./InfoModel";
import { useDispatch, useSelector } from "react-redux";
import { logout, deleteUser } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";

function AccountCard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModel, setOpenModel] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="w-full bg-[#ffffffa3] dark:bg-[#0b1220] rounded-2xl shadow-lg relative overflow-visible">
      {/* COVER (Reduced Height) */}
      <div
        className="h-36 bg-cover bg-center rounded-t-2xl"
        style={{
          backgroundImage: `url(${user.coverPicture || cover})`,
        }}
      />

      {/* PROFILE IMAGE */}
      <div className="relative px-6">
        <div className="absolute -top-12">
          <img
            src={user.profilePicture || dp}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-[#071427] object-cover shadow-md"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-14 px-6 pb-6">
        {/* USER INFO */}
        <div className="ml-28">
          <h2 className="text-xl font-semibold text-black dark:text-white">{user.name}</h2>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            @{user.username || user.name?.toLowerCase()}
          </p>

          <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">
            {user.stream || "College"}
          </p>

          <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">
            {user.about || "No bio added yet."}
          </p>

          {/* BUTTONS */}
          <div className="mt-3 flex items-center gap-3">
            <button
              className="px-4 py-1.5 border border-slate-600 dark:border-slate-300 rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition"
              onClick={() => setOpenModel(true)}
            >
              Edit
            </button>

            {openModel && <InfoModel modelClose={() => setOpenModel(false)} />}

            <div className="relative inline-block" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
              >
                <svg
                  className="w-4 h-4 text-black dark:text-white"
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

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-100 dark:bg-[#0f172a] rounded-xl shadow-2xl border border-slate-300 dark:border-slate-700 z-[999] overflow-hidden text-sm">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?")) {
                        dispatch(logout());
                        navigate("/auth");
                      }
                    }}
                  >
                    Logout
                  </button>

                  <hr className="dark:border-slate-700 border-slate-300" />

                  <button
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900/20"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete your account? This action cannot be undone.",
                        )
                      ) {
                        dispatch(
                          deleteUser({
                            userId: user._id,
                            data: {
                              currentUserId: user._id,
                              currentUserAdminStatus: user.isAdmin,
                            },
                          }),
                        );
                        navigate("/auth");
                      }
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-6 grid grid-cols-3 text-center border-t border-slate-700 pt-4">
          <div>
            <p className="text-lg font-semibold text-black dark:text-white">
              {user.posts?.length || 0}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Posts</p>
          </div>

          <div>
            <p className="text-lg font-semibold text-black dark:text-white">
              {user.followers?.length || 0}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Followers</p>
          </div>

          <div>
            <p className="text-lg font-semibold text-black dark:text-white">
              {user.following?.length || 0}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Following</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-4 text-right text-xs text-slate-500">
          Member since {formattedDate}
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
