import { useState } from "react";
import api from "../services/api";
import { FiPlus, FiType, FiAlignLeft, FiFlag } from "react-icons/fi";

const CreateTask = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/tasks/createTask", {
        title,
        description,
        priority,
      });

      setTitle("");
      setDescription("");
      setPriority("medium");
      
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      console.error("Error creating task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 font-bold flex items-center gap-2">
          <span className="bg-blue-100 text-blue-600 p-1 rounded-md">
            <FiPlus />
          </span>
          New Task
        </h3>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <FiType className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2 bg-gray-50 text-black border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="relative">
          <FiAlignLeft className="absolute left-3 top-3 text-gray-400" />
          <textarea
            className="w-full pl-9 pr-3 py-2 bg-gray-50 text-black border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 resize-none"
            placeholder="Add details (optional)..."
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex gap-2">
          <div className="relative w-1/3">
            <FiFlag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              className="w-full pl-9 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-600"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={loading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTask;