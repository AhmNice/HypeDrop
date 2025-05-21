import React from "react";
import { motion } from "framer-motion";
import { FiUser, FiEdit, FiSettings, FiMusic, FiHeart, FiShare2, FiLogOut, FiPlay } from 'react-icons/fi';
import ShareOverlay from './ShareOverlay'

export const SnippetCard = ({snippet,handlePreview, handleOverlay, handleToShare, handlePreviewSong}) => {

  const  API_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL
  // console.log(url)
  const timeAgo = (dateString)=> {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }
  const handleClick =()=>{
    handlePreviewSong(snippet)
     handlePreview
    //  alert('dfdf')
  }

  return (
    <motion.div
    whileHover={{ y: -5 }}
    className="bg-white cursor-pointer rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-md"
  >
    <div className="relative">
      <img
    onClick={handleClick}

        src={`${snippet.coverPhotoPath}`}
        alt={`Cover photo for ${snippet.title}`}
        className="w-full h-40 object-cover"
      />
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 InterRegular text-white px-2 py-1 rounded InterRegular text-xs">
        2:45
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold InterRegular text-gray-900">{snippet.title}</h3>
      <p className="InterRegular text-gray-500 InterRegular text-sm mt-1">{timeAgo(snippet.createdAt)} </p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4 InterRegular text-gray-400">
          <button className="flex items-center space-x-1 hover:InterRegular text-purple-600">
            <FiPlay size={14} />
            <span className="InterRegular text-xs">{snippet.totalPlays}</span>
          </button>
          <button className="flex items-center space-x-1 hover:InterRegular text-purple-600">
            <FiHeart size={14} />
            <span className="InterRegular text-xs">324</span>
          </button>
        </div>
        <button onClick={()=>{
              handleToShare(snippet._id);
              handleOverlay()
            }
          } className="InterRegular text-gray-400 hover:InterRegular text-purple-600">
          <FiShare2 size={16} />
        </button>
      </div>
    </div>
  </motion.div>
  )
};
export default SnippetCard