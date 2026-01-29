import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  // Industry Tip: If you don't have a 'loading' state,
  // ensure your AuthContext initial state for user is 'undefined'
  // instead of 'null' so you can distinguish between "Still checking" and "Not logged in".

  if (loading) {
    return <div>Verifying Session...</div>;
  }

  if (!user) {
    // No user found, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (user.role === allowedRole) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
  // User is authenticated, render the children (Layout/Dashboard)
  //   return <Outlet />;
};

export default ProtectedRoute;
