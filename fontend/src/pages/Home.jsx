import React from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import WelcomeModal from "../components/WelcomeModal";

const Home = () => {
  return (
    <div className="flex-1 flex min-h-0 overflow-hidden">
      <EmployeeDashboard />
      <WelcomeModal />
    </div>
  );
};

export default Home;
