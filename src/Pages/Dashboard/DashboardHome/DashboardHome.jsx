import React from "react";
import useRole from "../../../Hooks/useRole";
import Loading from "../../../Components/Loading/Loading";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }
  if (role === "admin") {
    return <AdminDashboardHome />;
  }
  if (role === "rider") {
    return <RiderDashboardHome />;
  }
  if (role === "user") {
    return <UserDashboardHome />;
  }
};

export default DashboardHome;
