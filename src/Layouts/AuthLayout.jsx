import React from "react";
import Logo from "../Comoponents/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Logo></Logo>
      <div className="min-h-screen flex items-center">
        <div className="flex-1 ">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img src={authImage} alt="auth image" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
