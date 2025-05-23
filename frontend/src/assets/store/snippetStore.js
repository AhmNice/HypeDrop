import axios from "axios";
import { data } from "react-router-dom";
import { create } from "zustand";

axios.defaults.withCredentials = true;

const initialState = {
  allSnippets: null,
  success: false,
  isLoading: false,
  singleSnippet: null,
  mySnippets:null,
  error: null,
  trendingSnippets: null,
};

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const useSnippets = create((set) => ({
  ...initialState,

  fetchAllSnippets: async () => {
    const BASE_URL = `${BASE_API_URL}/snippets/all-snippet`;
    set({
      isLoading: true,
      success: false,
      allSnippets: null,
      error: null,
    });

    try {
      const { data } = await axios.get(BASE_URL);
      set({
        allSnippets: data.results,
        success: true,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message || "Error fetching snippets",
        isLoading: false,
        success: false,
      });
    }
  },
  singleSnippet: async(id)=>{
    const BASE_URL = `${BASE_API_URL}/get-snippet`;
    set({
      singleSnippet:null,
      success:false,
      error:null,
      isLoading:true
    })
    try {
      const { data } =await axios.post(BASE_URL, {id})
      set({
        singleSnippet: data.results,
        success:true,
        isLoading:false,
        error:null
      })
    } catch (error) {
      set({
        error:error.response?.data?.message || error.message || 'Error fetching snippet'
      })
    }
  },
  fetchArtistSnippets: async({id})=>{
    const BASE_URL = `${BASE_API_URL}/snippets/me`
    set({
      mySnippets:null,
      isLoading: true,
      error: null,
      success:false
    })
    try {
      const {data} = await axios.post(BASE_URL, {id});
      set({
        mySnippets: data.results,
        isLoading:false,
        success:true,
        error:null
      })
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message || 'error fetching snippets',
        isLoading:false,
        success:false
      })
    }
  },
  fetchTrendingSnippets: async()=>{
    const BASE_URL = `${BASE_API_URL}/trending`
    set({
      success:false,
      isLoading:true,
      error:null,
      trendingSnippets:null
    })
    try {
        const {data} = await axios.get(BASE_URL)
        set({
          success:true,
          isLoading:false,
          trendingSnippets:data.results,
          error:null
        })
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch trending songs',
        isLoading:false,
        success:false
      })
    }
  }
}));
