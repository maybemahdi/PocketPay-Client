import { useState } from "react";

const SendMoney = () => {
  const [fee, setFee] = useState(0);
  const handleFee = (e) => {
    const value = e.target.value;
    let fee = 0;

    if (value >= 100) {
      fee = Math.floor(value / 100) * 5;
    }

    setFee(fee);
  };

  const handleSendMoney = (e) => {
    e.preventDefault();
    const form = e.target;
    const accountNumber = form.accountNumber.value;
    const amount = form.amount.value;
    const fee = fee;
  };
  return (
    <div
      style={{ minHeight: "calc(100vh - 180px)" }}
      className="mb-5 flex flex-col justify-center items-center mt-10 md:mt-0 max-w-lg mx-auto"
    >
      <div className="flex flex-col items-center justify-center gap-4 mb-5">
        <h3 className="text-rose-500 font-bold text-3xl text-center">
          Send Money
        </h3>
        <p>For Every Send Money over 100 BDT will charge 5.00 BDT as Fee</p>
      </div>
      <form
        onSubmit={handleSendMoney}
        className="w-full flex flex-col justify-center gap-3"
      >
        <div>
          <div className="relative">
            <input
              placeholder="Enter Account number"
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
              placeholder="Enter Amount (Starts from 50.00)"
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
          Confirm Send Mony
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
