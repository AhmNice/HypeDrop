import React, { useState, useEffect } from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { motion } from 'framer-motion';
import ArtistForm from '../components/ArtistForm';
import UserForm from '../components/UserForm';

const SignupPage = () => {
  const [type, setType] = useState('');
  const [typePlaceHolder, setTypePlaceHolder] = useState('');

  const accountSelection = (e) => {
    e.preventDefault();
    if (!typePlaceHolder) {
      alert('Please select an account type');
      return;
    }
    setType(typePlaceHolder);
  };

 useEffect(() => {
    document.title = "Sign Up | HypeDrop";
  }, []);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white rounded-xl w-full max-w-sm shadow-lg overflow-hidden ${type ? 'hidden' : ''}`}
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">
          <h1 className="InterRegular text-xl text-center font-bold">Choose Account</h1>
          <p className="InterRegular text-center text-indigo-100 text-sm mt-1">Select your account type</p>
        </div>

        <form className="p-5 space-y-4">
          <div className="space-y-2">
            <label className="InterRegular block text-sm font-medium text-gray-700">Account Type</label>
            <select
              className="InterRegular appearance-none w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              name="userType"
              id="type"
              value={typePlaceHolder} // Controlled value
              onChange={(e) => setTypePlaceHolder(e.target.value)}
            >
              <option value="" disabled className="InterRegular">Select account type</option>
              <option value="user" className="InterRegular">Regular User</option>
              <option value="artist" className="InterRegular">Artist/Creator</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={accountSelection}
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
            aria-label="Continue to account creation"
          >
            Continue
            <IoArrowForward className="inline ml-1" size={14} />
          </motion.button>
        </form>
      </motion.div>

      {type === 'artist' && <ArtistForm />}
      {type === 'user' && <UserForm />}
    </section>
  );
};

export default SignupPage;