import { Outlet } from "react-router-dom";
import Nav from "../Pages/Nav";

const Main = () => {
    return (
        <div className="md:w-[80%] mx-auto font-poppins">
            <Nav />
            <Outlet />
        </div>
    );
};

export default Main;