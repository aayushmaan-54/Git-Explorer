import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};


const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
    </>
  );
};

export default Layout;