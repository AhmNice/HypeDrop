import React, { useState, useRef, useEffect } from 'react'
import Content_image from '../../images/shizle.jpg';
import Content_audio from '../../audio/Shizle-Disease.mp3';
import Pause from '../../images/pause.png';
import Play from '../../images/play.png';
import ReleaseCard from './ReleaseCard.jsx'
const Card = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1); // Volume state (range from 0 to 1)
  const audioRef = useRef(null);

  // Handle play/pause functionality
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update the duration when the audio metadata is loaded
  const handleLoadedMetadata = () => {
    setAudioDuration(audioRef.current.duration);
  };

  // Update the current time while the audio is playing
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Format time in minutes and seconds (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle volume change from the slider
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Set the volume of the audio element
    }
  };

  useEffect(() => {
    // Add event listeners to handle time updates and metadata loading
    const audioElement = audioRef.current;
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    // Clean up the event listeners on component unmount
    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="flex gap-4 flex-col">
  <ReleaseCard />
  
      <div className="w-full max-w-[320px] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden dark:bg-zinc-900">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <svg
            className="h-6 w-6 text-yellow-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <div className="mx-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
              Support System
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Shizle</p>
          </div>
        </div>
        <div className="flex items-center">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            ></path>
          </svg>
          <svg
            className="h-6 w-6 text-gray-500 dark:text-gray-400 ml-4"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
        </div>
      </div>
      <div className="relative">
        <img src={Content_image} alt="Content" className="w-full h-70" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Audio Play Button */}
          <button onClick={togglePlayPause} className="bg-yellow-500 text-white p-2 rounded-full">
            <img
              src={isPlaying ? Pause : Play}
              alt={isPlaying ? 'Pause' : 'Play'}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
      <div className="px-6 py-4 items-center">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          </svg>
          <div className="w-full mx-3">
            <div className="relative mt-1 h-1 bg-gray-300 rounded overflow-hidden dark:bg-gray-800">
              {/* Volume control bar */}
               <label className="slider w-full py-4">
                  <input type="range" id="volume-slider"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="level w-full left-0 top-0 h-full bg-gray-800">
            
                  </input>
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{Math.round(volume * 100)}%</p>
        </div>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
          <span>{formatTime(currentTime)}</span> <span>{formatTime(audioDuration)}</span>
        </div>
      </div>

      {/* Volume Control Slider */}
      {/* <div className="px-6 py-4 flex items-center">
        <label htmlFor="volume-slider" className="text-sm text-gray-500 dark:text-gray-400 mr-2">Volume</label>
        <input
          type="range"
          id="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full eft-0 top-0 h-full bg-yellow-500"
        />
      </div> */}

      {/* Audio Element */}
      <audio ref={audioRef} src={Content_audio} />
    </div>
    </div>
  );
};

export default Card;
