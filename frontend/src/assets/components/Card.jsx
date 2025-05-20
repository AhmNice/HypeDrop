import React from 'react';
import { motion } from 'framer-motion';
import { FaMusic } from "react-icons/fa6";

const Card = ({ type, value }) => {
  // Define different card styles based on type
  const cardStyles = {
    plays: { bg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    likes: { bg: 'bg-pink-50', iconColor: 'text-pink-600' },
    shares: { bg: 'bg-green-50', iconColor: 'text-green-600' },
    default: { bg: 'bg-white', iconColor: 'text-gray-600' }
  };

  const currentStyle = cardStyles[type] || cardStyles.default;
  const titleMap = {
    plays: 'Total Snippet Plays',
    likes: 'Total Likes',
    shares: 'Total Shares',
    default: 'Total Activity'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`flex items-center justify-between rounded-xl p-5 w-full h-32 shadow-sm ${currentStyle.bg} hover:shadow-md transition-all`}
    >
      <div className='flex flex-col gap-1'>
        <p className="text-sm InterRegular text-gray-500 uppercase tracking-wider">
          {titleMap[type] || titleMap.default}
        </p>
        <h3 className="text-3xl font-bold text-gray-800 InterBold">
          {value || '0'}
        </h3>
      </div>
      <div className={`p-3 rounded-full ${currentStyle.iconColor} bg-white shadow-inner`}>
        <FaMusic size={24} />
      </div>
    </motion.div>
  );
};

export default Card;