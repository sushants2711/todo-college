import React from 'react';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white px-4">
      <h1 className="text-7xl font-bold text-blue-400 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-300 mb-8 text-center">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <div className="grid md:grid-cols-2 gap-4 w-full max-w-xs">
        <Link
          to="/home"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-center transition-all"
        >
          Back to Home
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 text-center transition-all"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};
