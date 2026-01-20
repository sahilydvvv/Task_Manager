import { useEffect, useState } from "react";
import api from "../services/api";
import { 
  FiActivity, 
  FiCheckCircle, 
  FiClock, 
  FiPieChart, 
  FiAlertTriangle, 
  FiTrendingUp,
  FiCalendar
} from "react-icons/fi";

const Analytics = ({ refreshKey }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get("/tasks/analytics");
        setData(res.data);
      } catch (error) {
        console.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [refreshKey]);

  if (loading || !data) {
    return (
      <div className="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    );
  }

  const StatCard = ({ title, value, color, icon: Icon, subText }) => {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-600 ring-blue-500/20",
      green: "bg-emerald-50 text-emerald-600 ring-emerald-500/20",
      yellow: "bg-amber-50 text-amber-600 ring-amber-500/20",
      red: "bg-rose-50 text-rose-600 ring-rose-500/20",
      purple: "bg-purple-50 text-purple-600 ring-purple-500/20",
    };

    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-gray-800 tracking-tight">
            {value}
            {subText && <span className="text-sm font-normal text-gray-400 ml-1">{subText}</span>}
          </h4>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]} ring-1`}>
          <Icon size={24} />
        </div>
      </div>
    );
  };

  return (
    <div className="mb-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Tasks" 
          value={data.totalTasks} 
          color="blue" 
          icon={FiActivity} 
        />
        <StatCard 
          title="Completed" 
          value={data.completedTasks} 
          color="green" 
          icon={FiCheckCircle} 
        />
        <StatCard 
          title="Pending" 
          value={data.pendingTasks} 
          color="yellow" 
          icon={FiClock} 
        />
        <StatCard 
          title="Completion Rate" 
          value={data.percentageCompleted} 
          subText="%" 
          color="purple" 
          icon={FiPieChart} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h4 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-gray-400" /> Workload Distribution
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col p-3 bg-rose-50 rounded-xl border border-rose-100 text-center">
              <span className="text-xs font-semibold text-rose-600 uppercase">High Priority</span>
              <span className="text-2xl font-bold text-gray-800 mt-1">{data.highPriorityTasks}</span>
            </div>
            <div className="flex flex-col p-3 bg-amber-50 rounded-xl border border-amber-100 text-center">
              <span className="text-xs font-semibold text-amber-600 uppercase">Medium</span>
              <span className="text-2xl font-bold text-gray-800 mt-1">{data.mediumPriorityTasks}</span>
            </div>
            <div className="flex flex-col p-3 bg-blue-50 rounded-xl border border-blue-100 text-center">
              <span className="text-xs font-semibold text-blue-600 uppercase">Low</span>
              <span className="text-2xl font-bold text-gray-800 mt-1">{data.lowPriorityTasks}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
           <h4 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
            <FiCalendar className="text-gray-400" /> Deadlines
          </h4>

           
           <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center gap-3">
                      <div className="bg-red-200 text-red-700 p-1.5 rounded-full">
                          <FiAlertTriangle size={16}/>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Overdue Tasks</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">{data.overdueTasks}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div className="flex items-center gap-3">
                      <div className="bg-indigo-200 text-indigo-700 p-1.5 rounded-full">
                          <FiClock size={16}/>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Due Today</span>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">{data.tasksDueToday}</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;