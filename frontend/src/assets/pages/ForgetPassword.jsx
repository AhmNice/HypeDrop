import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload={
      email:email
    }

    // Simulate API call
    try {
      const res = await fetch(`${API_BASE_URL}/forget-password`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
      });
      const data = await res.json()
      if(res.ok){
        toast.success(data.message || 'email sent')
        setIsSubmitted(true)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
            <p className="text-gray-600">
              {isSubmitted
                ? "We've sent a password reset link to your email."
                : "Enter your email to receive a password reset link."
              }
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all ${
                  isLoading ? 'opacity-80' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-6">
                If an account exists for {email}, you'll receive an email with instructions to reset your password.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Try another email
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-gray-600 text-sm">
            Remember your password?{' '}
            <a href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;