import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MonitorOff, ShieldAlert } from "lucide-react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen w-full bg-[#141414] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#1a1a1a] border border-[#2F2F2F] p-8 rounded-3xl shadow-2xl max-w-md animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <MonitorOff className="text-red-500 w-10 h-10" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-4">
            Access Restricted
          </h1>

          <p className="text-gray-400 mb-8 leading-relaxed text-sm">
            MindBuddy is optimized for **station-based security** and
            professional clarity. Please log in from your **desktop
            workstation** to access your dashboard.
          </p>

          <div className="flex items-center gap-2 justify-center text-xs text-gray-500 bg-[#212121] py-3 px-4 rounded-xl border border-[#2F2F2F]">
            <ShieldAlert size={14} className="text-orange-500" />
            <span>Enterprise Security Protocol Active</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#212121] text-[#ECECEC]">
      <Navbar />

      <main className="flex-1 flex flex-col min-h-0">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
