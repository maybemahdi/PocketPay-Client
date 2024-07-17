import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-slate-200 font-poppins">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Jump Into{" "}
            <span className="font-bold text-gray-600 font-concert tracking-[3px]">
              Pocket
            </span>
            <span className="font-bold text-rose-500 font-concert tracking-[3px]">
              Pay
            </span>
            !
          </h1>
          <p className="mt-4 text-gray-600">
            Continue your Instant First Class Banking <br /> by Logging into
            Your Account!
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <div className="relative">
              <input
                placeholder="Your phone number"
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
          {/* <div>
            <div className="relative">
              <input
                placeholder="Your email"
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
          </div> */}
          <div>
            <div className="relative">
              <input
                placeholder="Your 5 digit pin"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                type="number"
                name="pin"
                min={10000}
                max={99999}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center justify-between">
            <button
              className="block w-full rounded-lg bg-rose-500 hover:bg-rose-600 text-white px-5 py-3 text-sm font-medium focus:outline-none transition-all duration-300"
              type="submit"
            >
              Log In
            </button>
            <p className="text-sm text-gray-600">
              New Here?{" "}
              <Link
                to={"/register"}
                className="underline font-bold text-rose-500"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
