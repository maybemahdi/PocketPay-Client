import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Overview from "../Pages/Overview";
import Transactions from "../Pages/Transactions";
import Error from "../Pages/Error";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import SendMoney from "../Pages/SendMoney";
import CashOut from "../Pages/CashOut";
import CashIn from "../Pages/CashIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/sendMoney",
        element: <SendMoney />,
      },
      {
        path: "/cashOut",
        element: <CashOut />,
      },
      {
        path: "/cashIn",
        element: <CashIn />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
