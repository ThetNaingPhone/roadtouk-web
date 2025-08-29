import React from 'react';
import ProfileDropdown from './ProfileDropdown';

const StudentNav = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-xl font-semibold text-white">Student Dashboard</h1>
      <ProfileDropdown />
    </div>
  );
};

export default StudentNav;