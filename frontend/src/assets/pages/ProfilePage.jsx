import React, { useEffect, useState } from 'react';
import { FiUser, FiEdit, FiSettings, FiMusic, FiHeart, FiShare2, FiLogOut, FiPlay } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { useAuthStore } from '../store/authStore';
import SnippetContainer from '../components/SnippetContainer';
import ProfilePicForm from '../components/ProfilePicForm';
import { FaLeaf } from 'react-icons/fa6';
import SongCard from '../components/SongCard';
import EditProfile from '../components/EditProfile';






// Profile Component
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, isAuthenticated, checkAuth,  }= useAuthStore()
  const [picUpdataVisible, setPicUpdataVisible ] = useState(false)
  const  IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL
  const [totalSnippets, setTotalSnippets] = useState()
  const [ editingProfile, setEditingProfile ] = useState(false)
  const handlePicUpdateVisible = (e) =>{
      // e.preventDefault()
    setPicUpdataVisible((prev)=> !prev)
  }
const handleProfileEdith =()=>{
  setEditingProfile((prev)=>!prev)
}
useEffect(()=>{
  checkAuth()
},[picUpdataVisible])
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Navbar activeTab={activeTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">

          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="relative group"
              >
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={user?.profilePicture ? `${IMAGE_BASE_URL}/${user?.profilePicture}` : '/preview-user.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                onClick={handlePicUpdateVisible}
                aria-label='edit profile picture'
                className="absolute cursor-pointer bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <FiEdit size={16} />
                </button>
              </motion.div>
                    {/* profile pic update form */}
                   {picUpdataVisible ? ( <ProfilePicForm userId={user?._id} handlePicUpdateVisible={handlePicUpdateVisible}/>):''}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="InterRegular text-3xl font-bold text-gray-900 capitalize">{user?.role ==='artist' ? user?.stageName : user?.role ==='user'? user?.userName :''}</h1>
                    <p className="text-purple-600">{user?.email}</p>

                      <span className="capitalize inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                        {user?.role} Profile
                      </span>

                  </div>
                  <button onClick={handleProfileEdith} className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiSettings />
                    <span>Edit Profile</span>
                  </button>
                </div>

                <p className="mt-4 text-gray-600 max-w-2xl">{user?.bio}</p>

                <div className="flex space-x-6 mt-6">
                  <StatItem value={user?.followers.toLocaleString()} label="Followers" />
                  <StatItem value={user?.following.toLocaleString()} label="Following" />
                  <StatItem value={totalSnippets} label="Snippets" />
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex space-x-8">
                <TabButton active>Snippets</TabButton>
                <TabButton>Liked</TabButton>
                <TabButton>Playlists</TabButton>
                {user?.role === 'artist' && <TabButton>Analytics</TabButton>}
                {user?.role === 'admin' && <TabButton>Admin</TabButton>}
              </div>
            </div>

            {/* Content Grid */}
            <SnippetContainer setTotalSnippets={setTotalSnippets}/>
    {editingProfile && <EditProfile onCancel={handleProfileEdith} userData={user}/>}


          </div>
        </main>
      </div>
    </div>
  );
};

const StatItem = ({ value, label }) => (
  <div>
    <span className="font-bold text-gray-900">{value}</span>
    <span className="text-gray-500 text-sm ml-1">{label}</span>
  </div>
);

const TabButton = ({ children, active }) => (
  <button className={`pb-3 px-1 font-medium relative ${
    active
      ? 'text-purple-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600'
      : 'text-gray-500 hover:text-gray-700'
  }`}>
    {children}
  </button>
);



export default ProfilePage;