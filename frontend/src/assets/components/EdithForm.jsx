import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { FiUpload, FiImage, FiMusic, FiCalendar, FiType } from 'react-icons/fi';
import { Loader, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Progress from './progress';
import axios from 'axios';

const EdithForm = ({ id, handleModel  }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isAuthenticated } = useAuthStore()
  const [progress, setProgress] = useState()
  const [completed, setCompleted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    artistName: user.stageName,
    coverPhoto: null,
    snippetFile: null,
    owner: user._id,
    id:id
  });
  const [isDragging, setIsDragging] = useState({
    coverPhoto: false,
    snippetFile: false
  });
  const initialFormData = {
    title: '',
    genre: '',
    releaseDate: '',
    artistName: user.stageName,
    coverPhoto: null,
    snippetFile: null,
    owner: user._id,
    id:id
  };

  const initialDraggingState = {
    coverPhoto: false,
    snippetFile: false,
  };
  const [previewImage, setPreviewImage] = useState(null);
  const coverPhotoRef = useRef(null);
  const snippetFileRef = useRef(null);
  const preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDrag = (e, type, isEntering) => {
    preventDefaults(e)
    setIsDragging((prev) => ({ ...prev, [type]: isEntering }))
  }

  const handleDrop = (e, type) => {
    preventDefaults(e)
    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'coverPhoto' && file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, coverPhoto: file }));
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file)
      } else if (type === 'snippetFile' && file.type.startsWith('audio/')) {
        setFormData(prev => ({ ...prev, snippetFile: file }))
      }
    }
    setIsDragging(prev => ({ ...prev, [type]: false }))
  }
  const handleFileChange = (e, type) => {
    preventDefaults(e)
    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'coverPhoto' && file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, coverPhoto: file }));
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      } else if (type === 'snippetFile' && file.type.startsWith('audio/')) {
        setFormData(prev => ({ ...prev, snippetFile: file }))
      }
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (user.role !== 'artist') {
      return toast.error('Unauthorized action')
    }



    if (formData.coverPhoto) {
      payload.append('coverPhoto', formData.coverPhoto)
    }
    if (formData.snippetFile) {
      payload.append('audio', formData.snippetFile); // Field name must match multer config
    }

    try {
     const res = await fetch(`${API_BASE_URL}/update-snippets/me`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify(formData)
     })
     const data = await res.json()
     if(res.ok){
      toast.success('Updated successfully')
      setIsSubmitting(false)
      setFormData(initialFormData)
      handleModel()
     }
    } catch (error) {
      console.log(error)
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <div className='overlay w-full h-screen flex justify-center items-center top-0 left-0 absolute z-50'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-xl"
      >
        <div className='flex justify-end w-full'>
          <X aria-label='close model' onClick={handleModel} size={24} className='text-black' />
        </div>
        {progress && !completed && <Progress progress={progress} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" mb-8">
            <h1 className="text-2xl font-bold text-[#7D00FF]">Upload a Snippet</h1>
            <p className="text-gray-500 text-base mt-1">Share your music with the world</p>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="flex items-center text-gray-700 gap-2 text-base">
              <FiType className="text-[#7D00FF]" />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Snippet Title"
              className="w-full border border-gray-300 rounded-lg p-2 text-base focus:ring-2 focus:ring-[#7D00FF] focus:border-transparent transition"
              required
            />
          </div>

          {/* Genre */}
          <div className="space-y-1">
            <label className="flex items-center text-gray-700 gap-2 text-base">
              <FiMusic className="text-[#7D00FF]" />
              Genre
            </label>
            <input
              type="text"
              name="releaseDate"
              value={formData.genre}
              onChange={handleChange}
              placeholder='snippet genre'
              className="w-full border border-gray-300 rounded-lg p-2 text-base focus:ring-2 focus:ring-[#7D00FF] focus:border-transparent transition"
              required
            />
          </div>
          {/* Release Date */}
          <div className="space-y-1">
            <label className="flex items-center text-gray-700 gap-2 text-base">
              <FiCalendar className="text-[#7D00FF]" />
              Release Date
            </label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-base focus:ring-2 focus:ring-[#7D00FF] focus:border-transparent transition"
              required
            />
          </div>

          {/* File Uploads */}


          {/* Submit Button */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full InterRegular flex items-center justify-center py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all ${isSubmitting ? 'opacity-80' : ''}`}
            >
              {isSubmitting ?
                <span className='flex items-center gap-3'>
                  <Loader className='animate-spin mx-auto' size={20} />
                  <span className='InterRegular'>Submitting</span>
                </span>
                : 'Upload Snippet'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default EdithForm
