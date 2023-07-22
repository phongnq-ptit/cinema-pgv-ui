import React from 'react';
import {Outlet} from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      day la DashboardLayout
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
