const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>

      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl p-4 shadow-md border"
          >
            <h4 className="text-lg font-bold mb-1">
              {task.title}
            </h4>

            <p className="text-sm text-gray-600 mb-3">
              {task.description}
            </p>

            <select
              value={task.status}
              onChange={(e) =>
                onUpdate(task._id, { status: e.target.value })
              }
              className="border rounded-md px-2 py-1 text-sm mr-2 mb-2"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={task.priority}
              onChange={(e) =>
                onUpdate(task._id, { priority: e.target.value })
              }
              className="border rounded-md px-2 py-1 text-sm mb-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="mt-3">
              <button
                onClick={() => onDelete(task._id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
