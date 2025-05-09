import React from 'react';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-500 px-4">
      {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-6-"></div> */}

      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</p>
      <p className="text-white mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link
        to="/home"
        className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};
