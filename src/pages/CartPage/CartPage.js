import React, { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  // Fetch all cart products for the user
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCartProducts = async () => {
      setLoading(false);
    };

    getCartProducts();
  }, []);

  const purchaseProductsHandler = async () => {
    setPurchasing(true);
    // Write code to purchase the item present in the cart
    //
    // Redirect the user to orders page after successful purchase
    navigate("/myorders");
    // Clear the item present in the cart after successful purchase
    setCartProducts([]);
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.cartPageContainer}>
      {/*cartProduct here is the array of item present in the cart for the user yu can change this as per your need */}
      {cartProducts.length > 0 && (
        <aside className={styles.totalPrice}>
          <p>
            TotalPrice:- ₹
            {cartProducts.reduce(
              (acc, curr) => acc + curr.price * curr.extras.quantity,
              0
            )}
            /-
          </p>
          <button
            className={styles.purchaseBtn}
            onClick={purchaseProductsHandler}
          >
            {purchasing ? "Purchasing" : "Purchase"}
          </button>
        </aside>
      )}
      {cartProducts.length > 0 ? <ProductList /> : <h1>Cart is Empty!</h1>}
    </div>
  );
};

export default CartPage;
