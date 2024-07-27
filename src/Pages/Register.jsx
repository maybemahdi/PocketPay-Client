/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import toast from "react-hot-toast";
import { FaKey, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const Register = () => {
  const [accountType, setAccountType] = useState(null);
  const navigate = useNavigate();
  const { createUser, update, setUpdate } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!accountType) {
      return toast.error("Please Provide your Account Type");
    }
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const pin = form.pin.value;
    const userInfo = {
      name,
      email,
      phone,
      accountType,
      role:
        (accountType === "personal" && "user") ||
        (accountType === "agent" && "agent"),
      pin,
      status:
        (accountType === "personal" && "verified") ||
        (accountType === "agent" && "pending"),
      balance:
        (accountType === "personal" && 40.0) ||
        (accountType === "agent" && 10000.0),
    };
    console.log(userInfo);
    try {
      const data = await createUser(userInfo);
      if (data?.insertedId && userInfo?.status === "verified") {
        toast.success("User Registered Successful");
        navigate("/");
        setUpdate(!update);
        Swal.fire({
          title: "Congratulations!",
          text: "Registration Bonus BDT 40 has been added to your account!",
          icon: "success",
        });
      } else {
        if (data?.insertedId && userInfo?.status !== "verified") {
          Swal.fire({
            title: "Wait!",
            text: "Registration Successful! You can login if your Agent Application is Verified!",
            icon: "warning",
          });
        }
        if (data.message) {
          // console.log(data.message);
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      form.reset();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-slate-200 font-poppins">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome to{" "}
            <span className="font-bold text-gray-600 font-concert tracking-[3px]">
              Pocket
            </span>
            <span className="font-bold text-rose-500 font-concert tracking-[3px]">
              Pay
            </span>
            !
          </h1>
          <p className="mt-4 text-gray-600">
            Start your Instant First Class Banking <br /> by Creating Your
            Account!
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <div className="relative">
              <input
                placeholder="Enter your name"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                name="name"
                type="text"
                data-temp-mail-org="0"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    stroke-width="2"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                placeholder="Enter your phone number"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                name="phone"
                type="number"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <FaPhoneAlt size={20} className="text-gray-400" />
              </span>
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                placeholder="Enter your email"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                name="email"
                type="email"
                required
                data-temp-mail-org="0"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdOutlineMarkEmailUnread size={23} className="text-gray-400" />
              </span>
            </div>
          </div>
          <select
            onChange={(e) => setAccountType(e.target.value)}
            className="select select-secondary border-none focus:outline-none w-full"
          >
            <option disabled selected>
              Account Type
            </option>
            <option value={"personal"}>Personal</option>
            <option value={"agent"}>Agent</option>
          </select>
          <div>
            <div className="relative">
              <input
                placeholder="Enter a 5 digit pin"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                type="number"
                name="pin"
                min={10000}
                max={99999}
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <FaKey size={20} className="text-gray-400" />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center justify-between">
            <button
              className="block w-full rounded-lg bg-rose-500 hover:bg-rose-600 text-white px-5 py-3 text-sm font-medium focus:outline-none transition-all duration-300"
              type="submit"
            >
              Sign In
            </button>
            <p className="text-sm text-gray-600">
              Already an User?{" "}
              <Link to={"/login"} className="underline font-bold text-rose-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
