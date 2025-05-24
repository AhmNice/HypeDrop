import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const ChangePasswordForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [formErrors, setFormErrors] = useState("");
  const { user,updatePassword, success, error, isLoading, resetAuthState } = useAuthStore();

  // Reset auth state on unmount
  useEffect(() => () => resetAuthState(), [resetAuthState]);

  // Handle success state
  useEffect(() => {
    if (success) {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      onSuccess?.();
    }
  }, [success, onSuccess]);

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!formData.currentPassword) {
      setFormErrors("Current password is required");
      return false;
    }

    if (!regex.test(formData.newPassword)) {
      setFormErrors(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
      );
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setFormErrors("Passwords do not match");
      return false;
    }

    if (formData.currentPassword === formData.newPassword) {
      setFormErrors("New password must be different from current password");
      return false;
    }

    setFormErrors("");
    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear errors when user starts typing
    if (formErrors) setFormErrors("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        await updatePassword(formData.currentPassword, formData.newPassword, user._id);
      } catch (err) {
        console.error("Password update failed:", err.message);
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-full w-full mx-auto p-6 bg-white rounded-lg "
      >


        {/* Status Messages */}
        <div className="mb-4 space-y-2">
          <AnimatePresence>
            {(formErrors || error) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start p-3 bg-red-50 text-red-600 rounded-md"
              >
                <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{formErrors || error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start p-3 bg-green-50 text-green-600 rounded-md"
              >
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              id: "currentPassword",
              label: "Current Password",
              field: "current"
            },
            {
              id: "newPassword",
              label: "New Password",
              field: "new"
            },
            {
              id: "confirmPassword",
              label: "Confirm New Password",
              field: "confirm"
            }
          ].map(({ id, label, field }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <div className="relative">
                <input
                  id={id}
                  type={showPassword[field] ? "text" : "password"}
                  value={formData[id]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword[field] ? "Hide password" : "Show password"}
                >
                  {showPassword[field] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </motion.button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChangePasswordForm;