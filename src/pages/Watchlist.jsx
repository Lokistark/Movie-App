import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import GenreFilter from '../components/GenreFilter';
import Pagination from '../components/Pagination';
import { Heart } from 'lucide-react';

const Watchlist = () => {
    const {
        watchlist,
        genres,
        watchlistGenre,
        setWatchlistGenre,
        watchlistPage,
        setWatchlistPage
    } = useMovieContext();

    // Filter watchlist by genre
    const filteredWatchlist = watchlistGenre
        ? watchlist.filter(movie => movie.genre_ids.includes(parseInt(watchlistGenre)))
        : watchlist;

    // Pagination logic
    const itemsPerPage = 20;
    const totalPages = Math.ceil(filteredWatchlist.length / itemsPerPage);

    // Ensure current page is valid
    const currentPage = Math.min(Math.max(1, watchlistPage), Math.max(1, totalPages));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedWatchlist = filteredWatchlist.slice(startIndex, startIndex + itemsPerPage);

    // Handle genre change
    const handleGenreChange = (genreId) => {
        setWatchlistGenre(genreId);
        setWatchlistPage(1); // Reset to page 1 on filter change
    };

    // Handle page change
    const handlePageChange = (page) => {
        setWatchlistPage(page);
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                        <h1 className="text-4xl font-bold text-slate-900">My Watchlist</h1>
                        <span className="bg-slate-100 px-4 py-1 rounded-full text-sm text-slate-600 font-semibold">
                            {watchlist.length} movies
                        </span>
                    </div>

                    <div className="w-full md:w-auto">
                        <GenreFilter
                            genres={genres}
                            selectedGenre={watchlistGenre}
                            onGenreChange={handleGenreChange}
                        />
                    </div>
                </div>

                {paginatedWatchlist.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                            {paginatedWatchlist.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                        <div className="bg-slate-100 p-8 rounded-full mb-6">
                            <Heart className="w-16 h-16 text-slate-300" />
                        </div>
                        <p className="text-2xl font-bold text-slate-700">
                            {watchlist.length > 0 ? "No movies found in this genre" : "Your watchlist is empty"}
                        </p>
                        <p className="mt-2 text-slate-500">
                            {watchlist.length > 0 ? "Try selecting a different genre" : "Start adding movies you want to watch!"}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Watchlist;
