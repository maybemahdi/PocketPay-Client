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
        <h3 className="text-center text-2xl font-semibold md:col-span-3">
          Profile:{" "}
          <span className="font-bold text-rose-500">{role?.toUpperCase()}</span>
        </h3>
        <Link to={"/sendMoney"} className={gridItemClassName}>
          <h3 className="text-xl font-bold text-center">Send Money</h3>
        </Link>
        <Link to={"/cashOut"} className={gridItemClassName}>
          <h3 className="text-xl font-bold text-center">Cash Out</h3>
        </Link>
        {role !== "agent" ? (
          <Link to={"/cashIn"} className={gridItemClassName}>
            <h3 className="text-xl font-bold text-center">Cash In</h3>
          </Link>
        ) : (
          <Link to={"/cashInReq"} className={gridItemClassName}>
            <h3 className="text-xl font-bold text-center">Cash In Requests</h3>
          </Link>
        )}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={gridItemClassName}
        >
          {hovered ? (
            <h3 className="text-xl font-bold text-center">
              {currentUser?.balance.toFixed(2)} BDT
            </h3>
          ) : (
            <h3 className="text-xl font-bold text-center">Balance</h3>
          )}
        </div>
        <Link to={"/transactions"} className={gridItemClassName}>
          <h3 className="text-xl font-bold text-center">Transaction History</h3>
        </Link>
        <Link to={"/overview"} className={gridItemClassName}>
          <h3 className="text-xl font-bold text-center">Manage Profile</h3>
        </Link>
      </div>
    </div>
  );
};

export default Home;

const gridItemClassName = `p-10 md:h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse bg-rose-500  text-white transition-all duration-300`;
