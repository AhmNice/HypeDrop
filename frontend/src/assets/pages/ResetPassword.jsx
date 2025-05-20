import React, { useState } from 'react';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, LockKeyhole, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id: token } = useParams();
  const payload ={
    password:password,
    token:token
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    try {
      setIsLoading(true)
      const res = await fetch (`${API_BASE_URL}/reset-password`,{
        headers:{
          'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(payload)
      });
      const data = await res.json()
      console.log(res)

      if(res.ok){
        setIsSuccess(true);
        toast.success('Password reset successfully!');
        navigate('/login')
      }else{
        toast.error(data.message)
        console.log(data.message)
      }

    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <LockKeyhole className="text-indigo-600 h-6 w-6" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Reset Your Password</h1>
                <p className="text-gray-600">Create a new secure password</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="Re-enter your password"
                    required
                    minLength={8}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md shadow-md transition-all flex items-center justify-center ${
                    isLoading ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-6">You can now login with your new password.</p>
              <NavLink
                to="/login"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Back to Login
              </NavLink>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Remember your password?{' '}
            <NavLink to="/login" className="text-indigo-600 hover:underline font-medium">
              Sign in
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;