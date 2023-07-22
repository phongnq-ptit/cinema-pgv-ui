import React from 'react';
import {Outlet} from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      day la main layout
      <Outlet />
    </div>
  );
};

export default MainLayout;
