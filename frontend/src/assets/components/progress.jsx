import React from 'react';
import { motion } from 'framer-motion';

const Progress = ({ progress = 0 }) => {
  return (
    <div className="absolute inset-0 overlay flex items-center justify-center z-50">

      <div className="w-full max-w-xs mx-4 bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-3">
          <h3 className="text-sm font-medium text-center text-gray-900 dark:text-white">
            Uploading...
          </h3>
        </div>
        <div className="px-4 pb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default Progress;