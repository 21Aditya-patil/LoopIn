import React, { useState } from "react";
import { motion } from "motion/react";
import logo from "/another.svg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative max-h-screen w-full md:h-screen flex flex-col gap-10">
      <div
          onClick={toggleTheme}
          className="cursor-pointer text-[#EF5757] hover:text-[#ff9a3b] transition-all ease-in-out flex justify-end items-center text-2xl"
        >
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </div>
      <div className="flex md:flex-row flex-col gap-5 justify-center items-center md:mt-40">
        <div className="overflow-hidden flex justify-center items-center">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            rotate: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
          }}
          src={logo}
          alt="logo"
          className="md:w-96 w-40 h-40"
        />
        <motion.div
        className="absolute w-60 h-60 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.6) 0%, rgba(0,255,255,0.1) 50%, rgba(0,255,255,0) 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: 0.9,
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      </div>
      <div className="w-full md:w-[450px] h-[550px] dark:bg-gray-800 bg-[#ffffffa3] rounded-2xl">
        <div className="w-full h-full flex flex-col justify-center px-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-black dark:text-white mb-6"
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </motion.h1>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-5"
          >

            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 rounded-lg dark:bg-gray-600 bg-slate-200 outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg dark:bg-gray-600 bg-slate-200 outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
            />

            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-lg dark:bg-gray-600 bg-slate-200  outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
            />


            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="p-3 rounded-lg dark:bg-gray-600 bg-slate-200  outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
              />
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-all"
            >
              {isLogin ? "Login" : "Sign Up"}
            </motion.button>
          </motion.form>

          <div className="mt-6 text-center dark:text-gray-300">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-orange-400 underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-orange-400 underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Auth;
