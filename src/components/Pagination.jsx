import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const Pagination = ({
    currentPage: propCurrentPage,
    totalPages: propTotalPages,
    onPageChange
}) => {
    const { currentPage, totalPages, handlePageChange } = useMovieContext();

    // Use props if provided, otherwise fall back to context
    const current = propCurrentPage || currentPage;
    const total = propTotalPages || totalPages;
    const handleChange = onPageChange || handlePageChange;

    if (total <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-6 mt-12 mb-16">
            <button
                onClick={() => handleChange(current - 1)}
                disabled={current === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-md text-slate-700 font-semibold hover:bg-slate-50 hover:shadow-lg hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 transition-all duration-300"
            >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
            </button>

            <span className="text-slate-500 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                Page <span className="text-slate-900 font-bold">{current}</span> of {total}
            </span>

            <button
                onClick={() => handleChange(current + 1)}
                disabled={current === total}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 shadow-md text-white font-semibold hover:bg-slate-800 hover:shadow-lg hover:translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:translate-x-0 transition-all duration-300"
            >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;
