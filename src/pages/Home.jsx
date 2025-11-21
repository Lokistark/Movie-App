import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar';

const Home = () => {
    const { movies, loading } = useMovieContext();

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 mb-8 text-center tracking-tight">
                        Discover Movies
                    </h1>

                    <SearchBar />
                    <GenreFilter />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
                    </div>
                ) : (
                    <>
                        {movies.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                                {movies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-slate-500 mt-12">
                                <p className="text-xl">No movies found matching your criteria.</p>
                            </div>
                        )}

                        <Pagination />
                    </>
                )}
            </main>
        </div>
    );
};

export default Home;
