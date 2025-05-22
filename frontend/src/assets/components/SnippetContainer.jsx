import React, { useEffect, useState } from 'react';
import SnippetCard from '../components/SnippetCard';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { LoaderCircleIcon } from 'lucide-react';
import ShareOverlay from './ShareOverlay';
import SongCard from './SongCard';
import { useSnippets } from '../store/snippetStore';

const SnippetContainer = ({ setTotalSnippets }) => {
  const { user, isAuthenticated } = useAuthStore();
  const {
    allSnippets,
    mySnippets,
    isLoading,
    error,
    success,
    fetchArtistSnippets,
    fetchAllSnippets,
  } = useSnippets();

  const [snippets, setSnippets] = useState([]);
  const [toShare, setToShare] = useState('');
  const [isPreviewing, setIsPreViewing] = useState(false);
  const [playSnippet, setPlaySnippet] = useState(null);
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);

  const CLIENT_BASE_URL = import.meta.env.VITE_CLIENT_BASE_URL;

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user) return;

      try {
        if (user.role === 'artist') {
          await fetchArtistSnippets({ id: user._id });
        } else if (user.role === 'user') {
          await fetchAllSnippets();
        }
      } catch (err) {
        toast.error(err?.message || 'Failed to fetch snippets');
      }
    };

    if (isAuthenticated && user) {
      fetchSnippets();
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (user?.role === 'artist') {
      setSnippets(mySnippets || []);
    } else if (user?.role === 'user') {
      setSnippets(allSnippets || []);
    }
  }, [mySnippets, allSnippets, user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    setTotalSnippets(snippets.length);
  }, [snippets]);

  const handleOverlay = () => {
    setOverlayIsOpen((prev) => !prev);
  };

  const handleToShare = (share) => {
    setToShare(share);
  };

  const handlePreview = () => {
    setIsPreViewing((prev) => !prev);
  };

  const handlePreviewSong = (snippet) => {
    setPlaySnippet(snippet);
    handlePreview();
  };

  if (isLoading) {
    return <LoaderCircleIcon size={25} className="animate-spin mx-auto my-auto" />;
  }

  if (snippets.length === 0) {
    return <div className="text-center text-gray-500">No snippets found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet, i) => (
        <SnippetCard
          key={i}
          snippet={snippet}
          handleOverlay={handleOverlay}
          handleToShare={handleToShare}
          handlePreview={handlePreview}
          handlePreviewSong={handlePreviewSong}
        />
      ))}

      {overlayIsOpen && (
        <ShareOverlay
          shareUrl={`${CLIENT_BASE_URL}/snippets/${toShare}`}
          handleOverlay={handleOverlay}
        />
      )}

      {isPreviewing && (
        <SongCard handlePreview={handlePreview} snippet={playSnippet} />
      )}
    </div>
  );
};

export default SnippetContainer;
