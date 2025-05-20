import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, Image, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePicForm = ({ handlePicUpdateVisible, userId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const profilePicRef = useRef();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    profilePicture: null,
    fileName:userId
  });

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging((prev)=> !prev)
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging((prev)=> !prev)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    setError(null);

    if (!file) {
      setError('No file selected');
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPEG,JPG, PNG, or WEBP images are allowed');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setFormData(prev => ({ ...prev, profilePicture: file }));
    };
    reader.onerror = () => setError('Error reading file');
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!formData.profilePicture) {
      setError('Please select an image');
      return;
    }

    setIsSubmitting(true);
    const payload = new FormData();
    payload.append('name', formData.fileName);
    payload.append('image',formData.profilePicture);
    payload.append('id', userId);
    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/me/update-profilePicture`,{
          method:'POST',
          body:payload,
          credentials:'include',

        });
        const data = await res.json()
        if(res.ok){
          toast.success('Profile picture updated successfully')
          handlePicUpdateVisible()
        }
    } catch (err) {
      setError(err.message);
      console.log(err, err.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overlay bg-opacity-50 flex justify-center items-center p-4"
      onClick={handlePicUpdateVisible}
    >
      {error? toast.error(error):''}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="rounded-xl w-full max-w-md bg-white p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePicUpdateVisible}
          aria-label="Close profile picture update"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-[#7D00FF] text-xl font-bold text-center mb-6">
          Change Profile Picture
        </h2>

        <div
          ref={profilePicRef}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`border-2 border-dashed rounded-lg h-64 w-full flex flex-col items-center justify-center cursor-pointer transition-colors ${
            previewImage ? 'border-transparent' : 'border-[#7D00FF] hover:border-[#9B30FF]'
          } mb-4 ${isDragging ? 'bg-gray-200':''} `}
        >
          <input
            ref={fileInputRef}
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            type="file"
            hidden
            onChange={handleFileChange}
          />

          {previewImage ? (
            <div className="relative w-full h-full">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-60 rounded-lg transition-opacity">
                <Upload className="text-white" size={32} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center p-6 text-center">
              <Upload className="text-[#7D00FF] mb-3" size={32} />
              <p className="text-sm font-medium text-gray-700 mb-1">
                Drag & drop your photo here
              </p>
              <p className="text-xs text-gray-500 mb-2">or click to browse</p>
              <p className="text-[10px] text-gray-400">
                JPEG, PNG, WEBP (Max 5MB)
              </p>
            </div>
          )}
        </div>

        {formData.profilePicture && (
          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 mb-4">
            <div className="flex items-center gap-2">
              <Image className="text-gray-500" size={16} />
              <span className="text-xs text-gray-700 truncate max-w-[180px]">
                {formData.profilePicture.name}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {(formData.profilePicture.size / 1024 / 1024).toFixed(2)}MB
            </span>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-xs mb-4 text-center">{error}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.profilePicture}
          aria-label="Submit profile picture update"
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-[#7D00FF] to-[#9B30FF] text-white font-medium shadow-md hover:shadow-lg transition-all ${
            isSubmitting || !formData.profilePicture ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              Uploading...
            </span>
          ) : (
            'Update Profile Picture'
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePicForm;