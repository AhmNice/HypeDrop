import React, { useEffect, useState } from 'react';
import SongCard from '../assets/components/SongCard';
import Overlay from '../assets/components/Overlay';
import { useParams } from 'react-router-dom';

const StreamPage = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await fetch(`http://localhost:8000/songs/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch song data');
        }
        const song = await res.json();
        setSong(song);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-home-gradient">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-home-gradient">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  document.title='HypeDrop | Stream'
  return (

    <div className="flex items-center justify-center bg-home-gradient w-full h-screen">
      <SongCard song={song} />
      {song?.released === true && <Overlay />} {/* Render Overlay conditionally */}
    </div>
  );
};

export default StreamPage;
