import "./App.css";
import { motion } from "motion/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Chats from "./pages/Chats";
import Account from "./pages/Account";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-4 dark:bg-[#121212] bg-[#f3f3f3] overflow-x-hidden min-h-screen dark:text-white">
          <motion.div
            className="hidden md:block absolute w-80 h-56 bg-gradient-to-br from-[#ff9a3b] to-[#fccc89] dark:opacity-55 rounded-[50%] blur-3xl top-[70%] -right-32"
            animate={{
              y: [0, -150, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="absolute w-80 h-56 bg-gradient-to-br from-[#f9a225] to-[#fccc89] dark:opacity-45 rounded-[50%] blur-3xl top-[36%] -left-32"
            animate={{
              y: [0, -150, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />}
            />

            <Route
              path="/auth"
              element={user ? <Navigate to="/home" /> : <Auth />}
            />

            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/auth" />}
            />

            <Route path="/events" element={<Events />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
