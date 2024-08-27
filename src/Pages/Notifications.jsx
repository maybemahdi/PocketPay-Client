import NotificationCard from "../Components/NotificationCard";
import useNotifications from "../Hooks/useNotifications";

const Notifications = () => {
  const { notifications } = useNotifications();
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
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
