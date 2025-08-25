import React, { useState, useEffect } from "react";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./OrdersPage.module.css";
import OrderTable from "../../components/OrderTable/OrderTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(authSelector);

  // Fetch user orders from firestore

  useEffect(() => {
    const fetchOrders = async () => {
      let tempArr = [];
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "orders")
      );

      querySnapshot.docs.forEach((ele) => {
        tempArr.push({ id: ele.id, ...ele.data() });
      });
      setOrders(tempArr);
      setLoading(false);
    };
    fetchOrders();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !orders.length)
    return <h1 style={{ textAlign: "center" }}>No Orders Found!</h1>;

  return (
    <div className={styles.ordersContainer}>
      <h1>Your Orders</h1>
      {orders.map((order, idx) => {
        return <OrderTable order={order} key={idx} />;
      })}
    </div>
  );
};

export default OrdersPage;
