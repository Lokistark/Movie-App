import axios from 'axios';
import { mockMovies, mockGenres } from './mockData';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPopularMovies = async (page = 1) => {
    if (!API_KEY) {
        console.warn("No API Key found. Using Mock Data.");
        await delay(500);
        return {
            results: mockMovies,
            total_pages: 5,
            page: page
        };
    }
    try {
        const response = await api.get('/movie/popular', { params: { page } });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return { results: [], total_pages: 0 };
    }
};

export const searchMovies = async (query, page = 1) => {
    if (!API_KEY) {
        await delay(500);
        const lowerQuery = query.toLowerCase();
        const filtered = mockMovies.filter(movie =>
            movie.title.toLowerCase().includes(lowerQuery)
        );
        return {
            results: filtered,
            total_pages: 1,
            page: page
        };
    }
    try {
        const response = await api.get('/search/movie', { params: { query, page } });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return { results: [], total_pages: 0 };
    }
};

export const fetchGenres = async () => {
    if (!API_KEY) {
        return { genres: mockGenres };
    }
    try {
        const response = await api.get('/genre/movie/list');
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return { genres: [] };
    }
};

export const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/w500${path}`;
};
