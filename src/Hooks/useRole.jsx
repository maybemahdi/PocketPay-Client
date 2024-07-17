import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";


const useRole = () => {
  const axiosCommon = useAxiosCommon();
  const { user, loading } = useAuth();
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/role/${user?.email}`);
      return data;
    },
  });
  return { role, isLoading };
};

export default useRole;