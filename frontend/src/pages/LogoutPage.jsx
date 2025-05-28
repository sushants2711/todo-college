import React from 'react'
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom'

export const LogoutPage = () => {
  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 text-green-600 rounded-full p-4">
            <LogOut size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Successfully Logged Out</h1>
        <p className="text-gray-500 mb-6">You have been safely signed out of your account.</p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl transition"
        >
          Back to Login
        </Link>
      </div>
      </div>
  )
}
