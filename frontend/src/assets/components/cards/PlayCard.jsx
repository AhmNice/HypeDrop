import React from 'react';
import { motion } from 'framer-motion';
import audiomack from '../../images/audiomack.png';
import appleMusic from '../../images/apple-music.png';
import spotify from '../../images/s.png';
import yt from '../../images/yt.png';



const Card = ({snippet}) => {
  const streamingPlatforms = [
  { name: 'Audiomack', icon: audiomack, url: snippet?.audiomack },
  { name: 'Apple Music', icon: appleMusic, url: snippet?.appleMusic },
  { name: 'Spotify', icon: spotify, url: snippet?.spotify , className: 'h-20 -mt-3' },
  { name: 'YouTube Music', icon: yt, url: snippet?.youTubeMusic },
];
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="card rounded-xl w-full max-w-sm md:max-w-md bg-white text-gray-700 flex-col shadow-lg overflow-hidden"
    >
      {/* Header */}
      <motion.div
        className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50"
        whileHover={{ scale: 1.02 }}
      >
        <h1 className='text-xl font-bold text-gray-800'>Stream on:</h1>
      </motion.div>

      {/* Content */}
      <motion.div className="p-6 flex flex-col w-full rounded-b-xl bg-white">
        <motion.div
          className='flex flex-col gap-6 items-center'
          variants={containerVariants}
        >
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
            variants={containerVariants}
          >
            {streamingPlatforms.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform.name}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex justify-center items-center"
              >
                <motion.img
                  src={platform.icon}
                  alt={platform.name}
                  className={`h-12 object-contain ${platform.className || ''}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-gray-600 font-medium text-sm"
            variants={itemVariants}
          >
            This song is now available on all major streaming platforms
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;