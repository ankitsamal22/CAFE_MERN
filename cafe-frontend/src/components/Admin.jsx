import React from "react";
import { Outlet, NavLink } from "react-router-dom";


export default function Admin() {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <NavLink to="/admin" end>
          Users
        </NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
