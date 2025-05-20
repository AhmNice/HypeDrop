import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit2, FiGlobe, FiX, FiCheck } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaYoutube, FaSoundcloud, FaSpotify } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const EditProfile = ({ userData, onCancel }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [formData, setFormData] = useState({
    stageName: '',
    bio: '',
    email: '',
    socials: {
      twitter: '',
      instagram: '',
      youtube: '',
      soundcloud: '',
      spotify: '',
      website: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form with user data when component mounts or userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        stageName: userData.stageName || '',
        bio: userData.bio || '',
        email: userData.email || '',
        socials: {
          twitter: userData.socials?.twitter || '',
          instagram: userData.socials?.instagram || '',
          youtube: userData.socials?.youtube || '',
          soundcloud: userData.socials?.soundcloud || '',
          spotify: userData.socials?.spotify || '',
          website: userData.socials?.website || ''
        }
      });
    }
  }, [userData]);

  // submitting form
  const onSave = () => {
    const id = userData._id;
    const { stageName, bio, email } = formData;
    const payload = {
      id,
      stageName,
      bio,
      email,
      socials: formData.socials  // send the full socials object!
    };

    const submitData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/me/update-profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
          toast.success('Profile updated successfully');
          onCancel();
        } else {
          toast.error(data.message || 'Failed to update profile');
        }
      } catch (error) {
        console.error('Error submitting profile update:', error.message);
        toast.error('An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    };

    setIsSubmitting(true);
    submitData();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <section className='absolute z-50 overlay backdrop-blur-sm flex justify-center items-center w-full h-full top-0 left-0'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white custom-scrollbar  rounded-lg shadow-md overflow-auto h-[550px] w-3xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiEdit2 className="mr-2" /> Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Stage Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiUser className="mr-2" /> Stage Name
            </label>
            <input
              type="text"
              name="stageName"
              value={formData.stageName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your artist/stage name"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiMail className="mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Tell your story..."
            />
          </div>

          {/* Social Media Links */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <FiGlobe className="mr-2" /> Social Media Links
            </h3>

            <div className="space-y-4">
              {/* Twitter */}
              <div className="flex items-center">
                <FaTwitter className="text-blue-400 text-xl mr-3 w-6" />
                <input
                  type="url"
                  value={formData.socials.twitter}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>

              {/* Instagram */}
              <div className="flex items-center">
                <FaInstagram className="text-pink-500 text-xl mr-3 w-6" />
                <input
                  type="url"
                  value={formData.socials.instagram}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://instagram.com/yourusername"
                />
              </div>

              {/* YouTube */}
              <div className="flex items-center">
                <FaYoutube className="text-red-500 text-xl mr-3 w-6" />
                <input
                  type="url"
                  value={formData.socials.youtube}
                  onChange={(e) => handleSocialChange('youtube', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>

              {/* SoundCloud */}
              <div className="flex items-center">
                <FaSoundcloud className="text-orange-500 text-xl mr-3 w-6" />
                <input
                  type="url"
                  value={formData.socials.soundcloud}
                  onChange={(e) => handleSocialChange('soundcloud', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://soundcloud.com/yourusername"
                />
              </div>

              {/* Spotify */}
              <div className="flex items-center">
                <FaSpotify className="text-green-500 text-xl mr-3 w-6" />
                <input
                  type="url"
                  value={formData.socials.spotify}
                  onChange={(e) => handleSocialChange('spotify', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://open.spotify.com/artist/yourid"
                />
              </div>

              {/* Website */}
              <div className="flex items-center">
                <FiGlobe className="text-gray-500 text-xl mr-3 w-6" />
                <input
                  type="url"
                  value={formData.socials.website}
                  onChange={(e) => handleSocialChange('website', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FiX className="mr-2" /> Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
              disabled={isSubmitting}
              className={`
    px-4 py-2 bg-indigo-600 text-white rounded-md
    flex items-center justify-center gap-2
    transition-colors duration-200
    ${isSubmitting
                  ? 'opacity-75 cursor-not-allowed'
                  : 'hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                }
  `}
              aria-disabled={isSubmitting}
              aria-label={isSubmitting ? "Saving changes" : "Save changes"}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Saving</span>
                </>
              ) : (
                <>
                  <FiCheck size={18} />
                  <span>Save Changes</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default EditProfile;