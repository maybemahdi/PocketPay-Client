import { useQuery } from "react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";

const useNotifications = () => {
  const axiosCommon = useAxiosCommon();
  const { currentUser } = useAuth();
  const {
    data: notifications,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["notifications", currentUser],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/api/notifications/${currentUser?.phone}`
      );
      return data;
    },
  });
  return {notifications, refetch, isLoading}
};

export default useNotifications;
