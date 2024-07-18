import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const { role, isLoading } = useRole();

  if (isLoading || loading) return <Loading />;
  if (currentUser && role === "admin") return children;

  return <Navigate to="/login" state={location.pathname} replace></Navigate>;
};

export default AdminRoute;
