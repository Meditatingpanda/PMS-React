import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import style from "./OrderHistory.module.css";
let temp = [];
function Orders() {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    setOrderHistory([...JSON.parse(localStorage.getItem("orderList") || "[]")]);
  }, []);
  temp = [...orderHistory];
  const handleDelete = (id) => {
    temp = orderHistory.filter((key, iD) => iD !== id);
    setOrderHistory(temp);
    localStorage.orderList = JSON.stringify(temp);
  };

  return (
    <div className={style.container}>
      <div className={style.heading}>Order History</div>
      <div>
        {orderHistory.map((key, id) => {
          if (key.isSales === (localStorage.state === "admin" ? true : false))
            return (
              <div className={style.item} key={id}>
                <div className={style.cosName}>
                  <span>
                    Customer Name:{" "}
                    <span className={style.cosNameText}>
                      {key.customerName}
                    </span>
                  </span>
                  <span>
                    Contact Number:
                    <span className={style.cosNameText}> {key.phoneNum}</span>
                  </span>
                  <span>
                    OrderId: <span className={style.orderColor}>{key.id}</span>{" "}
                  </span>
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
                  <div className={style.field}>
                    <span>Medicine Name</span>
                    <span>Qty</span>
                  </div>
                  {/* qty will be added here dynamically */}
                  <div>
                    {key.cart.map((key, id) => {
                      return (
                        <div key={id} className={style.table}>
                          <span>{key.name}</span>
                          <span>{key.qty}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className={style.total}>
                    <span>Total</span>
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
