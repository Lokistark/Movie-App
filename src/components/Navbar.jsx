import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const Navbar = () => {
  const { watchlist } = useMovieContext();

  return (
    <nav className="bg-slate-900 text-white py-4 px-6 sticky top-0 z-50 shadow-xl ring-1 ring-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
          MovieApp
        </Link>

        <Link
          to="/watchlist"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          <span className="font-medium">Watchlist</span>
          <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full group-hover:scale-110 transition-transform">
            {watchlist.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

