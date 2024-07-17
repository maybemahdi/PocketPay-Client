import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading";

const Home = () => {
  const [hovered, setHovered] = useState(false);
  const { currentUser, isLoading: userLoading } = useAuth();
  const { role, isLoading } = useRole();
  if (isLoading || userLoading) return <Loading />;
  return (
    <div
      style={{ minHeight: "calc(100vh - 180px)" }}
      className="mb-5 flex flex-col justify-center mt-10 md:mt-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to={"/sendMoney"}
          className="p-10 md:h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-center">Send Money</h3>
        </Link>
        <Link
          to={"/cashOut"}
          className="p-10 md:h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-center">Cash Out</h3>
        </Link>
        <Link
          to={"/cashIn"}
          className="p-10 md:h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-center">Cash In</h3>
        </Link>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="p-10 md:h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300"
        >
          {hovered ? (
            <h3 className="text-xl font-bold text-center">
              {currentUser?.balance.toFixed(2)} BDT
            </h3>
          ) : (
            <h3 className="text-xl font-bold text-center">Check Balance</h3>
          )}
        </div>
        <Link
          to={"/transactions"}
          className="p-10 md:h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-center">Transaction History</h3>
        </Link>
        <Link
          to={"/overview"}
          className="p-10 md:h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-center">Manage Profile</h3>
        </Link>
      </div>
    </div>
  );
};

export default Home;
