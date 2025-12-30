import React, {
  useState,
  useEffect,
  createContext,
  useContext
} from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";
import { User } from "./types";
import { getMe } from "./services/user";

/* =======================
   PAGES
======================= */
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import VoicesPage from "./pages/VoicesPage";
import GeneratePage from "./pages/GeneratePage";
import PricingPage from "./pages/PricingPage";
import EnterprisePage from "./pages/EnterprisePage";
import ProfilePage from "./pages/ProfilePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import EmailVerifiedPage from "./pages/EmailVerifiedPage";

/* ADMIN PAGES (LOWERCASE FOLDER) */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";

/* =======================
   COMPONENTS
======================= */
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

/* =======================
   AUTH CONTEXT
======================= */
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

/* =======================
   ROUTE GUARDS
======================= */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

/* =======================
   APP
======================= */
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  /* 🔐 Restore session on refresh */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    getMe()
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  /* 🔓 Logout */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  /* ⏳ BLOCK RENDER UNTIL AUTH CHECK DONE */
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  /* PUBLIC ROUTES */
  const isAuthPage = [
    "/",
    "/login",
    "/signup",
    "/verify-email",
    "/email-verified"
  ].includes(location.pathname);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {!isAuthPage && user ? (
          /* =======================
             AUTHENTICATED LAYOUT
          ======================= */
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <Routes>
                  {/* USER ROUTES */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/voices"
                    element={
                      <ProtectedRoute>
                        <VoicesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/generate"
                    element={
                      <ProtectedRoute>
                        <GeneratePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <ProtectedRoute>
                        <PricingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/enterprise"
                    element={
                      <ProtectedRoute>
                        <EnterprisePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* ADMIN ROUTES */}
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <AdminUsers />
                      </AdminRoute>
                    }
                  />

                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          /* =======================
             PUBLIC ROUTES
          ======================= */
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/email-verified" element={<EmailVerifiedPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </AuthContext.Provider>
  );
};

export default App;
