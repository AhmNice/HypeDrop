import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast'


const OtpCard = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [errors, setErrors] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const {verify_email, isOtpSuccess, resetAuthState,error } = useAuthStore()
  // ✅ AUTO FOCUS first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // ✅ AUTO SUBMIT when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleSubmit(new Event('submit'));
    }
  }, [code]);

  // ✅ COUNTDOWN for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    setErrors('');

    // ✅ HANDLE PASTE
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const filled = [...code];
      for (let i = 0; i < 6; i++) {
        filled[i] = digits[i] || '';
      }
      setCode(filled);
      const next = filled.findIndex((char) => char === '');
      inputRefs.current[next !== -1 ? next : 5]?.focus();
      return;
    }

    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.some((digit) => digit === '')) {
      setErrors('Please fill all the fields');
      return;
    }


    const formData = {
      code: code.join(''),
      accountType: localStorage.getItem('userType'),
    };

    setIsSubmitting(true);
    setErrors('');

    try {
      resetAuthState();
      await verify_email(formData); // ✅ Make sure this works with your API

    } catch (err) {
      setErrors('Invalid OTP. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      console.log(err.message)
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(()=>{
    if(isOtpSuccess){
      toast.success('Email verified');
      navigate('/dashboard');
    }
  },[isOtpSuccess,navigate])
  useEffect(()=>{
    if(error){
      toast.error(error)
    }
  },[error])
  const handleResendOtp = () => {
    if (countdown > 0) return;
    setCountdown(30);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // ✅ REMOVE: `console.log`
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg w-full max-w-md flex flex-col items-center justify-center p-8 gap-8 shadow-lg"
    >
      <div className="text-center space-y-2">
        <h1 className="font-bold text-2xl text-[#7D00FF]">OTP Verification</h1>
        <p className="text-gray-600">Enter the 6-digit code sent to your email</p>
      </div>

      <div className="w-full">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={digit}
                maxLength="1"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                // ✅ Only allow paste on first input
                onPaste={index === 0 ? (e) => handleChange(index, e.clipboardData.getData('text')) : undefined}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 border-2 border-gray-300 rounded-md font-bold outline-[#7D00FF] bg-white text-[#7D00FF] text-center focus:border-[#7D00FF] transition"
                disabled={isSubmitting}
              />
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0}
              className={`text-sm ${countdown > 0 ? 'text-gray-400' : 'text-[#7D00FF] hover:underline'}`}
            >
              {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#7D00FF] to-[#AE00FF] hover:from-[#5b00cc] hover:to-[#8e00cc] text-white rounded-md px-6 py-3 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default OtpCard;
