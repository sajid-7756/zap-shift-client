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
        loader: () => {
          // fetch("/service-center.json").then((res) => res.json());
        },
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
]);

export default router;
