import { useQuery } from "react-query";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const CashInRequest = () => {
  const axiosCommon = useAxiosCommon();
  const { currentUser, refetch: userRefetch } = useAuth();
  const {
    data: requests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cashInRequests", currentUser],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/cashInReq/${currentUser?.phone}`
      );
      return data;
    },
  });
  if (isLoading) return <Loading />;
  const handleApproval = async (req) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if(currentUser?.balance < req?.amount){
            return toast.error("You don't have enough Balance!")
          }
          const { data } = await axiosCommon.put("/acceptCashIn", req);
          console.log(data);
          if (data.message === "Approved") {
            refetch();
            userRefetch();
            Swal.fire({
              title: "Approved!",
              text: "Cash In Request Approved, Amount has been deducted from your balance",
              icon: "success",
            });
          }
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleDecline = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Decline!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosCommon.put(`/rejectCashIn/${id}`);
          console.log(data);
          if (data.modifiedCount > 0) {
            refetch();
            userRefetch();
            Swal.fire({
              title: "Declined!",
              text: "Cash In Request Declined",
              icon: "success",
            });
          }
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div
      style={{ minHeight: "calc(100vh - 180px)" }}
      className="mb-5 flex flex-col justify-center items-center mt-10 md:mt-0"
    >
      {requests?.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mb-5">
          <h3 className="text-rose-500 font-bold text-3xl text-center">
            Pending Cash in Requests
          </h3>
          <p className="text-center">Approve to Allow Cash-In or Decline!</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mb-5">
          <h3 className="text-rose-500 font-bold text-3xl text-center">
            No Pending Requests
          </h3>
        </div>
      )}
      {requests?.length > 0 && (
        <div className="overflow-x-auto mt-5 w-3/4 mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Requester Phone</th>
                <th>Amount</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((req, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{req?.sender}</td>
                  <td>{req?.amount.toFixed(2)} BDT</td>
                  <td>
                    <button
                      onClick={() => handleApproval(req)}
                      className="p-2 bg-rose-500 rounded text-white"
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDecline(req?._id)}
                      className="p-2 bg-rose-500 rounded text-white"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CashInRequest;
