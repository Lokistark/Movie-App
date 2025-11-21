import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchPopularMovies, searchMovies, fetchGenres } from '../services/api';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved) : [];
    });
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState('');

    // Watchlist specific state
    const [watchlistGenre, setWatchlistGenre] = useState('');
    const [watchlistPage, setWatchlistPage] = useState(1);


    useEffect(() => {
        const loadGenres = async () => {
            const data = await fetchGenres();
            setGenres(data.genres || []);
        };
        loadGenres();
    }, []);

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            let data;
            if (searchQuery) {
                data = await searchMovies(searchQuery, currentPage);
            } else {
                data = await fetchPopularMovies(currentPage);
            }

            let results = data.results || [];

            
            if (selectedGenre && !searchQuery) {
               
                results = results.filter(m => m.genre_ids.includes(parseInt(selectedGenre)));
            }

            setMovies(results.slice(0, 20));
            setTotalPages(data.total_pages || 1);
            setLoading(false);
        };

        const timeoutId = setTimeout(() => {
            loadMovies();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, currentPage, selectedGenre]);

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (prev.find((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some((m) => m.id === movieId);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenre(genreId);
        setCurrentPage(1);
    };

    return (
        <MovieContext.Provider
            value={{
                movies,
                watchlist,
                genres,
                loading,
                searchQuery,
                currentPage,
                totalPages,
                selectedGenre,
                addToWatchlist,
                removeFromWatchlist,
                isInWatchlist,
                handleSearch,
                handlePageChange,
                handleGenreChange,
                watchlistGenre,
                setWatchlistGenre,
                watchlistPage,
                setWatchlistPage,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
