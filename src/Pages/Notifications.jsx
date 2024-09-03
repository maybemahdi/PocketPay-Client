import { useMutation } from "react-query";
import NotificationCard from "../Components/NotificationCard";
import useNotifications from "../Hooks/useNotifications";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import toast from "react-hot-toast";

const Notifications = () => {
  const { notifications, refetch } = useNotifications();
  const axiosCommon = useAxiosCommon();

  // mark as read
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosCommon.patch(
        `/api/notification/markAsRead/${id}`,
        { status: status.toLowerCase() }
      );
      return { data, status };
    },
    onSuccess: (result, variables, context) => {
      refetch();
      toast.success(`Marked as ${context.status}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onMutate: async (variables) => {
      return { status: variables.status };
    },
  });

  const handleMarkAsRead = async (id) => {
    await mutateAsync({ id, status: "Read" });
  };
  const handleMarkAsUnread = async (id) => {
    await mutateAsync({ id, status: "Unread" });
  };
  return (
    <div
      style={{ minHeight: "calc(100vh - 160px)" }}
      className="mb-5 flex flex-col justify-center"
    >
      <h3 className="text-center text-2xl font-semibold md:col-span-3 my-16">
        Your <span className="font-bold text-rose-500">Notifications</span>{" "}
        Appear Here!
      </h3>
      <div className="flex flex-col gap-4 items-center justify-center mb-16 w-full md:w-3/4 mx-auto">
        {notifications &&
          notifications?.length > 0 &&
          notifications?.map((notification) => (
            <NotificationCard
              key={notification?._id}
              notification={notification}
              handleMarkAsRead={handleMarkAsRead}
              handleMarkAsUnread={handleMarkAsUnread}
            />
          ))}
      </div>
    </div>
  );
};

export default Notifications;
