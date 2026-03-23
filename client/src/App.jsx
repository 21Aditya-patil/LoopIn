import { Toaster } from "react-hot-toast";
import "./App.css";
import { motion } from "motion/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Chats from "./pages/Chats";
import Account from "./pages/Account";
import Profile from "./pages/Profile"
import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.theme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative min-h-screen dark:bg-[#121212] bg-[#f3f3f3] overflow-x-hidden dark:text-white">

          {/* Background Glow Layer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="hidden md:block absolute w-80 h-56 bg-gradient-to-br from-[#ff9a3b] to-[#fccc89] dark:opacity-55 rounded-full blur-3xl top-[70%] right-0 translate-x-1/2"
              animate={{ y: [0, -150, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-80 h-56 bg-gradient-to-br from-[#f9a225] to-[#fccc89] dark:opacity-45 rounded-full blur-3xl top-[36%] left-0 -translate-x-1/2"
              animate={{ y: [0, -150, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main Content Layer */}
          <div className="relative z-10 p-4">
            <Toaster position="top-right" />

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

              <Route
                path="/events"
                element={user ? <Events /> : <Navigate to="/auth" />}
              />
              <Route
                path="/chats"
                element={user ? <Chats /> : <Navigate to="/auth" />}
              />
              <Route
                path="/account"
                element={user ? <Account /> : <Navigate to="/auth" />}
              />
              <Route
                path="/profile/:id"
                element={user ? <Profile /> : <Navigate to="/auth" />}
              />

            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;