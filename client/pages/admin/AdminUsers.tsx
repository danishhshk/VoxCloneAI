import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  const updatePlan = async (id: string, plan: string) => {
    await api.post("/admin/update-plan", { userId: id, plan });
    alert("Plan updated");
  };

  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead>
        <tr>
          <th>Email</th>
          <th>Plan</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u._id}>
            <td>{u.email}</td>
            <td>{u.plan}</td>
            <td>
              <button onClick={() => updatePlan(u._id, "PRO")}>
                Upgrade to Pro
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminUsers;
