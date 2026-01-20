import React from "react";
import { FiTrash2, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "border-l-4 border-red-500 bg-red-50";
      case "medium": return "border-l-4 border-amber-500 bg-amber-50";
      case "low": return "border-l-4 border-green-500 bg-green-50";
      default: return "border-l-4 border-gray-300";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed": return "bg-emerald-100 text-emerald-700 ring-emerald-600/20";
      case "in-progress": return "bg-blue-100 text-blue-700 ring-blue-700/10";
      default: return "bg-gray-100 text-gray-600 ring-gray-500/10";
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
        <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
          <FiCheckCircle className="w-full h-full" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 relative overflow-hidden flex flex-col`}
        >
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityColor(task.priority).split(" ")[1]}`}></div>

          <div className="p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-2 pl-2">
              <h4 className="text-lg font-bold text-gray-800 leading-snug break-words pr-6">
                {task.title}
              </h4>
              <button
                onClick={() => onDelete(task._id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                title="Delete Task"
              >
                <FiTrash2 size={18} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-6 pl-2 flex-grow break-words">
              {task.description || "No description provided."}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-50 pl-2">
              
              <div className="relative">
                <select
                  value={task.status}
                  onChange={(e) => onUpdate(task._id, { status: e.target.value })}
                  className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${getStatusStyle(task.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex-1 flex justify-end">
                <select 
                    value={task.priority}
                    onChange={(e) => onUpdate(task._id, { priority: e.target.value })}
                    className="text-xs text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-gray-700 font-medium text-right appearance-none"
                    style={{textAlignLast: 'right'}}
                >
                   <option value="low">Low Priority</option>
                   <option value="medium">Medium Priority</option>
                   <option value="high">High Priority</option>
                </select>
                <span className="text-xs text-gray-400 ml-1 mt-0.5">●</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;