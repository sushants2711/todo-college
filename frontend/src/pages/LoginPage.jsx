import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../error_handle/message';
import { AuthenticationContext } from '../contextApi/AuthenticationContext';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {

  const navigate = useNavigate();

  const { setLoginUserName, setLoginState } = useContext(AuthenticationContext);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setLoginData({
      ...loginData,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    // Validation
    if (!email || !password) {
      return handleError('All fields are required.');
    }

    if (password.length < 8) {
      return handleError('Password must be at least 8 characters long.');
    }

    try {
      const response = await fetch('https://todo-college-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Needed for sending cookies if using sessions
        body: JSON.stringify(loginData),
      });

      const result = await response.json();


      const { success, message, error, name, email } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);

        // Update context
        setLoginUserName(name);
        // Navigate after a slight delay
        setTimeout(() => {
          navigate('/home');
        }, 1000);

        // Reset form
        setLoginData({ email: '', password: '' });

      } else if (error) {
        handleError(error);
      } else {
        handleError(message || 'Login failed');
      }
    } catch (err) {
      handleError('Something went wrong. Try again later.');
    };
  };

 

  // Restore context state from localStorage (on page reload)
  useEffect(() => {
    const nameFromStorage = localStorage.getItem('name');
    if (nameFromStorage) {
      setLoginUserName(nameFromStorage);
      setLoginState(true);
    };
  }, [setLoginUserName, setLoginState]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-gray-600 via-white to-gray-600 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={loginData.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={loginData.password}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
