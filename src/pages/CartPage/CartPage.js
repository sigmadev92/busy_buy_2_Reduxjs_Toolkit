import { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, cartActions } from "../../redux/reducers/cartReducer";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { authSelector } from "../../redux/reducers/authReducer";

const CartPage = () => {
  // Fetch all cart products for the user
  const { cart } = useSelector(cartSelector);
  const [cartProducts, setCartProducts] = useState([]);
  const { emptyCart } = cartActions;
  const [loading, setLoading] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const { user } = useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCartProducts = async () => {
    if (cart.length === 0) {
      setCartProducts([]);
      return;
    }
    const mapping = {};
    let tempCart = [];
    cart.forEach((cartItem) => {
      mapping[cartItem.productId] = cartItem;
    });
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("__name__", "in", Object.keys(mapping)));

    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      tempCart.push({
        ...doc.data(),
        ...mapping[doc.id],
      });
    });

    setCartProducts(tempCart);
  };

  useEffect(() => {
    if (cart.length === 0) {
      toast.error("No products found");
      return;
    }
    setLoading(true);
    getCartProducts();
    setLoading(false);
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    getCartProducts();
    //eslint-disable-next-line
  }, [cart]);

  const purchaseProductsHandler = async () => {
    setPurchasing(true);
    // Write code to purchase the item present in the cart
    const dateTime = new Date().toISOString().split("T")[0];
    try {
      console.log(cartProducts);
      const batch = writeBatch(db);
      cartProducts.forEach((product) => {
        const docRef = doc(
          db,
          "users",
          user.uid,
          "orders",
          product.id.toString()
        );
        batch.set(docRef, { ...product, orderedOn: dateTime });
      });

      console.log("hello");

      await batch.commit();
      //deleting items from cart
      for (let item of cart) {
        const docRef = doc(db, "users", user.uid, "cart", item.cartItemId);
        await deleteDoc(docRef);
      }
      dispatch(emptyCart());
      setCartProducts([]);
      navigate("/myorders");
    } catch (error) {
      console.log(error);
      toast.error("Something went really wrong");
      setPurchasing(false);
    }
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
              (acc, curr) => acc + curr.price * curr.quantity,
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
      {cartProducts.length > 0 ? (
        <ProductList onCart={true} products={cartProducts} />
      ) : (
        <h1>Cart is Empty!</h1>
      )}
    </div>
  );
};

export default CartPage;
