import { useEffect, useState } from "react";
import api from "../services/api";

const Analytics = ({ refreshKey }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await api.get("/tasks/analytics");
      setData(res.data);
    };

    fetchAnalytics();
  }, [refreshKey]);

  if (!data) {
    return (
      <p className="text-center text-gray-500 mb-6">
        Loading analytics...
      </p>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Analytics</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-xl font-bold">{data.totalTasks}</p>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-xl font-bold text-green-600">
            {data.completedTasks}
          </p>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-xl font-bold text-yellow-600">
            {data.pendingTasks}
          </p>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Completion</p>
          <p className="text-xl font-bold text-blue-600">
            {data.percentageCompleted}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">High Priority</p>
          <p className="font-semibold text-red-600">
            {data.highPriorityTasks}
          </p>
        </div>

        <div className="bg-orange-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Medium Priority</p>
          <p className="font-semibold text-orange-600">
            {data.mediumPriorityTasks}
          </p>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Low Priority</p>
          <p className="font-semibold text-green-600">
            {data.lowPriorityTasks}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <p>Due Today: {data.tasksDueToday}</p>
        <p>Overdue: {data.overdueTasks}</p>
      </div>
    </div>
  );
};

export default Analytics;
