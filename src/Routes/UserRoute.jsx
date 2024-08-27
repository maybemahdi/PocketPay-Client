import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading";

const UserRoute = ({ children }) => {
  const { currentUser, loading, isLoading: currentUserLoading } = useAuth();
  const location = useLocation();
  const { role, isLoading } = useRole();

  if (isLoading || loading || currentUserLoading) return <Loading />;
  if ((currentUser && role === "user") || (currentUser && role === "admin"))
    return children;

  return <Navigate to="/login" state={location.pathname} replace></Navigate>;
};

export default UserRoute;
