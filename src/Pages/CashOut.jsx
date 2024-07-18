import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

const CashOut = () => {
  const [fee, setFee] = useState(0);
  const { currentUser, isLoading: userLoading, refetch } = useAuth();
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();
  const handleFee = (e) => {
    const value = e.target.value;
    let fee = (value / 100) * 1.5;
    setFee(fee);
  };

  const handleCashOut = async (e) => {
    e.preventDefault();
    const form = e.target;
    const sender = currentUser?.phone;
    const accountNumber = form.accountNumber.value;
    const amount = parseFloat(form.amount.value);
    const pin = form.pin.value;
    const totalPayAmount = parseFloat(amount) + parseFloat(fee);
    const cashOutData = {
      sender,
      accountNumber,
      amount,
      fee,
      pin,
      totalPayAmount,
    };
    // console.log(cashOutData);
    if (accountNumber === currentUser?.phone) {
      return toast.error("You Can't Enter your own Number");
    }
    if (totalPayAmount > currentUser?.balance) {
      return toast.error("You Do not Have sufficient balance");
    }
    try {
      const { data } = await axiosCommon.put("/cashOut", cashOutData);
      if (data?.message) {
        refetch();
        navigate("/");
        Swal.fire({
          title: "Yeeeee!",
          text: `${data?.message}`,
          icon: "success",
        });
      }
      if (data?.errorMessage) {
        toast.error(data?.errorMessage);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      form.reset();
    }
  };
  if (userLoading) return <Loading />;
  return (
    <div
      style={{ minHeight: "calc(100vh - 180px)" }}
      className="mb-5 flex flex-col justify-center items-center mt-10 md:mt-0 max-w-lg mx-auto"
    >
      <div className="flex flex-col items-center justify-center gap-4 mb-5">
        <h3 className="text-rose-500 font-bold text-3xl text-center">
          Cash Out
        </h3>
        <p className="text-center">
          For Every Cash Out there will be a fee of 1.5% of Amount
        </p>
      </div>
      <form
        onSubmit={handleCashOut}
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
              onChange={handleFee}
              placeholder="Enter Amount"
              className="w-full rounded-lg border-gray-300 bg-slate-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              name="amount"
              type="number"
              required
            />
          </div>
          <p className="text-sm font-bold text-rose-500 pt-3 pl-3">
            Fee: {fee.toFixed(2)} BDT
          </p>
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
          Confirm Cash out
        </button>
      </form>
    </div>
  );
};

export default CashOut;
