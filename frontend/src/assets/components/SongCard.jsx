import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';

const API_IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const SongCard = ({ snippet, handlePreview }) => {
  const { user } = useAuthStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const volumeBarRef = useRef();

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = async () => {
    if (!isPlaying) {
      function getOrCreateGuestId() {
        const name = "guestId=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');
        for (let c of cookies) {
          while (c.charAt(0) === ' ') c = c.substring(1);
          if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }

        // Generate new UUID and set cookie
        const newGuestId = crypto.randomUUID();
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 year expiry
        document.cookie = `guestId=${newGuestId}; expires=${expiryDate.toUTCString()}; path=/`;
        return newGuestId;
      }

      const userId = user?._id
      const guestId = !user ? getOrCreateGuestId(): null
      const ownerId = snippet?.owner;
      const songId = snippet?._id;

      const payload = { songId, userId, ownerId, guestId};
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      try {
        const url = user ? `${API_BASE_URL}/streams`: `${API_BASE_URL}/streams-guest`

        const res = await fetch(url, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(payload),
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Stream updated:', data);
        }
      } catch (error) {
        console.error('Stream update error:', error.message);
      }

      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value) * audioDuration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const updateProgressBar = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setCurrentTime(currentTime);
    if (progressBarRef.current && duration) {
      progressBarRef.current.value = currentTime / duration;
    }
  };

  const handleLoadedMetadata = () => {
    setAudioDuration(audioRef.current.duration);
    audioRef.current.volume = volume;
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (progressBarRef.current) progressBarRef.current.value = 0;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = [
      { type: 'loadedmetadata', handler: handleLoadedMetadata },
      { type: 'timeupdate', handler: updateProgressBar },
      { type: 'ended', handler: handleAudioEnd }
    ];

    events.forEach(({ type, handler }) => audio.addEventListener(type, handler));
    return () => events.forEach(({ type, handler }) => audio.removeEventListener(type, handler));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overlay bg-opacity-70 backdrop-blur-sm"
      onClick={handlePreview}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePreview}
          className="absolute top-2 right-2 z-10 text-gray-400 hover:text-white transition-colors"
          aria-label="Close player"
        >
          <X size={20} />
        </button>

        <div className="flex justify-between items-center px-4 pt-4 pb-2">
          <div className="flex items-center overflow-hidden">
            <svg className="h-5 w-5 text-yellow-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <div className="ml-2 overflow-hidden">
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-200 truncate">
                {snippet?.title || 'Unknown Song'}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {snippet?.artistName || 'Unknown Artist'}
              </p>
            </div>
          </div>
        </div>

        <div className="relative aspect-square w-full">
          <img
            src={`${API_IMAGE_BASE_URL}/${snippet.coverPhotoPath}`}
            alt="Album cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="bg-yellow-500 text-white p-1.5 rounded-full shadow-lg"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
          </div>
        </div>

        <div className="px-4 pt-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(audioDuration)}</span>
          </div>
          <input
            type="range"
            ref={progressBarRef}
            min="0"
            max="1"
            step="0.001"
            defaultValue="0"
            onChange={handleProgressChange}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:bg-yellow-500"
          />
        </div>

        <div className="flex items-center px-4 pb-4 pt-1">
          <button
            onClick={toggleMute}
            className="text-gray-500 dark:text-gray-400 hover:text-yellow-500"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            ref={volumeBarRef}
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="ml-2 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:bg-yellow-500"
          />
        </div>

        <audio
          ref={audioRef}
          src={`${API_IMAGE_BASE_URL}/${snippet.audioPath}`}
          preload="metadata"
        />
      </motion.div>
    </motion.div>
  );
};

export default SongCard;