import { FaRegUser } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoHomeSharp, IoNotifications } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../Hooks/useRole";
import { FcManager } from "react-icons/fc";
import { MdOutlineManageAccounts } from "react-icons/md";
import useNotifications from "../Hooks/useNotifications";

const Nav = () => {
  const { logout, update, setUpdate, currentUser } = useAuth();
  const { notifications } = useNotifications();
  const { role } = useRole();
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
  const navLinks = (
    <>
      <NavLink
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Dashboard"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-rose-500 font-semibold flex gap-4 items-center"
            : "hover:text-rose-500 transition-all duration-300 font-semibold flex gap-4 items-center"
        }
        to={"/"}
      >
        <IoHomeSharp size={25} /> <span className="md:hidden">Dashboard</span>
      </NavLink>
      <NavLink
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Overview"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-rose-500 font-semibold flex gap-4 items-center"
            : "hover:text-rose-500 transition-all duration-300 font-semibold flex gap-4 items-center"
        }
        to={"/overview"}
      >
        <FaRegUser size={25} /> <span className="md:hidden">Overview</span>
      </NavLink>
      <NavLink
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Transactions"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-rose-500 font-semibold flex gap-4 items-center"
            : "hover:text-rose-500 transition-all duration-300 font-semibold flex gap-4 items-center"
        }
        to={"/transactions"}
      >
        <GrTransaction size={25} />{" "}
        <span className="md:hidden">Transactions</span>
      </NavLink>
      <NavLink
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Notifications"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-rose-500 font-semibold flex gap-4 items-center"
            : "hover:text-rose-500 transition-all duration-300 font-semibold flex gap-4 items-center"
        }
        to={"/notifications"}
      >
        <div className="relative">
          <IoNotifications size={25} />
          {notifications && notifications.length >= 0 && (
            <span className="absolute -top-1 -right-2 bg-rose-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
              {notifications.length}
            </span>
          )}
        </div>
        <span className="md:hidden">Notifications</span>
      </NavLink>

      {role === "admin" && (
        <NavLink
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Dashboard"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-rose-500 font-semibold flex gap-4 items-center"
              : "hover:text-rose-500 transition-all duration-300 font-semibold flex gap-4 items-center"
          }
          to={"/dashboard/admin"}
        >
          <MdOutlineManageAccounts size={30} />{" "}
          <span className="md:hidden">Dashboard</span>
        </NavLink>
      )}
      <Tooltip id="my-tooltip" />
    </>
  );
  return (
    <div className="md:mt-12 mt-5 md:static shadow-lg p-6 rounded navbar mx-0 text-gray-600">
      <div className="navbar-start">
        <div className="dropdown -ml-6 md:ml-0">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md gap-6 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-3 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to={"/"}>
          <h3 className="text-2xl font-bold text-gray-600 cursor-pointer font-concert tracking-[3px]">
            Pocket<span className="text-rose-500">Pay</span>
          </h3>
        </Link>
      </div>
      <div className="items-center justify-center gap-16 navbar-center hidden lg:flex">
        {navLinks}
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="">
            <div className="w-12 rounded">
              <FcManager className="text-rose-500" size={40} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded z-[1] w-fit p-2 my-7 shadow-md md:left-[-80px] right-0"
          >
            <li>
              <p>
                {currentUser?.name}{" "}
                <span className="text-rose-500 font-bold">
                  ({role?.toUpperCase()})
                </span>
              </p>
            </li>
            <li>
              <p>
                Balance:{" "}
                <span className="text-rose-500 font-bold">
                  {currentUser?.balance.toFixed(2)}
                </span>{" "}
                BDT
              </p>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
