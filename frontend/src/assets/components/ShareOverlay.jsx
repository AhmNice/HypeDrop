import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react'; // or any close icon you prefer
import fbIcon from '../icons/fb.png';
import instaIcon from '../icons/insta.png';
import tikTokIcon from '../icons/tikTok.png';
import whatsappIcon from '../icons/whatsapp.png';
import twitterIcon from '../icons/twitter.png'; // added another platform
import { FiLink2 } from "react-icons/fi";
import toast from 'react-hot-toast';


const ShareOverlay = ({  shareUrl = window.location.href, title = "Check this out!, it a snippet to my upcoming song.",handleOverlay }) => {
  const captionText = `${title}\n${shareUrl}`;

const sharePlatforms = [
  { name: "Facebook", icon: fbIcon, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
  { name: "WhatsApp", icon: whatsappIcon, url: `https://wa.me/?text=${encodeURIComponent(captionText)}` },
  { name: "Twitter", icon: twitterIcon, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}` },
];


  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const LinkIcon = ({ platform }) => {
    return (
      <motion.a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="rounded-full w-14 h-14 bg-gray-100 p-3 flex items-center justify-center shadow-sm hover:shadow-md transition-all">
          <img src={platform.icon} className="w-full h-full object-contain" alt={platform.name} />
        </div>
        <span className="text-xs text-gray-600">{platform.name}</span>
      </motion.a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overlay bg-opacity-50 flex justify-center items-center p-4"
      onClick={handleOverlay}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="rounded-xl w-full max-w-md bg-white p-6 flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleOverlay}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close share menu"
        >
          <X size={24} />
        </button>

        <h1 className="text-2xl font-bold text-[#7D00FF] mb-6">Share via</h1>

        <div className="grid grid-cols-4 gap-4 w-full mb-6">
          {sharePlatforms.map((platform) => (
            <LinkIcon key={platform.name} platform={platform} />
          ))}

          {/* Copy Link Button */}
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2"
          >
            <div onClick={handleOverlay} className="rounded-full w-14 h-14 bg-gray-100 p-3 flex items-center justify-center shadow-sm hover:shadow-md transition-all">
              <FiLink2/>
            </div>
            <span className="text-xs text-gray-600">Copy Link</span>
          </motion.button>
        </div>

        <div className="w-full bg-gray-100 rounded-lg p-3">
          <p className="text-sm text-gray-500 text-center truncate w-full">{shareUrl}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareOverlay;