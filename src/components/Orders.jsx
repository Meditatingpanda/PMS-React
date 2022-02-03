import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

function Orders() {
  const [orderHistory, setOrderHistory] = useState([
    ...JSON.parse(localStorage.getItem("orderList") || "[]"),
  ]);

  const handleDelete = (id) => {
    setOrderHistory(orderHistory.filter((key, iD) => iD != id));
    console.log(orderHistory);
    localStorage.orderList = JSON.stringify(orderHistory);
  };
 
  return (
    <div className="bg-red-50 p-10  shadow-lg flex-col items-center flex-grow rounded-lg ">
      <div className="text-red-500 text-4xl text-center">Order History</div>
      <div>
        {orderHistory.map((key, id) => {
          return (
            <div
              className="min-h-[10rem] bg-white mb-10 p-5 shadow-md "
              key={id}
            >
              {console.log(key)}
              <div className="flex justify-around ">
                <span>Customer Name: {key.customerName}</span>
                <span>Contact Number:{key.phoneNum}</span>
                <span>OrderId:{key.id}</span>
                <span>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </div>
              <div>
                <div className="flex font-bold border-b-2 mb-4 border-red-500  justify-around">
                  <span>Medicine Name</span>
                  <span>Qty</span>
                </div>
                {/* qty will be added here dynamically */}
                <div>
                  {key.cart.map((key, id) => {
                    return (
                      <div
                        key={id}
                        className="flex border-b-2 mb-4 border-red-500 text-gray-500  justify-around"
                      >
                        <span>{key.name}</span>
                        <span>{key.qty}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex border-b-2 mb-4 border-red-500 font-bold  text-bold justify-around">
                  <span>Total:-</span>
                  <span>{key.totalAmount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
