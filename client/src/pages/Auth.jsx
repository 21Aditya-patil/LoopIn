import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import logo from "/another.svg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp, clearError, clearSignupSuccess } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // ✅ updated selectors
  const { user, loading, error, isSignupSuccess } = useSelector((state) => state.auth);

  const { theme, toggleTheme } = useTheme();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });


  const [confirmPass, setConfirmPass] = useState(false);

  // ✅ Handle successful signup - switch to login
  useEffect(() => {
    if (isSignupSuccess) {
      setIsLogin(true);
      clearForm();
      dispatch(clearSignupSuccess());
    }
  }, [isSignupSuccess, dispatch]);


  // Redirect after login
  useEffect(() => {
    if (user && user._id) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setConfirmPass(false);
    dispatch(clearError());
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (data.password !== data.confirmPassword) {
        setConfirmPass(true);
        return;
      }

      const { confirmPassword, ...userData } = data;
      dispatch(signUp(userData));
    } else {
      dispatch(logIn(data));
    }
  };

  const clearForm = () => {
    setConfirmPass(false);
    setData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };

  return (
    <div className="relative max-h-screen w-full md:h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: [0, 4, -4, 0] }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            rotate: { repeat: Infinity, duration: 3.5 },
          }}
          src={logo}
          alt="logo"
          className="md:w-36 w-40 h-10 md:h-16"
        />

        <div
          onClick={toggleTheme}
          className="cursor-pointer text-[#EF5757] hover:text-[#ff9a3b] text-2xl"
        >
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </div>
      </div>

      {/* Auth Card */}
      <div className="flex justify-center items-center">
        <div className="w-full md:w-[450px] py-10 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] rounded-2xl">
          <div className="w-full h-full flex flex-col justify-center px-10">
            <h1 className="text-4xl font-bold dark:text-white mb-6">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            {isLogin && isSignupSuccess && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm">
                Account created successfully! Please login with your credentials.
              </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={data.name}
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-slate-200 dark:bg-gray-600 dark:text-white"
                />
              )}


              <input
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
                className="p-3 rounded-lg bg-slate-200 dark:bg-gray-600 dark:text-white"
              />

              {!isLogin && (
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-slate-200 dark:bg-gray-600 dark:text-white"
                />
              )}

              <div className="flex gap-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-slate-200 dark:bg-gray-600 dark:text-white w-full"
                />

                {!isLogin && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-slate-200 dark:bg-gray-600 dark:text-white w-full"
                  />
                )}
              </div>

              {confirmPass && (
                <p className="text-red-500 text-sm">
                  Passwords do not match
                </p>
              )}

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {!isLogin && (
                <select
                  name="role"
                  value={data.role}
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-slate-200 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-orange-400 font-semibold rounded-lg hover:bg-orange-500"
              >
                {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center dark:text-gray-300">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      clearForm();
                    }}
                    className="text-orange-400 underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      clearForm();
                    }}
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
