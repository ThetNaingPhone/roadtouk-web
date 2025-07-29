import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StudentNav from "@/components/student/StudentNav";

const StudentDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <StudentNav />
      </Header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default StudentDashboardLayout;