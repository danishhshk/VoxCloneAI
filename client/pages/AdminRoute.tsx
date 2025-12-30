import { Navigate } from "react-router-dom";
import { useAuth } from "../App";

const AdminRoute = ({ children }: any) => {
  const { user } = useAuth();
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default AdminRoute;
