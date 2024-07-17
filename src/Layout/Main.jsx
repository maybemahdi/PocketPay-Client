import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

const Main = () => {
  return (
    <div className="w-[85%] mx-auto font-poppins">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Main;
