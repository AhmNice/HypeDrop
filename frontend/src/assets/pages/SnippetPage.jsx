import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SongCard from "../components/SongCard";
import SnippetCard2 from "../components/SnippetCard2";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import ShareOverlay from "../components/ShareOverlay";
import EdithForm from "../components/EdithForm";
import AudioLinksEditor from "../components/AudioLinksEditor";

const SnippetsPage = () => {
  const CLIENT_BASE_URL = import.meta.env.VITE_CLIENT_BASE_URL;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user, isAuthenticated } = useAuthStore();

  const [openModel, setOpenModel] = useState(false);
  const [toEdith, setToEdith] = useState();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toShare, setToShare] = useState("");
  const [isPreviewing, setIsPreViewing] = useState(false);
  const [playSnippet, setPlaySnippet] = useState(null);
  const [editingLink, setEditingLink] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState();
  const [snippetLinkToEdit, setSnippetLinkToEdit] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    genre: "all",
    sort: "popular",
  });

  const genres = ["all", "Pop", "R&B", "Hip-Hop", "Classical", "Rock", "Jazz"];

  const handleOverlay = () => setOverlayIsOpen((prev) => !prev);
  const handleToShare = (share) => setToShare(share);
  const handleModel = () => setOpenModel((prev) => !prev);
  const handlePreview = () => setIsPreViewing((prev) => !prev);
  const handlePreviewSong = (snippet) => {
    setPlaySnippet(snippet);
    handlePreview();
  };

  const handleEdith = (id) => {
    setToEdith(id);
    handleModel();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this snippet?")) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`${API_BASE_URL}/snippet/delete-snippet`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const onClose = (id) => {
    setEditingLink((prev) => !prev);
    setLinkToEdit(id);
  };

  const fetchData = async () => {
    if (isAuthenticated && user) {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/snippets/me`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ id: user._id }),
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setSnippets(data.results);
        } else {
          toast.error("Error fetching snippets");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (linkToEdit) {
      const snippet = snippets.find((s) => s._id === linkToEdit);
      setSnippetLinkToEdit(snippet);
    }
  }, [linkToEdit, snippets]);

  const filteredSnippets = snippets
    .filter((snippet) => {
      const matchesSearch =
        snippet.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.artistName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre =
        filters.genre === "all" || snippet.genre === filters.genre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (filters.sort === "popular") return b.plays - a.plays;
      if (filters.sort === "latest") return b.id - a.id;
      if (filters.sort === "likes") return b.likes - a.likes;
      return 0;
    });

  return (
    <section
      style={{ gridTemplateColumns: "20% 80%" }}
      className="w-full bg-gray-200 flex items-center justify-center h-screen"
    >
      <Navbar />
      <div className="bg-gray-200 w-full h-screen flex flex-col">
        <Header />

        {isDeleting && (
          <div className="overlay flex justify-center items-center w-full h-full z-50 top-0 left-0 absolute bg-black/40">
            <Loader2 className="animate-spin text-white" size={36} />
          </div>
        )}

        {editingLink && (
          <AudioLinksEditor
            onClose={onClose}
            id={linkToEdit}
            snippet={snippetLinkToEdit}
          />
        )}

        <div className="min-h-[80vh] overflow-scroll bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {openModel && <EdithForm handleModel={handleModel} id={toEdith} />}

            {/* Header and Search */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                All Snippets
              </h1>
              <p className="text-gray-600 mb-6">
                Browse through our collection of music snippets
              </p>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search snippets or artists..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D00FF] focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D00FF] focus:border-transparent"
                      value={filters.genre}
                      onChange={(e) =>
                        setFilters({ ...filters, genre: e.target.value })
                      }
                    >
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre === "all" ? "All Genres" : genre}
                        </option>
                      ))}
                    </select>
                    <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="relative">
                    <select
                      className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D00FF] focus:border-transparent"
                      value={filters.sort}
                      onChange={(e) =>
                        setFilters({ ...filters, sort: e.target.value })
                      }
                    >
                      <option value="popular">Most Popular</option>
                      <option value="latest">Latest</option>
                      <option value="likes">Most Likes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center items-center h-60 w-full">
                <Loader2 size={36} className="animate-spin text-[#7D00FF]" />
              </div>
            )}

            {/* Snippets Grid */}
            <div className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.map((snippet) => (
                <SnippetCard2
                  key={snippet._id}
                  snippet={snippet}
                  handlePreview={handlePreview}
                  handlePreviewSong={handlePreviewSong}
                  handleOverlay={handleOverlay}
                  handleToShare={handleToShare}
                  handleEdith={handleEdith}
                  handleDelete={handleDelete}
                  handleEdithLink={onClose}
                />
              ))}

              {overlayIsOpen && (
                <ShareOverlay
                  shareUrl={`${CLIENT_BASE_URL}/snippets/${toShare}`}
                  handleOverlay={handleOverlay}
                />
              )}

              {isPreviewing && (
                <SongCard
                  handlePreview={handlePreview}
                  snippet={playSnippet}
                />
              )}
            </div>

            {/* Empty State */}
            {filteredSnippets.length === 0 && !loading && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No snippets found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SnippetsPage;
