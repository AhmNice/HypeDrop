import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiPlay,
  FiShare2,
  FiDownload,
  FiUserPlus,
  FiMessageSquare
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Pagination from './Pagination';

const RecentActivity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [toDisplay, setToDisplay] = useState([])
  const [totalPages, setTotalPage] = useState()
  // Sample activity data
  const activities = [
    {
      id: 1,
      type: 'play',
      song: 'Midnight Dreams',
      user: 'DJ Spark',
      time: new Date(Date.now() - 1000 * 60 * 5),
      icon: <FiPlay className="text-indigo-500" />,
      color: 'bg-indigo-100'
    },
    {
      id: 2,
      type: 'like',
      song: 'Summer Vibes',
      user: 'MusicFan92',
      time: new Date(Date.now() - 1000 * 60 * 30),
      icon: <FiHeart className="text-red-500" />,
      color: 'bg-red-100'
    },
    {
      id: 3,
      type: 'share',
      song: 'Urban Groove',
      user: 'BeatMaster',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      icon: <FiShare2 className="text-green-500" />,
      color: 'bg-green-100'
    },
    {
      id: 4,
      type: 'download',
      song: 'Electric Storm',
      user: 'SoundExplorer',
      time: new Date(Date.now() - 1000 * 60 * 60 * 5),
      icon: <FiDownload className="text-yellow-500" />,
      color: 'bg-yellow-100'
    },
    {
      id: 5,
      type: 'follow',
      user: 'NewListener',
      time: new Date(Date.now() - 1000 * 60 * 60 * 10),
      icon: <FiUserPlus className="text-purple-500" />,
      color: 'bg-purple-100'
    },
    {
      id: 6,
      type: 'comment',
      song: 'Neon Lights',
      user: 'MusicCritic',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24),
      icon: <FiMessageSquare className="text-blue-500" />,
      color: 'bg-blue-100'
    },
    {
      id: 7,
      type: 'play',
      song: 'Rainy Daze',
      user: 'CloudyVibes',
      time: new Date(Date.now() - 1000 * 60 * 15),
      icon: <FiPlay className="text-indigo-500" />,
      color: 'bg-indigo-100'
    },
    {
      id: 8,
      type: 'like',
      song: 'Golden Hour',
      user: 'SunsetLover',
      time: new Date(Date.now() - 1000 * 60 * 50),
      icon: <FiHeart className="text-red-500" />,
      color: 'bg-red-100'
    },
    {
      id: 9,
      type: 'share',
      song: 'Morning Dew',
      user: 'NatureSounds',
      time: new Date(Date.now() - 1000 * 60 * 60 * 3),
      icon: <FiShare2 className="text-green-500" />,
      color: 'bg-green-100'
    },
    {
      id: 10,
      type: 'download',
      song: 'City Lights',
      user: 'UrbanRider',
      time: new Date(Date.now() - 1000 * 60 * 60 * 6),
      icon: <FiDownload className="text-yellow-500" />,
      color: 'bg-yellow-100'
    },
    {
      id: 11,
      type: 'follow',
      user: 'GrooveSeeker',
      time: new Date(Date.now() - 1000 * 60 * 60 * 11),
      icon: <FiUserPlus className="text-purple-500" />,
      color: 'bg-purple-100'
    },
    {
      id: 12,
      type: 'comment',
      song: 'Ocean Wave',
      user: 'WaveWalker',
      time: new Date(Date.now() - 1000 * 60 * 60 * 26),
      icon: <FiMessageSquare className="text-blue-500" />,
      color: 'bg-blue-100'
    },
    {
      id: 13,
      type: 'play',
      song: 'Crystal Sky',
      user: 'SkyGazer',
      time: new Date(Date.now() - 1000 * 60 * 8),
      icon: <FiPlay className="text-indigo-500" />,
      color: 'bg-indigo-100'
    },
    {
      id: 14,
      type: 'like',
      song: 'Echoes',
      user: 'ReverbQueen',
      time: new Date(Date.now() - 1000 * 60 * 40),
      icon: <FiHeart className="text-red-500" />,
      color: 'bg-red-100'
    },
    {
      id: 15,
      type: 'share',
      song: 'Pulse',
      user: 'BassHunter',
      time: new Date(Date.now() - 1000 * 60 * 60),
      icon: <FiShare2 className="text-green-500" />,
      color: 'bg-green-100'
    },
    {
      id: 16,
      type: 'download',
      song: 'Afterglow',
      user: 'DreamCatcher',
      time: new Date(Date.now() - 1000 * 60 * 60 * 7),
      icon: <FiDownload className="text-yellow-500" />,
      color: 'bg-yellow-100'
    },
    {
      id: 17,
      type: 'follow',
      user: 'SynthWizard',
      time: new Date(Date.now() - 1000 * 60 * 60 * 12),
      icon: <FiUserPlus className="text-purple-500" />,
      color: 'bg-purple-100'
    },
    {
      id: 18,
      type: 'comment',
      song: 'Dream Runner',
      user: 'NightOwl',
      time: new Date(Date.now() - 1000 * 60 * 60 * 28),
      icon: <FiMessageSquare className="text-blue-500" />,
      color: 'bg-blue-100'
    },
    {
      id: 19,
      type: 'play',
      song: 'Synth Horizon',
      user: 'NeonKnight',
      time: new Date(Date.now() - 1000 * 60 * 2),
      icon: <FiPlay className="text-indigo-500" />,
      color: 'bg-indigo-100'
    },
    {
      id: 20,
      type: 'like',
      song: 'Chill Beats',
      user: 'LoFiLegend',
      time: new Date(Date.now() - 1000 * 60 * 20),
      icon: <FiHeart className="text-red-500" />,
      color: 'bg-red-100'
    },
    {
      id: 21,
      type: 'share',
      song: 'HypeDrop Anthem',
      user: 'PromoKing',
      time: new Date(Date.now() - 1000 * 60 * 60 * 4),
      icon: <FiShare2 className="text-green-500" />,
      color: 'bg-green-100'
    },
    {
      id: 22,
      type: 'download',
      song: 'Velocity',
      user: 'FastTrack',
      time: new Date(Date.now() - 1000 * 60 * 60 * 9),
      icon: <FiDownload className="text-yellow-500" />,
      color: 'bg-yellow-100'
    },
    {
      id: 23,
      type: 'follow',
      user: 'BassGod',
      time: new Date(Date.now() - 1000 * 60 * 60 * 13),
      icon: <FiUserPlus className="text-purple-500" />,
      color: 'bg-purple-100'
    },
    {
      id: 24,
      type: 'comment',
      song: 'Late Night',
      user: 'MoonWalker',
      time: new Date(Date.now() - 1000 * 60 * 60 * 30),
      icon: <FiMessageSquare className="text-blue-500" />,
      color: 'bg-blue-100'
    },
    {
      id: 25,
      type: 'play',
      song: 'Sunrise Anthem',
      user: 'MorningBird',
      time: new Date(Date.now() - 1000 * 60 * 3),
      icon: <FiPlay className="text-indigo-500" />,
      color: 'bg-indigo-100'
    }
  ];
  useEffect(() => {
    // console.log(currentPage);
    setTotalPage(Math.ceil(activities.length / 10));

    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;
    const data = activities.slice(startIndex, endIndex);
    setToDisplay(data);
  }, [currentPage]);


  // Activity type descriptions
  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'play':
        return `${activity.user} played your song ${activity.song}`;
      case 'like':
        return `${activity.user} liked your song ${activity.song}`;
      case 'share':
        return `${activity.user} shared your song ${activity.song}`;
      case 'download':
        return `${activity.user} downloaded your song ${activity.song}`;
      case 'follow':
        return `${activity.user} started following you`;
      case 'comment':
        return `${activity.user} commented on ${activity.song}`;
      default:
        return 'New activity';
    }
  };

  return (
    <div className="space-y-4">
      {toDisplay.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className={`flex-shrink-0 h-10 w-10 rounded-full ${activity.color} flex items-center justify-center mr-3`}>
            {activity.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate InterRegular">
              {getActivityDescription(activity)}
            </p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(activity.time, { addSuffix: true })}
            </p>
          </div>
        </motion.div>
      ))}
      <div className="text-center pt-2">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default RecentActivity;