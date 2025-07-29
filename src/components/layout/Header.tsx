import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex items-center me-auto">
        {children}
      </div>
    </header>
  );
};

export default Header;