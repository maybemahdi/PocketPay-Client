import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Overview from "../Pages/Overview";
import Transactions from "../Pages/Transactions";
import Error from "../Pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/overview",
        element: <Overview />
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
]);
