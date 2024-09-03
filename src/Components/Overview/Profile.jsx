import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const { currentUser, logout, update, setUpdate } = useAuth();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Sign Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        setUpdate(!update);
        Swal.fire({
          title: "Success!",
          text: "Your have been logged Out.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="max-w-[100%] mx-auto w-80">
      <div className="rounded-lg border-2 border-rose-500 bg-transparent p-4 text-center shadow-lg">
        <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            className="bi bi-person-fill text-white dark:text-rose-300"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
          </svg>
          <figcaption className="sr-only">{currentUser?.name}</figcaption>
        </figure>
        <h2 className="mt-4 text-xl font-bold text-rose-600 dark:text-rose-400">
          {currentUser?.name}
        </h2>
        <p className="mt-2 text-gray-600">
          Account Type:{" "}
          <span className="font-bold text-rose-500">
            {currentUser?.accountType.toUpperCase()}
          </span>
        </p>
        <p className="mb-4 text-gray-600">
          Role:{" "}
          <span className="font-bold text-rose-500">
            {currentUser?.role.toUpperCase()}
          </span>
        </p>
        <p className="mb-4 text-gray-600">
          Balance:{" "}
          <span className="font-bold text-rose-500">
            {currentUser?.balance.toFixed(2)} BDT
          </span>
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={handleLogout}
            className="rounded-full bg-rose-500 px-4 py-2 text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
