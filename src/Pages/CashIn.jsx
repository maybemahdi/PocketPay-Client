import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import { useNavigate } from "react-router-dom";

const CashIn = () => {
  const { currentUser, refetch } = useAuth();
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const handleCashInRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const sender = currentUser?.phone;
    const accountNumber = form.accountNumber.value;
    const amount = parseFloat(form.amount.value);
    const pin = form.pin.value;
    const cashInReqData = {
      sender,
      accountNumber,
      amount,
      pin,
    };
    console.log(cashInReqData);
    try {
      const { data } = await axiosCommon.post("/cashInReq", cashInReqData);
      if (data?.insertedId) {
        refetch();
        navigate("/");
        Swal.fire({
          title: "Yeeeee!",
          text: `Cash-In Request Send to ${data?.agent}`,
          icon: "success",
        });
      }
      if (data?.errorMessage) {
        toast.error(data?.errorMessage);
      }
    } catch (err) {
      toast.error(err.message);
      // if()
    } finally {
      form.reset();
    }
  };
  return (
    <div
      style={{ minHeight: "calc(100vh - 180px)" }}
      className="mb-5 flex flex-col justify-center items-center mt-10 md:mt-0 max-w-lg mx-auto"
    >
      <div className="flex flex-col items-center justify-center gap-4 mb-5">
        <h3 className="text-rose-500 font-bold text-3xl text-center">
          Send Cash In Request
        </h3>
        <p className="text-center">
          You will get free Cash In without any Charge if the agent accept your
          request!
        </p>
      </div>
      <form
        onSubmit={handleCashInRequest}
        className="w-full flex flex-col justify-center gap-3"
      >
        <div>
          <div className="relative">
            <input
              placeholder="Enter Agent number (ex: 017xxx)"
              className="w-full rounded-lg border-gray-300 bg-slate-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              name="accountNumber"
              type="number"
              required
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              placeholder="Enter Amount"
              className="w-full rounded-lg border-gray-300 bg-slate-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              name="amount"
              type="number"
              required
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              placeholder="Your Pin Number"
              className="w-full rounded-lg border-gray-300 bg-slate-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              type="number"
              name="pin"
              min={10000}
              max={99999}
              required
            />
          </div>
        </div>
        <button
          className="block w-full rounded-lg bg-rose-500 hover:bg-rose-600 text-white px-5 py-3 text-sm font-medium focus:outline-none transition-all duration-300"
          type="submit"
        >
          Request Cash In
        </button>
      </form>
    </div>
  );
};

export default CashIn;
