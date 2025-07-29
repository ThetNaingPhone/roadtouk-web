import Header from "@/components/layout/Header";
import React from "react";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="dashboard-content">
        {children}
      </main>
      <footer className="dashboard-footer">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;