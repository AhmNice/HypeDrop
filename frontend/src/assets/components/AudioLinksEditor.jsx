import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiCheck, FiPlus, FiMusic, FiYoutube } from 'react-icons/fi';
import { FaSpotify } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AudioLinksEditor = ({ onClose, id, snippet }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [links, setLinks] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaultPlatforms, setDefaultPlatforms] = useState([
    { id: 'audiomack', name: 'Audiomack', icon: <FiMusic className="text-lg" /> },
    { id: 'appleMusic', name: 'AppleMusic', icon: <SiApplemusic className="text-lg" /> },
    { id: 'youTubeMusic', name: 'YouTubeMusic', icon: <FiYoutube className="text-lg" /> },
    { id: 'spotify', name: 'Spotify', icon: <FaSpotify className="text-lg" /> },
  ]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setInputValue(links[platform.id] || '');
  };

  const handleSaveLink = async () => {
    if (!selectedPlatform || !inputValue.trim()) return;
    setIsSubmitting(true);
    const newLink = inputValue.trim();

    const updatedLinks = {
      ...links,
      [selectedPlatform.id]: newLink,
    };

    const payload = {
      id,
      links: {
        platform: selectedPlatform.id,
        link: newLink,
      },
    };

    try {
      const res = await fetch(`${API_BASE_URL}/snippet/update-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setLinks(updatedLinks);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to update link');
    } finally {
      setSelectedPlatform(null);
      setInputValue('');
      setIsSubmitting(false);
    }
  };

  const handleAddCustomPlatform = () => {
    const customName = prompt('Enter custom platform name:');
    if (customName) {
      const customId = customName.toLowerCase().replace(/\s+/g, '-');
      const alreadyExists = defaultPlatforms.some(p => p.id === customId);
      if (alreadyExists) return toast.error('Platform already exists.');

      setDefaultPlatforms(prev => [
        ...prev,
        {
          id: customId,
          name: customName,
          icon: <FiPlus className="text-lg" />,
        },
      ]);
    }
  };

  useEffect(() => {
    setLinks(snippet?.links || {});
  }, [snippet]);
  function capitalizeFirstLetter(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overlay bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[600px] mx-4"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#7D00FF]">Audio Links</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
              <FiX className="text-xl" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">Add links to your music on streaming platforms</p>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Platform</h3>
            <div className="flex flex-wrap gap-2">
              {defaultPlatforms.map((platform) => (
                <motion.button
                  key={platform.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlatformSelect(platform)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    selectedPlatform?.id === platform.id
                      ? 'bg-[#7D00FF] text-white border-[#7D00FF]'
                      : 'border-gray-300 text-gray-700 hover:border-[#7D00FF]'
                  }`}
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddCustomPlatform}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-[#7D00FF] transition-colors"
              >
                <FiPlus />
                <span>Add Custom Platform</span>
              </motion.button>
            </div>
          </div>

          {selectedPlatform && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedPlatform.name} URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Paste your ${selectedPlatform.name} link`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D00FF] focus:border-[#7D00FF] outline-none transition"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveLink}
                  disabled={!inputValue.trim() || isSubmitting}
                  className="px-4 py-2 bg-[#7D00FF] text-white rounded-lg disabled:opacity-50 transition"
                >
                  {isSubmitting ? (
                    <div className="flex gap-2">
                      <Loader2 className="animate-spin" />
                      <span>Saving</span>
                    </div>
                  ) : (
                    <FiCheck className="text-lg" />
                  )}
                </motion.button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Your Links</h3>
            {Object.keys(links).length > 0 ? (
              <div className="flex overflow-auto h-36 scrollbar-thin">
                <ul className="space-y-2 w-full">
                  {Object.entries(links).map(([platformId, url]) => {
                    const platform = defaultPlatforms.find(p => p.id === platformId);
                    return (
                      <li key={platformId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {platform?.icon || <FiMusic />}
                          <span className="font-medium">{platform?.name || platformId}</span>
                        </div>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7D00FF] hover:underline text-sm truncate max-w-[180px]"
                        >
                          {url}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No links added yet</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AudioLinksEditor;
