import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { authenticated } = useAuth();

  if (authenticated === null) {
    return <p>Checking authentication...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
