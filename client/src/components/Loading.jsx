import { motion } from "motion/react";
import logo from "/another.svg";

function Loading() {
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-[#f3f3f3] dark:bg-black relative">
      
      <motion.div className="hidden md:block absolute w-80 h-56 bg-gradient-to-br from-[#ff9a3b] to-[#fccc89] dark:opacity-55 rounded-[50%] blur-3xl top-[60%] -right-32"
        animate={{
          x: [0, -600, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        ></motion.div>
        <motion.div className="absolute w-80 h-56 bg-gradient-to-br from-[#ff9a3b] to-[#fccc89] dark:opacity-45 rounded-[50%] blur-3xl top-[36%] -left-32"
        animate={{
          x: [0, 600, 0],
          
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        ></motion.div>

      <motion.div
        className="absolute w-60 h-60 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.6) 0%, rgba(0,255,255,0.1) 50%, rgba(0,255,255,0) 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: 1,
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={logo}
        alt="logo"
        className="w-24 h-24 select-none absolute"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 1,
          scale: 4,
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
        }}
      />
    </div>
  );
}

export default Loading;
