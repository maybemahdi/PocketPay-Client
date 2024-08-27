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
import AgentRoute from "./AgentRoute";
import CashInRequest from "../Pages/CashInRequest";
import UserRoute from "./UserRoute";
import Management from "../Pages/Admin/Management";
import AdminRoute from "./AdminRoute";
import Notifications from "../Pages/Notifications";

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
        element: (
          <UserRoute>
            <CashIn />
          </UserRoute>
        ),
      },
      {
        path: "/cashInReq",
        element: (
          <AgentRoute>
            <CashInRequest />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/admin",
        element: (
          <AdminRoute>
            <Management />
          </AdminRoute>
        ),
      },
      {
        path: "/notifications",
        element: (
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        ),
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
