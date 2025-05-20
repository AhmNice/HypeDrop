import React, { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoArrowForward } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import useResetAuthOnMount from "../hooks/useResetAuthOnMount";

const ArtistForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
    stageName: "",
    fullname: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const { error, isLoading, signup, success, resetAuthState } = useAuthStore();
  useResetAuthOnMount();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePasswordVisible = (e) => {
    e.preventDefault();
    setIsVisible((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.cpassword)
      newErrors.cpassword = "Passwords do not match";
    if (!formData.stageName.trim()) newErrors.stageName = "Stage name required";
    if (!formData.fullname.trim()) newErrors.fullname = "Full name required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        localStorage.setItem("userType", "artist");
        await signup(formData);
        navigate("/email-verification");
        window.location.reload()
      }
    } catch (error) {
      console.error;
      toast.error(error.message);
    }
  };
  useEffect(() => {
    console.log("Starting");
    const timer = setTimeout(() => {
      if (success) {
        navigate("/email-verification");
        return () => clearTimeout(timer);
      }
    }, 500);
  }, [success,navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl w-full max-w-sm shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">
          <h1 className="text-xl font-bold">Create Artist Account</h1>
          <p className="text-indigo-100 text-sm">Join our community</p>
        </div>

        <form className="p-5 space-y-4" onSubmit={handleSubmit}>
          {/* Fullname Input */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="fullname"
              placeholder="Your real name"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
            />
            <AnimatePresence>
              {errors.fullname && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs"
                >
                  {errors.fullname}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Stage Name Input */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              Stage Name
            </label>
            <input
              name="stageName"
              placeholder="Public display name"
              value={formData.stageName}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${
                errors.stageName ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
            />
            <AnimatePresence>
              {errors.stageName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs"
                >
                  {errors.stageName}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              Password
            </label>
            <div
              className={`flex items-center rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition`}
            >
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={handlePasswordVisible}
                className="px-2 text-gray-500 hover:text-indigo-600 transition"
              >
                {isVisible ? (
                  <IoEyeOffOutline size={16} />
                ) : (
                  <IoEyeOutline size={16} />
                )}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs"
                >
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              Confirm Password
            </label>
            <div
              className={`flex items-center rounded-lg border ${
                errors.cpassword ? "border-red-500" : "border-gray-300"
              } focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition`}
            >
              <input
                type={isVisible ? "text" : "password"}
                name="cpassword"
                placeholder="••••••••"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={handlePasswordVisible}
                className="px-2 text-gray-500 hover:text-indigo-600 transition"
              >
                {isVisible ? (
                  <IoEyeOffOutline size={16} />
                ) : (
                  <IoEyeOutline size={16} />
                )}
              </button>
            </div>
            <AnimatePresence>
              {errors.cpassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs"
                >
                  {errors.cpassword}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all ${
              isLoading ? "opacity-80" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <Loader className="animate-spin mx-auto" size={20} />
                <span className="InterRegular">Submitting</span>
              </span>
            ) : (
              <>
                Create Account
                <IoArrowForward className="ml-1" size={14} />
              </>
            )}
          </motion.button>

          <p className="text-center text-xs text-gray-500">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign in
            </NavLink>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default ArtistForm;
