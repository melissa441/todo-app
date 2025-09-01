// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-pink-500 font-semibold">Loading...</p>
      </div>
    );
  }

  // if user is not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
