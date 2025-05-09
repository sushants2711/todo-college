import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../error_handle/message';
import { AuthenticationContext } from '../contextApi/AuthenticationContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

  const navigate = useNavigate();

  const { loginState, setLoginUserName, setLoginState } = useContext(AuthenticationContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      return handleError("All fields are required ......");
    };

    if (password.length < 8) {
      return handleError("password must be 8 characters long");
    };

    try {
      const url = "http://localhost:3000/api/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
        credentials: 'include'
      });

      const result = await response.json();
      console.log(result);

      const { success, message, error, name, email } = result;

      if (success) {

        handleSuccess(message);

        setLoginUserName(name);

        localStorage.setItem("email", email);

        setLoginState(true);

        setTimeout(() => {
          navigate("/home");
        }, 1000);

        setLoginData({
          email: "",
          password: ""
        });
      }

      else if (error) {
        handleError(error);
      }

      else if (!success) {
        handleError(message)
      }

    } catch (error) {
      handleError(error);
    };
  };

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
              Don't have an account? <span className="text-blue-600 hover:underline cursor-pointer">Sign Up</span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
