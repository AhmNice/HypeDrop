import React, { useEffect, useState } from 'react';
import SnippetCard from '../components/SnippetCard';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { LoaderCircleIcon } from 'lucide-react';
import ShareOverlay from './ShareOverlay';
import SongCard from './SongCard';
import AudioLinksEditor from './AudioLinksEditor';


const SnippetContainer = ({setTotalSnippets}) => {
  const { user, isAuthenticated } = useAuthStore();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ toShare, setToShare ] = useState('')
  const [ isPreviewing, setIsPreViewing ] = useState(false)
  const [ playSnippet, setPlaySnippet ] = useState(null)

  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const CLIENT_BASE_URL = import.meta.env.VITE_CLIENT_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        setLoading(true);
        const payload = {
          id: user?._id,
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
            setSnippets(data.results);
          } else {
            // toast.error('Error fetching snippets ');
            console.log('empty')
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user, isAuthenticated,]);

  const handleOverlay = () => {
    setOverlayIsOpen((prev) => !prev);
  };
  const handleToShare =(share)=>{
      setToShare(share)
  }

  if (loading) {
    return <LoaderCircleIcon size={25} className="animate-spin mx-auto my-auto" />;
  }

  if (snippets.length === 0) {
    return <div>No snippets found.</div>;
  }
  setTotalSnippets(snippets.length)
  const handlePreview =()=>{
    setIsPreViewing((prev)=> !prev)
  }
  const handlePreviewSong =(snippet)=>{
    setPlaySnippet(snippet)
    handlePreview()
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet, i) => (
        <SnippetCard handlePreview={handlePreview}  handlePreviewSong={handlePreviewSong} key={i} snippet={snippet} handleOverlay={handleOverlay} handleToShare={handleToShare}/>
      ))}
      {overlayIsOpen ?
        <ShareOverlay
        shareUrl={`${CLIENT_BASE_URL}/snippets/${toShare}`}
        handleOverlay={handleOverlay} />:''}
        {isPreviewing? <SongCard handlePreview={handlePreview} snippet={playSnippet}/>:''}


    </div>
  );
};

export default SnippetContainer;