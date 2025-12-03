import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading/Loading";
import { Link } from "react-router";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (role !== "rider") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center space-y-5">
        <h2 className="text-3xl font-semibold">
          Forbidden page. This page is not for you
        </h2>
        <Link to={"/"}>
          <button className="btn btn-primary text-black">Go to Home</button>
        </Link>
      </div>
    );
  }

  if (loading || roleLoading) {
    return <Loading />;
  }

  return children;
};

export default RiderRoute;
