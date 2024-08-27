import { useMutation, useQuery } from "react-query";
import Loading from "../../Components/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Management = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: users,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    enabled: currentUser?.role === "admin",
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/allUser");
      return data;
    },
  });
  //update verify status by mutate async
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/api/verifyStatus/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: "Good job!",
        text: "The User Has been Verified as an Agent!",
        icon: "success",
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleVerify = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to verify him!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Verify!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(id);
      }
    });
  };
  if (isLoading) return <Loading />;
  return (
    <div
      style={{ minHeight: "calc(100vh - 150px)" }}
      className="mb-5 flex flex-col justify-center"
    >
      <h3 className="text-center text-2xl font-semibold md:col-span-3 mt-16">
        Manage all <span className="font-bold text-rose-500">Users</span>
      </h3>
      <div className="overflow-x-auto my-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Type</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr className="font-semibold" key={user?._id || idx}>
                <th>{idx + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.accountType.toUpperCase()}</td>
                <td>{user?.role.toUpperCase()}</td>
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>{user?.balance.toFixed(2)}</td>
                <td
                  className={`${
                    user?.status === "verified"
                      ? "text-green-500"
                      : "text-rose-500"
                  }`}
                >
                  {user?.status.slice(0, 1).toUpperCase() +
                    user?.status.slice(1)}
                </td>
                <td>
                  <button
                    disabled={user?.status === "verified"}
                    className={`btn bg-rose-500 hover:bg-rose-600 text-white disabled:text-black disabled:cursor-not-allowed`}
                    onClick={() => handleVerify(user?._id)}
                  >
                    {user?.status === "verified" ? "Verified" : "Verify"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Management;
