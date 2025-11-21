import React from 'react';
import { Heart, Play } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';
import { getImageUrl } from '../services/api';

const MovieCard = ({ movie }) => {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieContext();
    const isFavorite = isInWatchlist(movie.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        if (isFavorite) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    return (
        <div className="relative rounded-xl overflow-hidden shadow-lg group bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ring-1 ring-black/5">
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-rose-500/80 transition-all duration-300 z-10 group-hover:scale-110"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'
                            }`}
                    />
                </button>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 hover:bg-white/30 cursor-pointer transition-colors">
                        <Play className="w-8 h-8 text-white fill-white pl-1" />
                    </div>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate leading-tight" title={movie.title}>
                    {movie.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                            TMDB
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;

