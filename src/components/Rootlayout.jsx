import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Rootlayout = () => {
  return (
    <main className="flex gap-4 bg-[url('images/Signup_image.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      <Sidebar/>
      <Outlet />
    </main>
  );
};

export default Rootlayout;
// bg-[url('images/Signup_image.jpg')] 