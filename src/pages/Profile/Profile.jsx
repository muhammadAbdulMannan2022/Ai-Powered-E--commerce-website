import React from "react";
import TopBar from "../../Shared/Navbar/TopBar";
import Navbar from "../../Shared/Navbar/Navbar";
import ProfilePage from "./ProfileMain";
import { Outlet } from "react-router";

export default function Profile() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <div className="h-full">
        <div className="w-full h-20 bg-gradient-to-r from-[#99BA14] to-[#233205] "></div>
        <Outlet />
      </div>
    </div>
  );
}
