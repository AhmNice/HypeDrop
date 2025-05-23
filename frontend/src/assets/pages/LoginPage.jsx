import React, { useState, useEffect, useCallback } from 'react';
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoLockClosed,
  IoMailOutline
} from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const { login, error, isLoading, resetAuthState, isCheckingAuth, isAuthenticated, success } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | HypeDrop";
  }, []);

  const handlePasswordVisible = (e) => {
    e.preventDefault();
    setIsVisible((prev) => !prev);
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    await login(email, password);
  }, [email, password, login, isLoading]);

  useEffect(() => {
    if (isAuthenticated && success) {
      const timeout = setTimeout(() => {
        toast.success("Welcome back! Redirecting...");
        navigate('/dashboard');
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, success, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(()=>{
    resetAuthState()
  },[])

  if (isCheckingAuth) {
    return (
      <div className="text-center mt-10 h-screen flex justify-center items-center">
        <Loader2 className="animate-spin mx-auto" size={50} />
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4"
            >
              <IoLockClosed className="text-indigo-600 text-2xl" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className={`relative rounded-md shadow-sm ${isFocused.email ? 'ring-2 ring-indigo-500' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMailOutline className={`h-5 w-5 ${isFocused.email ? 'text-indigo-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                  aria-label="Email Address"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>
              <div className={`relative rounded-md shadow-sm ${isFocused.password ? 'ring-2 ring-indigo-500' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosed className={`h-5 w-5 ${isFocused.password ? 'text-indigo-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type={isVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  required
                  aria-label="Password"
                  autoComplete="current-password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={handlePasswordVisible}
                    className="text-gray-500 hover:text-indigo-500 focus:outline-none"
                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                  >
                    {isVisible ? <IoEyeOffOutline className="h-5 w-5" /> : <IoEyeOutline className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-md shadow-md transition-all ${
                  isLoading ? 'opacity-80 cursor-not-allowed' : ''
                }`}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" />
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </motion.button>
            </div>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <NavLink
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                Create one
              </NavLink>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginPage;
