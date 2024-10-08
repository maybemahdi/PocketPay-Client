import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, isLoading } = useAuth();
  const location = useLocation();

  if (loading || isLoading) return <Loading />;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default PrivateRoute;
