import React from "react";
import Navbar from "../components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateOrder from "../components/CreateOrder";
import Orders from "../components/Orders";
import SidebarSales from "../components/SidebarSales";

function SalesMan({ state, logoutHandler }) {
  return (
    <div>
      <Navbar state={state} logoutHandler={logoutHandler} />
      <div className="flex">
        <SidebarSales />
        <Routes>
          <Route exact path="/" element={<Navigate to="/create" />} />
          <Route exact path="/sales" element={<Navigate to="/create" />} />
          <Route exact path="/create" element={<CreateOrder />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default SalesMan;
