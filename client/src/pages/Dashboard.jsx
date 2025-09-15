import React, { useEffect, useState } from "react";
import api from "../api"; // axios instance with token interceptor
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/tasks");
        setTasks(Array.isArray(data) ? data : []); // backend returns an array
      } catch (err) {
        console.error("Error fetching tasks:", err.response?.data || err.message);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const { data } = await api.post("/tasks", { title });
      setTasks((prev) => [...prev, data]); // backend returns new task object
      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
      setError("Failed to add task");
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
      setError("Failed to delete task");
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Status */}
      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Task List */}
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-sm bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No tasks yet. Add one above!</p>
      )}
    </div>
  );
};

export default Dashboard;
