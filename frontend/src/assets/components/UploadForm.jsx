import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiImage, FiMusic, FiCalendar, FiType } from 'react-icons/fi';
import { Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Progress from './progress';
import axios from 'axios';


const UploadForm = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isAuthenticated } = useAuthStore()
  const [progress, setProgress] = useState()
  const [completed, setCompleted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    artistName: user?.stageName,
    coverPhoto: null,
    snippetFile: null,
    owner: user?._id
  });
  const [isDragging, setIsDragging] = useState({
    coverPhoto: false,
    snippetFile: false
  });
  const initialFormData = {
    title: '',
    genre: '',
    releaseDate: '',
    artistName: user?.stageName,
    coverPhoto: null,
    snippetFile: null,
    owner: user?._id,
  };

  const initialDraggingState = {
    coverPhoto: false,
    snippetFile: false,
  };
  const [previewImage, setPreviewImage] = useState(null);
  const coverPhotoRef = useRef(null);
  const snippetFileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'coverPhoto' && file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, coverPhoto: file }));
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      } else if (type === 'snippetFile' && file.type.startsWith('audio/')) {
        setFormData(prev => ({ ...prev, snippetFile: file }));
      }
    }
  };

  const handleDrag = (e, type, isEntering) => {
    e.preventDefault();
    setIsDragging(prev => ({ ...prev, [type]: isEntering }));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'coverPhoto' && file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, coverPhoto: file }));
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      } else if (type === 'snippetFile' && file.type.startsWith('audio/')) {
        setFormData(prev => ({ ...prev, snippetFile: file }));
      }
    }
    setIsDragging(prev => ({ ...prev, [type]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.role !== 'artist') {
      return toast.error('Unauthorized access');
    }

    setIsSubmitting(true);

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('releaseDate', formData.releaseDate);
    payload.append('artistName', formData.artistName);
    payload.append('owner', formData.owner);
    payload.append('genre', formData.genre);


    if (formData.coverPhoto) {
      payload.append('coverPhoto', formData.coverPhoto); // Field name must match multer config
    }

    if (formData.snippetFile) {
      payload.append('audio', formData.snippetFile); // Field name must match multer config
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/create-snippet`,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          },
        })

      const data = res.data;
      if (res.status === 200 || res.status === 201) {

        toast.success('Snippet uploaded successfully');
        setProgress(null)
        setCompleted(true)
        setFormData(initialFormData);
        setPreviewImage(null);
        setIsDragging(initialDraggingState);
      } else {
        toast.error(data.message || 'Upload failed');
      }

    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again');
    } finally {
      setIsSubmitting(false);
      completed(true)
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-3xl"
    >
      {progress && !completed && <Progress progress={progress}/>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cover Photo */}
          <div className="space-y-1">
            <label className="flex items-center text-gray-700 gap-2 text-base">
              <FiImage className="text-[#7D00FF]" />
              Cover Photo
            </label>
            <div
              ref={coverPhotoRef}
              onDragOver={(e) => handleDrag(e, 'coverPhoto', true)}
              onDragLeave={(e) => handleDrag(e, 'coverPhoto', false)}
              onDrop={(e) => handleDrop(e, 'coverPhoto')}
              onClick={() => document.getElementById('coverPhoto').click()}
              className={`border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging.coverPhoto ? 'border-[#7D00FF] bg-[#f3e8ff]' : 'border-gray-200 hover:border-[#7D00FF]'
                }`}
            >
              <input
                type="file"
                id="coverPhoto"
                accept="image/*"
                hidden
                onChange={(e) => handleFileChange(e, 'coverPhoto')}
              />
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <FiUpload className="text-xl text-[#7D00FF] mb-1" />
                  <p className="text-xs text-gray-500">Drag & drop or click</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">JPEG, PNG (Max 5MB)</p>
                </>
              )}
            </div>
            {formData.coverPhoto && (
              <p className="text-xs text-green-600 truncate">
                {formData.coverPhoto.name}
              </p>
            )}
          </div>

          {/* Snippet File */}
          <div className="space-y-1">
            <label className="flex items-center text-gray-700 gap-2 text-base">
              <FiMusic className="text-[#7D00FF]" />
              Audio Snippet
            </label>
            <div
              ref={snippetFileRef}
              onDragOver={(e) => handleDrag(e, 'snippetFile', true)}
              onDragLeave={(e) => handleDrag(e, 'snippetFile', false)}
              onDrop={(e) => handleDrop(e, 'snippetFile')}
              onClick={() => document.getElementById('snippetFile').click()}
              className={`border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging.snippetFile ? 'border-[#7D00FF] bg-[#f3e8ff]' : 'border-gray-200 hover:border-[#7D00FF]'
                }`}
            >
              <input
                type="file"
                id="snippetFile"
                accept="audio/*"
                name='audio'
                hidden
                onChange={(e) => handleFileChange(e, 'snippetFile')}
              />
              {formData.snippetFile ? (
                <div className="text-center p-2">
                  <FiMusic className="text-2xl text-[#7D00FF] mb-1 mx-auto" />
                  <p className="text-xs font-medium truncate">
                    {formData.snippetFile.name}
                  </p>
                </div>
              ) : (
                <>
                  <FiUpload className="text-xl text-[#7D00FF] mb-1" />
                  <p className="text-xs text-gray-500">Drag & drop or click</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">MP3, WAV (Max 10MB)</p>
                </>
              )}
            </div>
          </div>
        </div>

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
  );
};

export default UploadForm;