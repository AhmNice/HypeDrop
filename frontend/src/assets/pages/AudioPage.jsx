import React, { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AudioPage = () => {
  const { id } = useParams();
  const CLIENT = import.meta.env.VITE_CLIENT_BASE_URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [error, setError] = useState(null);
  const [snippet, setSnippet] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchData = async () => {
      const payload = { id };
      try {
        const res = await fetch(`${API_BASE_URL}/get-snippet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched snippet:', data.results); // Debug log
          setSnippet(data.results);
          setError(null); // Clear any previous errors
        } else {
          setError('Failed to fetch snippet');
        }
      } catch (error) {
        console.log(error.message);
        setError('An error occurred while fetching the snippet');
      }
    };
    fetchData();
  }, [id, API_BASE_URL]);

  const API_IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  return (
    <section className="bg-white">
      {error && <div className="text-red-500 text-center">{error}</div>}

      {snippet && snippet.title ? (
        <Helmet>
          <title>{snippet.stageName+'-'+ snippet.title}</title>
          <meta property="og:title" content={snippet.title} />
          <meta property="og:description" content={snippet.description || 'check this out snippet for my next single'} />
          <meta property="og:image" content={`${API_IMAGE_BASE_URL}/${snippet.cover_art}`} />
          <meta property="og:url" content={`${CLIENT}/snippet/${id}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={snippet.title} />
          <meta name="twitter:description" content={snippet.description} />
          <meta name="twitter:image" content={`${API_IMAGE_BASE_URL}/${snippet.cover_art}`} />
        </Helmet>
      ) : (
        <div className="text-center py-6 text-gray-500">Loading snippet...</div>
      )}

      {snippet && snippet.title ? (
        <SongCard snippet={snippet} />
      ) : (
        <div className="text-center py-6 text-gray-500">Loading snippet...</div>
      )}
    </section>
  );
};

export default AudioPage;