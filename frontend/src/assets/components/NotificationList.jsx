import React from 'react';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import {
  FiBell,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiInfo,
  FiThumbsUp,
  FiMail,
  FiUser,
  FiMusic
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { Link2 } from 'lucide-react';
import toast from 'react-hot-toast';

const iconMap = {
  info: <FiInfo className="text-blue-500" />,
  profile: <FiUser className="text-blue-500" />,
  snippet: <FiMusic className='text-green-500' />,
  success: <FiThumbsUp className="text-green-500" />,
  warning: <FiAlertCircle className="text-yellow-500" />,
  error: <FiX className="text-red-500" />,
  default: <FiBell className="text-purple-500" />,
  message: <FiMail className="text-indigo-500" />,
  link: <Link2 className="text-purple-500" />
};

const NotificationList = ({ notifications, onDismiss, onAction }) => {
  const getNotificationIcon = (type) => {
    return iconMap[type] || iconMap.default;
  };
  const navigate = useNavigate()
  if (!notifications || notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No notifications available
      </div>
    );
  }
  const markNotificationAsRead = async (id) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    try {
      const res = await fetch(`${API_BASE_URL}/me/read-notification`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notificationId: id })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Notification marked as read')
      } else {
        toast.error('something went wrong')
      }
    } catch (error) {
      toast.error(error.message)
    }

  }
  const handleClick = (link, id) => {
    markNotificationAsRead(id)
    navigate(link)
  }
  return (
    <div className="w-full max-w-md space-y-3">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.2 }}
          className="flex items-start p-4 cursor-pointer  bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex-shrink-0 mt-1 mr-3 text-lg">
            {getNotificationIcon(notification.type)}
          </div>

          <div
            onClick={() => { handleClick(notification.link, notification._id) }}
            className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 SpaceGroteskBold">
              {notification.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 InterRegular">
              {notification.message}
            </p>
            {notification.createdAt && (
              <p className="mt-1 text-xs text-gray-400">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end ml-2 space-y-2">
            {notification.action && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAction(notification._id)}
                className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {notification.actionLabel || 'View'}
              </motion.button>
            )}
            <button
              onClick={() => onDismiss(notification._id)}
              className="text-gray-400 cursor-pointer hover:text-gray-500 focus:outline-none"
              aria-label="Dismiss notification"
            >
              <FiCheck className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NotificationList;