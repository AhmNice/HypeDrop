import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Card from '../components/Card';
import RecentActivity from '../components/RecentActivity';
import TrendingSongs from '../components/TrendingSongs';
import { FiTrendingUp, FiMusic, FiHeart, FiShare2 } from 'react-icons/fi';

const Dashboard = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      document.title = "Dashboard | HypeDrop";
    }, []);
  const [stats, setStats] = useState({
    plays: 0,
    likes: 0,
    shares: 0,
    followers: 0
  });
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };
  // Simulate data loading
  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        setIsLoading(true);
        const payload = {
          id: user._id,
        };

        try {
          const res = await fetch(`${API_BASE_URL}/snippets/me`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include',
          });

          if (res.ok) {
            const data = await res.json();
            const results = data.results;
            const plays = formatNumber(
              results.reduce((sum, result) => sum + (parseInt(result.totalPlays, 10) || 0), 0)
            );

            const likes = formatNumber(
              results.reduce((sum, result) => sum + (parseInt(result.likes, 10) || 0), 0)
            )

            const shares = formatNumber(
              results.reduce((sum, result) => sum + (parseInt(result.shares, 10) || 0), 0)
            );

            const followers = formatNumber(
              results.reduce((sum, result) => sum + (parseInt(result.followers, 10) || 0), 0)
            );


            setStats({
              plays,
              likes,
              shares,
              followers,
            });
          } else {
            toast.error('Error fetching snippets');
          }

        } catch (error) {
          toast.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user, isAuthenticated]);


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div style={{ gridTemplateColumns: '20%  80%' }} className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}

        <Navbar />


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-6 text-white"
          >
            <h1 className="text-2xl font-bold capitalize">Welcome back, {user?.stageName || user?.userName}!</h1>
            <p className="opacity-90">Here's what's happening with your music today</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={itemVariants}>
              <Card
                type="plays"
                value={stats.plays}
                icon={<FiMusic className="text-indigo-500" size={24} />}
                isLoading={isLoading}
                trend="up"
                change="12%"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card
                type="likes"
                value={stats.likes}
                icon={<FiHeart className="text-red-500" size={24} />}
                isLoading={isLoading}
                trend="up"
                change="8%"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card
                type="shares"
                value={stats.shares}
                icon={<FiShare2 className="text-green-500" size={24} />}
                isLoading={isLoading}
                trend="down"
                change="3%"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card
                type="followers"
                value={stats.followers}
                icon={<FiTrendingUp className="text-yellow-500" size={24} />}
                isLoading={isLoading}
                trend="up"
                change="15%"
              />
            </motion.div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6 h-full"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center SpaceGroteskBold">
                  <FiTrendingUp className="mr-2 text-indigo-500" />
                  Recent Activity
                </h2>
                <RecentActivity />
              </motion.div>
            </div>

            {/* Trending Songs */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6 h-full"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiMusic className="mr-2 text-purple-500 SpaceGroteskBold" />
                  Trending Songs
                </h2>
                <TrendingSongs />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;