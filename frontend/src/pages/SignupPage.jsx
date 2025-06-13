import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../error_handle/message';
import { useNavigate, Link } from 'react-router-dom';


export const SignupPage = () => {

  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormdata({
      ...formdata,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const { name, email, password, confirmPassword } = formdata;

    if (!name || !email || !password || !confirmPassword) {
      return handleError("All fields are required ......");
    };

    if (password !== confirmPassword) {
      return handleError("Password not match");
    };

    if (password.length < 8 || confirmPassword.length < 8) {
      return handleError("password length should be 8 characters long");
    };

    try {
      const url = "http://localhost:3000/api/auth/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata),
        credentials: 'include'
      });

      const result = await response.json();
      console.log(result);

      const { success, message, error, name, email } = result;

      if (success) {

        handleSuccess(message);

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        setTimeout(() => {
          navigate("/login");
        }, 1000);

        setFormdata({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

      }

      else if (error) {
        handleError(error);
      }

      else if (!success) {
        handleError(message)
      }

    }
    catch (error) {
      handleError(error);
    };
  };



  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                value={formdata.name}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                value={formdata.email}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
                value={formdata.password}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name="confirmPassword"
                onChange={handleChange}
                value={formdata.confirmPassword}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Sign Up
            </button>
            <p className="text-sm text-center text-gray-500">
              Already have an account?  <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}



