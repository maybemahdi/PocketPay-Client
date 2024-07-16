import { FaRegUser } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoHomeSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Nav = () => {
  return (
    <div className="mt-12 shadow-lg p-6 rounded flex items-center justify-between text-gray-600">
      <div>
        <Link to={"/"}>
          <h3 className="text-2xl font-bold text-gray-600 cursor-pointer font-concert tracking-[3px]">
            Pocket<span className="text-rose-500">Pay</span>
          </h3>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-16">
        <NavLink
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Dashboard"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-rose-500 font-semibold"
              : "hover:text-rose-500 transition-all duration-300 font-semibold"
          }
          to={"/"}
        >
          <IoHomeSharp size={25} />
        </NavLink>
        <NavLink
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Overview"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-rose-500 font-semibold"
              : "hover:text-rose-500 transition-all duration-300 font-semibold"
          }
          to={"/overview"}
        >
          <FaRegUser size={25} />
        </NavLink>
        <NavLink
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Transactions"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-rose-500 font-semibold"
              : "hover:text-rose-500 transition-all duration-300 font-semibold"
          }
          to={"/transactions"}
        >
          <GrTransaction size={25} />
        </NavLink>
        <Tooltip id="my-tooltip" />
      </div>
      <div>User</div>
    </div>
  );
};

export default Nav;
