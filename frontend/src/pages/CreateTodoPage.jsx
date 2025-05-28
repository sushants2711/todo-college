import React, { useContext, useEffect, useState } from 'react';
import { Trash2, LogOut } from 'lucide-react';
import { handleError, handleSuccess } from '../error_handle/message';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../contextApi/AuthenticationContext';

export const CreateTodoPage = () => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(null);
  const [newTodo, setNewTodo] = useState({ text: "" });

  const { loginUserName, setLoginState } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  // Fetch all todos
  const fetchTodo = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/todo/fetch", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setTodo(result.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.text) return handleError("Can't submit empty todo");

    try {
      const response = await fetch("http://localhost:3000/api/todo/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo),
        credentials: 'include'
      });

      const result = await response.json();
      const { success, error, message } = result;

      if (success) {
        handleSuccess(message);
        setNewTodo({ text: "" });
        fetchTodo();
      } else {
        handleError(message || error || "Error occurred while creating todo");
      }
    } catch (err) {
      handleError(err.message);
    };
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: 'include'
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        setLoginState(false);
        navigate("/logout");
      } else if (!success) {
        handleError(message);
      } else if (error) {
        handleError(error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleUpdateTodo = async (id) => {
    try {
      const url = `http://localhost:3000/api/todo/update/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
      })
      const result = await response.json();

      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchTodo();
      } else if (!success) {
        handleError(message);
      } else if (error) {
        handleError(error)
      }
    } catch (error) {
      handleError(error)
    };
  };

  const handledetete = async (id) => {
    try {
      const url = `http://localhost:3000/api/todo/delete/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include"
      });

      const result = await response.json();

      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchTodo();
      } else if (!success) {
        handleError(message);
      } else if (error) {
        handleError(error || "Error occured to delete");
      };
    } catch (error) {
      handleError(error || "Error occured to delete the todo");
    };
  };

  return (
    <>
      {/* Top Left: User Name */}
      <div className="fixed top-4 left-4 z-50">
        <h1 className="text-gray-800 font-semibold text-base sm:text-lg border-b-2">{`Hey ${loginUserName}!`}</h1>
      </div>

      {/* Top Right: Logout */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Bottom Center: Delete Account */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
        <button
          onClick={() => navigate('/delete/user')}
          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm rounded-lg shadow-md transition-all"
        >
          Delete Account
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto mt-20 px-4 space-y-8 pb-28">


        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Create a New Todo</h2>
          <form
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name='text'
              value={newTodo.text}
              onChange={handleChange}
              placeholder="Enter your todo..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md transition-all font-semibold"
            >
             Add
            </button>
          </form>
        </div>


        {/* Todo List Section */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Your Todos</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : todo.length === 0 ? (
            <p className="text-center text-gray-400 italic">No todos yet!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {todo.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl shadow-md transition-all flex flex-col justify-between min-h-[120px]"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="accent-green-500 w-5 h-5 mt-1"
                      checked={item.isCompleted}
                      readOnly
                      onChange={() => handleUpdateTodo(item._id)}
                    />
                    <span
                      className={`text-gray-800 font-medium break-words ${item.isCompleted ? 'line-through text-gray-400' : ''
                        }`}
                    >
                      {item.text}
                    </span>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Trash2
                      size={20}
                      className="text-red-500 cursor-pointer hover:text-red-700 transition-all"
                      onClick={() => handledetete(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
