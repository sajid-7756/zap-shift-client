import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverege/Coverage";
import AboutUs from "../Pages/About us/AboutUs";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import RootLayout from "../Layouts/RootLayout";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import Pricing from "../Pages/Pricing/Pricing";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyPercels from "../Pages/Dashboard/My Percels/MyPercels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/Payment history/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/aboutUs",
        Component: AboutUs,
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "/pricing",
        element: (
          <PrivateRoute>
            <Pricing></Pricing>
          </PrivateRoute>
        ),
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "/parcel-track/:trackingId",
        Component: ParcelTrack,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-parcels",
        Component: MyPercels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "Payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      //Rider related rotes
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries />
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries />
          </RiderRoute>
        ),
      },
      //Admin related routes
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
