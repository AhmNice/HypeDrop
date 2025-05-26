import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiPlay, FiHeart, FiShare2, FiMoreVertical } from 'react-icons/fi';
import { DeleteIcon, Edit, Edit2Icon, Link, Link2, Trash2Icon } from 'lucide-react';
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/authStore';

const SnippetCard2 = ({ snippet, handleToShare,
  handleOverlay, handlePreview, handleEdithLink, handleEdith, handlePreviewSong,handleDelete }) => {
  const API_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL
  const {user} = useAuthStore()
  const [showOptions, setShowOption] = useState(false);


  const handleClick = () => {
    handlePreviewSong(snippet)
  }

  const OptionDiv = ({ snippet }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}

        className="bg-white flex flex-col items-start w-28 absolute right-10 z-20 rounded-md shadow-md"
      >
        <button
          className={`text-left  p-2 flex justify-between px-4 w-full flex items-center gap-2 py-1 hover:bg-gray-100 hover:text-green-500`}
        >
          <p className={`text-sm `} onClick={() => handleEdith(snippet._id)}>Update</p>
          {<Edit2Icon size={16} />}
        </button>
        <button
          className={`text-left  p-2 flex justify-between px-4 w-full flex items-center gap-2 py-1 hover:bg-gray-100 hover:text-[#7D00FF]`}
        >
          <p className={`text-sm `} onClick={() => handleEdithLink(snippet._id)}>Edit Link</p>
          {<Link2 size={16} />}
        </button>
        <button
          className={`text-left  p-2 flex justify-between px-4 w-full flex items-center gap-2 py-1 hover:bg-gray-100 hover:text-red-500`}
        >
          <p className={`text-sm `} onClick={() => { handleDelete(snippet._id) }}>Delete</p>
          {<Trash2Icon size={16} />}
        </button>


      </motion.div>
    );
  };


  const timeAgo = (dateString) => {
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
  return (
    <motion.div
      key={snippet.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div
        onClick={handleClick}
        className="relative">
        <img
          src={`${snippet.coverPhotoPath}`}
          alt={`Cover photo for ${snippet.title}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
          {snippet.duration}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{snippet.title}</h3>
            <p className="InterRegular text-gray-500 InterRegular text-sm mt-1">{timeAgo(snippet.createdAt)} </p>
          </div>
          {user?.role === 'artist' && <button onClick={() => setShowOption((prev) => !prev)} className="text-gray-400 hover:text-gray-600">
            <FiMoreVertical />
          </button>}
          {showOptions ? (<OptionDiv snippet={snippet} />) : null }
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 text-gray-500">
            <span className="flex items-center gap-1">
              <FiPlay size={16} /> {snippet.totalPlays.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <FiHeart size={16} /> {snippet.likes?.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => {
              handleToShare(snippet._id);
              handleOverlay()
            }}
            className="bg-[#7D00FF] cursor-pointer hover:bg-[#5b00cc] text-white rounded-full p-2 transition-colors">
            <FiShare2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default SnippetCard2
