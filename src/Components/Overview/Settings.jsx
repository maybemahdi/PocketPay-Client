import { useMutation } from "react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Settings = () => {
  const { currentUser, refetch, update, setUpdate } = useAuth();
  const axiosCommon = useAxiosCommon();

  const { mutateAsync } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosCommon.patch("/api/updateEmail", formData);
      return data;
    },
    onSuccess: () => {
      refetch();
      localStorage.setItem("user", JSON.stringify(currentUser));
      setUpdate(!update);
      Swal.fire({
        title: "Good job!",
        text: `Email Changed Successfully!`,
        icon: "success",
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message);
    },
  });

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    const currentEmail = currentUser?.email;
    const form = e.target;
    const newEmail = form.email.value;
    const pin = form.pin.value;
    const formData = { currentEmail, newEmail, pin };
    console.log(formData);
    await mutateAsync(formData);
    form.reset();
  };
  return (
    <form onSubmit={handleUpdateEmail} className="mx-auto mb-0 space-y-4">
      <div>
        <div className="relative">
          <label className="text-sm">Current Email</label>
          <input
            disabled
            placeholder="Current Email"
            className="w-full bg-slate-200 text-gray-500 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent mt-2"
            type="email"
            value={currentUser?.email}
            data-temp-mail-org="0"
          />
        </div>
        <div className="relative mt-2">
          <label className="text-sm">New Email</label>
          <input
            placeholder="New Email"
            className="w-full bg-slate-200 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent mt-2"
            name="email"
            type="email"
            data-temp-mail-org="0"
            required
          />
        </div>
      </div>
      <div>
        <div className="relative">
          <label className="text-sm">Pin Number</label>
          <input
            placeholder="Pin"
            className="w-full mt-2 rounded-lg bg-slate-200 border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
          Update Email
        </button>
      </div>
    </form>
  );
};

export default Settings;
