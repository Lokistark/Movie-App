import React from 'react';
import { useMovieContext } from '../context/MovieContext';

const GenreFilter = ({
    genres: propGenres,
    selectedGenre: propSelectedGenre,
    onGenreChange
}) => {
    const { genres, selectedGenre, handleGenreChange } = useMovieContext();

    // Use props if provided, otherwise fall back to context
    const currentGenres = propGenres || genres;
    const currentSelected = propSelectedGenre !== undefined ? propSelectedGenre : selectedGenre;
    const handleChange = onGenreChange || handleGenreChange;

    return (
        <div className="mb-6 flex justify-center">
            <select
                value={currentSelected}
                onChange={(e) => handleChange(e.target.value)}
                className="block w-full max-w-xs px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
                <option value="">All Genres</option>
                {currentGenres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GenreFilter;
