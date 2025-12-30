import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h4>Total Users</h4>
        <p className="text-3xl font-bold">{stats.totalUsers}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h4>Pro Users</h4>
        <p className="text-3xl font-bold">{stats.proUsers}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h4>Total Revenue</h4>
        <p className="text-3xl font-bold">₹{stats.revenue}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
