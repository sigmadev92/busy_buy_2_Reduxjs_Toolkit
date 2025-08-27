import React, { useState, useEffect } from "react";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./OrdersPage.module.css";
import OrderTable from "../../components/OrderTable/OrderTable";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";

const OrdersPage = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(authSelector);

  // Fetch user orders from firestore

  useEffect(() => {
    if (!user?.uid) {
      return;
    }
    setLoading(true);
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "orders")
      );
      let ordersByDate = {};
      if (querySnapshot.docs.length === 0) {
        return;
      }
      querySnapshot.docs.forEach((ele) => {
        let key = ele.data().orderedOn;
        if (ordersByDate[key]) {
          ordersByDate[key].push(ele.data());
        } else {
          ordersByDate[key] = [ele.data()];
        }
      });
      console.log(ordersByDate);
      setOrders(ordersByDate);
      setLoading(false);
    };
    fetchOrders();
    setLoading(false);
    //eslint-disable-next-line
  }, []);
  async function clearOrderHistory() {
    try {
      for (const orderDate of Object.keys(orders)) {
        for (const prod of orders[orderDate]) {
          await deleteDoc(
            doc(db, "users", user.uid, "orders", String(prod.id))
          );
        }
      }
      console.log("Orders cleared successfully!");
    } catch (error) {
      console.error("Error clearing orders:", error);
    }
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.ordersContainer}>
      {Object.keys(orders).length > 0 ? (
        <>
          <h1>Your Orders</h1>
          <button onClick={clearOrderHistory}>clear</button>
          {Object.keys(orders).map((keyDate, idx) => {
            return (
              <OrderTable
                order={orders[keyDate]}
                key={idx}
                orderedOn={keyDate}
              />
            );
          })}
        </>
      ) : (
        <>
          <h3>No orders yet</h3>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
