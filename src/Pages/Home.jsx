import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{minHeight: "calc(100vh - 150px)"}} className="mb-5 flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to={"/sendMoney"} className="p-10 h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300">
          <h3 className="text-xl font-bold text-center">
            Send Money
          </h3>
        </Link>
        <Link to={"/cashOut"} className="p-10 h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300">
          <h3 className="text-xl font-bold text-center">
            Cash Out
          </h3>
        </Link>
        <Link to={"/cashIn"} className="p-10 h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300">
          <h3 className="text-xl font-bold text-center">
            Cash In
          </h3>
        </Link>
        <div className="p-10 h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300">
          <h3 className="text-xl font-bold text-center">
            Check Balance
          </h3>
        </div>
        <Link to={"/transactions"} className="p-10 h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300">
          <h3 className="text-xl font-bold text-center">
            Transaction History
          </h3>
        </Link>
        <Link to={"/overview"} className="p-10 h-44 flex items-center justify-center rounded-md border border-rose-500 hover:border-collapse hover:bg-rose-500 text-rose-500  hover:text-white transition-all duration-300">
          <h3 className="text-xl font-bold text-center">
            Manage Profile
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Home;
