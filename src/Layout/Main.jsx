import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h2>Nav</h2>
            <Outlet />
        </div>
    );
};

export default Main;