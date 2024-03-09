import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import React from 'react';

function Layout() {
  return (
    <div>
      <div className="px-6">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
