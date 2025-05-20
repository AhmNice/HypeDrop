import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMusic, FiPlay, FiHeart, FiMoreVertical, FiPause } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io';
import { MdTrendingFlat } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { Loader, Loader2 } from 'lucide-react';
import Pagination from './Pagination';


const TrendingSongs = () => {
  const { user, isAuthenticated } = useAuthStore();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const SERVER = import.meta.env.VITE_SERVER_URL;
  const API_IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const [expandedSong, setExpandedSong] = useState(null);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(null);
  const [audioToPlay, setAudioToPlay] = useState()
  const [toDisplay, setToDisplay] = useState([])
  const [totalPages, setTotalPage] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const audioRef = useRef()

  // Toggle expanded view for song card
  const toggleExpand = (id) => {
    setExpandedSong(expandedSong === id ? null : id);
  };

  // Format large numbers for display
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  // Get trend color based on trend direction
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  // Get trend icon component
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <IoMdTrendingUp className="inline" />;
      case 'down': return <IoMdTrendingDown className="inline" />;
      default: return <MdTrendingFlat className="inline" />;
    }
  };

  // Calculate trend based on play count changes
  const calculateTrend = (currentPlays, previousPlays) => {
    if (!previousPlays) return 'steady';
    const change = ((currentPlays - previousPlays) / previousPlays) * 100;
    if (change > 10) return 'up';
    if (change < -5) return 'down';
    return 'steady';
  };


  // Fetch trending songs data
  useEffect(() => {
    const fetchTrendingSongs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/trending/me`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) throw new Error('Failed to fetch trending songs');

        const data = await res.json();

        // Add trend analysis to each song
        const songsWithTrend = data?.results?.map((song, index) => ({
          ...song,
          position: index + 1,
          trend: calculateTrend(song.position, song.previousPosition)
        }));

        setTrendingSongs(songsWithTrend);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) fetchTrendingSongs();
  }, [isAuthenticated, API_BASE_URL]);
  useEffect(() => {
    // console.log(currentPage);
    setTotalPage(Math.ceil(trendingSongs?.length / 10));

    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;
    const data = trendingSongs?.slice(startIndex, endIndex);
    setToDisplay(data);
  }, [currentPage, trendingSongs]);
  // Handle play song
  const handlePlay = (songId) => {
    const songToPlay = trendingSongs.find((song) => song._id === songId);

    if (!songToPlay) {
      toast.error('Song not found');
      return;
    }

    if (!songToPlay.audioPath) {
      toast.error('Audio file not available for this song');
      return;
    }

    const audioUrl = `${SERVER}/${songToPlay.audioPath}`;
    // console.log('Audio URL:', audioUrl);

    if (!audioRef.current) {
      toast.error('Audio player is not ready');
      return;
    }

    if (audioToPlay === songToPlay.audioPath && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setAudioToPlay(songToPlay.audioPath);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current.play();
      }, 0); // Ensure the `src` is updated before playing
    }
  };

  // Handle like song
  const handleLike = async (songId) => {
    try {
      // Implement like functionality
      toast.success(`Liked song ${songId}`);
    } catch (err) {
      toast.error('Failed to like song');
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-40">
      <Loader2 size={24} className='animate-spin' />
    </div>
  );

  if (error) return (
    <div className="text-center py-6 text-red-500">
      Error loading trending songs: {error}
    </div>
  );

  return (
    <div className="space-y-4 trendingPage">
      <div className="flex items-center mb-4">
        <FaFire className="text-orange-500 mr-2" size={20} />
        <h3 className="text-lg font-semibold SpaceGroteskBold">Trending Now</h3>
      </div>

      {toDisplay?.length === 0 ? (
        <div className="text-center py-6 text-gray-500 SpaceGroteskBold">
          No trending songs found
        </div>
      ) : (
        toDisplay?.map((song, index) => (
          <motion.div
            key={song._id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-lg overflow-hidden shadow-xs ${expandedSong === song._id ? 'shadow-md' : 'hover:shadow-sm'
              } transition-all`}
          >
            <div className="p-3 flex items-center">
              <div className="relative flex-shrink-0 mr-3">
                <div className="absolute -top-2 -left-2 bg-indigo-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <img
                  src={`${API_IMAGE_URL}/${song?.coverPhotoPath}`}
                  alt={`${song.title} cover`}
                  className="h-12 w-12 rounded-md object-cover bg-gray-100"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                    e.target.className = 'h-12 w-12 rounded-md object-cover bg-gray-200';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium InterRegular text-gray-900 truncate">
                  {song.title || 'Untitled Song'}
                </h4>
                {/* <p className="text-xs text-gray-500 truncate">
                  {song.artistName || 'Unknown Artist'}
                </p> */}
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 flex items-center mr-3">
                    <FiPlay className="mr-1" size={12} />
                    {formatNumber(song.totalPlays)}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <FiHeart className="mr-1" size={12} />
                    {formatNumber(song.likes)}
                  </span>
                  <span className={`text-xs ml-3 ${getTrendColor(song.trend)} flex items-center`}>
                    {getTrendIcon(song.trend)} Trending
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleExpand(song._id)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="More options"
              >
                <FiMoreVertical size={18} />
              </button>
            </div>

            {expandedSong === song._id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-3 pb-3 pt-1 bg-gray-50 border-t border-gray-100"
              >
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handlePlay(song._id)}
                    className="flex items-center justify-center py-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <FiPause className="mr-1" size={14} /> Pause
                      </>

                    ) : <>
                      <FiPlay className='mr-1' size={14} /> Play</>}
                  </button>
                  {user.role === 'artist' ? '' : <button
                    onClick={() => handleLike(song._id)}
                    className="flex items-center justify-center py-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <FiHeart className="mr-1" size={14} /> Like
                  </button>}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))
      )}

      <div className="text-center pt-2">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
      <audio src={audioToPlay ? `${SERVER}/${audioToPlay} ` : ''} ref={audioRef}></audio>
    </div>
  );
};

export default TrendingSongs;