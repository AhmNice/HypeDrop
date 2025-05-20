import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { BellIcon } from 'lucide-react';
import { motion } from 'framer-motion'
import NotificationList from './NotificationList';
import toast from 'react-hot-toast';


const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [notification, setNotification] = useState([])
  const [showNotificationDev, setShowNotificationDev] = useState(false)
  const { user } = useAuthStore()
  const searchRef = useRef(null);
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL


  const handleSearch = async () => {
    if (searchQuery.trim()) {
      // Simulate API call
      setShowResults(true);
      // Replace with actual search logic
      const mockResults = ['Result 1', 'Result 2', 'Result 3'];
      setSearchResults(mockResults);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };
  const handleNotification = () => {
    setShowNotificationDev((prev) => !prev)
  }
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/me/get-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          // body:JSON.stringify({id:})
        });
        const data = await res.json()
        if (res.ok) {
          setNotification(data.notifications)
        } else {
          toast.error('something went wrong')
        }
      } catch (error) {
        toast.error(error.message || 'could not fetch notification')
      }
    };
    fetchData()
  }, [user])
  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='bg-white px-6 py-3 w-full flex justify-between items-center border-b border-gray-100 sticky top-0 z-50'>
      <div className='flex gap-2 items-center relative' ref={searchRef}>
        <div className='relative flex items-center'>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search snippets, artists..."
            className="border w-80 outline-none focus:ring-2 focus:ring-[#7D00FF] focus:border-transparent border-gray-300 rounded-lg p-2 pl-10 pr-8 InterRegular text-sm transition-all"
          />
          <FiSearch className="absolute left-3 text-gray-400" />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#7D00FF] hover:bg-[#5b00cc] text-white rounded-lg px-4 py-2 InterRegular text-sm transition-colors flex items-center gap-2"
        >
          <FiSearch size={16} />
          Search
        </button>

        {/* Search Results Dropdown */}
        {showResults && searchResults?.length > 0 && (
          <div className="absolute w-full bg-white shadow-lg rounded-lg mt-1 top-full left-0 z-50 border border-gray-200">
            <ul className="py-2">
              {searchResults.map((result, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative flex items-center gap-5'>
          <div
            onClick={handleNotification}
            className='relative cursor-pointer'>
            {notification?.length > 0 &&
              <span className='absolute -top-2 -right-1 p-2 h-4 w-4 text-xs bg-red-500 rounded-full text-center flex items-center font-bold justify-center text-white InterRegular'>{notification?.length}</span>
            }
            <BellIcon />
          </div>
          <div className='rounded-full w-9 h-9 bg-gray-200 overflow-hidden flex items-center justify-center'>
            <img
             src={user?.profilePicture ? `${IMAGE_BASE_URL}/${user?.profilePicture}` : '/preview-user.png'}
              alt="Profile"
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        {showNotificationDev && <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white rounded-md shadow-2xl custom-scrollbar z-50 p-4 flex flex-col gap-2 overflow-y-scroll max-h-96 absolute top-12 right-24 w-96 '
        >
          {/* {notification.length === 0 && <div className='flex justify-center items-center h-full w-full'>
              <p className='InterRegular text-gray-300 font-bold text-xl'>No notification</p>
            </div>} */}

          <NotificationList notifications={notification} />

        </motion.div>}
      </div>
    </header>
  );
};

export default Header;