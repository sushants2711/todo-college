import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../error_handle/message';
import { ToastContainer } from 'react-toastify';

export const DeletePage = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    };

    if (password.length < 8) {
      return handleError("Password should be 8 characters long!")
    }

    const confirm = window.confirm("Are you sure you want to permanently delete your account?");
    if (!confirm) return;


    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        setTimeout(() => {
          navigate("/signup");
        }, 1000);
      } else if (!success) {
        handleError(message);
      } else if (error) {
        handleError(error);
      };
    }
    catch (err) {
      handleError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Delete Your Account</h2>
        <p className="text-gray-500 mb-6 text-center">This action is irreversible. Please confirm your details.</p>

        <form onSubmit={handleDelete} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Confirm your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

