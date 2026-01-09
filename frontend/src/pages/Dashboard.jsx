import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Analytics from "../components/Analytics";
import TaskList from "../components/TaskLists";
import CreateTask from "../components/CreateTask";

const Dashboard = () => {
  const { logout } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      if (status) params.status = status;
      if (priority) params.priority = priority;
      if (search) params.search = search;

      const res = await api.get("/tasks/getTasks", { params });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [status, priority, search]);

  const refreshAll = async () => {
    await fetchTasks();
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/deleteTask/${taskId}`);
      refreshAll();
    } catch (error) {
      setError("Failed to delete task.");
    }
  };

  const handleUpdate = async (taskId, updates) => {
    try {
      await api.patch(`/tasks/updateTask/${taskId}`, updates);
      refreshAll();
    } catch (error) {
      setError("Failed to update task.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <Analytics refreshKey={refreshKey} />

      <div className="mb-6">
        <CreateTask onTaskCreated={refreshAll} />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          className="border rounded-md px-3 py-2 w-full md:w-1/3"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-md px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="border rounded-md px-3 py-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {loading && (
        <p className="text-center text-gray-500">Loading tasks...</p>
      )}

      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
