import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import TaskList from "../components/TaskLists";
import CreateTask from "../components/CreateTask";

import { FiLogOut, FiSearch, FiActivity } from "react-icons/fi";

import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend
} from "recharts";

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
      const params = {};
      if (status) params.status = status;
      if (priority) params.priority = priority;
      if (search) params.search = search;

      const res = await api.get("/tasks/getTasks", { params });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [status, priority, search]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const refreshAll = async () => {
    await fetchTasks();
    setRefreshKey((prev) => prev + 1);
  };

  const handleDelete = async (taskId) => {
    await api.delete(`/tasks/deleteTask/${taskId}`);
    refreshAll();
  };

  const handleUpdate = async (taskId, updates) => {
    await api.patch(`/tasks/updateTask/${taskId}`, updates);
    refreshAll();
  };

  const statusData = [
    { name: "Pending", value: tasks.filter(t => t.status === "pending").length, color: "#fbbf24" },
    { name: "In Progress", value: tasks.filter(t => t.status === "in-progress").length, color: "#60a5fa" },
    { name: "Completed", value: tasks.filter(t => t.status === "completed").length, color: "#34d399" },
  ];

  const priorityData = [
    { name: "Low", value: tasks.filter(t => t.priority === "low").length },
    { name: "Medium", value: tasks.filter(t => t.priority === "medium").length },
    { name: "High", value: tasks.filter(t => t.priority === "high").length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      <nav className="bg-white sticky top-0 z-30 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <FiActivity className="text-blue-600 text-xl" />
           <h1 className="text-xl font-bold text-gray-800">SmartTasker</h1>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
          <FiLogOut /> Sign Out
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h3 className="text-gray-700 font-bold mb-2 w-full text-left">Task Overview</h3>
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-8">
                 <span className="text-3xl font-bold text-gray-800">{tasks.length}</span>
                 <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-gray-700 font-bold mb-4">Workload by Priority</h3>
             <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData} layout="vertical" barSize={30}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
             </div>
          </div>

        </div>

        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Add New Task</h2>
            <div className="bg-white rounded-xl overflow-hidden p-1">
              <CreateTask onTaskCreated={refreshAll} />
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
           <div className="relative w-full md:w-96">
             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
             <input
               className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Search tasks..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>

           <div className="flex gap-2 w-full md:w-auto">
             <select
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
           </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : (
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
        )}
      </div>
    </div>
  );
};

export default Dashboard;