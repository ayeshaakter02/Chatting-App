import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Homebar from "./Homebar";

const Rootlayout = () => {
  return (
    <main className="h-screen bg-[url('../images/Signup_image.jpg')] bg-cover bg-center bg-no-repeat lg:flex xl:gap-4">
      <Sidebar />

      <div className="lg:absolute lg:w-150 lg:left-100 xl:hidden">
        <Homebar />
      </div>

      <Outlet />
    </main>
  );
};

export default Rootlayout;
