import React from 'react';
import { Search } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const SearchBar = () => {
    const { searchQuery, handleSearch } = useMovieContext();

    return (
        <div className="relative w-full max-w-md mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-full leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 sm:text-sm shadow-sm hover:shadow-md transition-all duration-300"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
