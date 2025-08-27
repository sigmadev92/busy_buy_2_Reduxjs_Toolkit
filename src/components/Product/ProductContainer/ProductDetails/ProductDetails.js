import { useState } from "react";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  changeQty,
  cartSelector,
} from "../../../../redux/reducers/cartReducer";
import { authSelector } from "../../../../redux/reducers/authReducer";
import { toast } from "react-toastify";

const ProductDetails = ({ title, price, productId, onCart, quantity }) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const [productRemovingFromCart, setProductRemovingCart] = useState(false);
  const { user, loggedIn } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addProductToCartBtn = async () => {
    // Function to add product to cart
    if (!loggedIn) {
      navigate("/signin");
      return;
    }
    const idx = cart.findIndex((ele) => ele.productId === productId);
    if (idx >= 0) {
      dispatch(
        changeQty({ userId: user.uid, index: idx, cartItem: cart[idx], qty: 1 })
      );
      toast.success("Increase count successfully");
      return;
    }

    setProductAddingToCart(true);
    dispatch(addToCart({ userId: user.uid, productId }));
    toast.success("Product Added Successfully");
    setProductAddingToCart(false);
  };
  const removeProductBtn = async () => {
    // Function to remaove the cart
    setProductRemovingCart(true);
    const idx = cart.findIndex((ele) => ele.productId === productId);
    if (idx === -1) {
      setProductRemovingCart(false);
      return toast.error("Something went wrong");
    }
    dispatch(
      removeFromCart({
        userId: user.uid,
        cartItemId: cart[idx].cartItemId,
        index: idx,
      })
    );
    toast.success("Product Removed Successfully");
    setProductRemovingCart(false);
  };

  const handleAddBtn = async () => {
    // Function for Handling the product quantity increase
    const idx = cart.findIndex((ele) => ele.productId === productId);
    dispatch(
      changeQty({ userId: user.uid, index: idx, cartItem: cart[idx], qty: 1 })
    );
  };

  const handleRemoveBtn = async () => {
    // Handling the product quantity decrease
    const idx = cart.findIndex((ele) => ele.productId === productId);
    const cartItem = cart[idx];
    if (cartItem.quantity === 1) {
      dispatch(
        removeFromCart({
          userId: user.uid,
          cartItemId: cart[idx].cartItemId,
          index: idx,
        })
      );
      return;
    }
    dispatch(
      changeQty({ userId: user.uid, index: idx, cartItem: cart[idx], qty: -1 })
    );
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.productName}>
        <p>{`${title.slice(0, 35)}...`}</p>
      </div>
      <div className={styles.productOptions}>
        <p>₹ {price}</p>
        {onCart && (
          <div className={styles.quantityContainer}>
            <MinusIcon handleRemove={handleRemoveBtn} />
            {quantity}
            <PlusIcon handleAdd={handleAddBtn} />
          </div>
        )}
      </div>
      {/* Conditionally Rendering buttons based on the screen */}
      {!onCart ? (
        <button
          className={styles.addBtn}
          title="Add to Cart"
          disabled={productAddingToCart}
          onClick={addProductToCartBtn}
        >
          {productAddingToCart ? "Adding" : "Add To Cart"}
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          title="Remove from Cart"
          onClick={removeProductBtn}
        >
          {productRemovingFromCart ? "Removing" : "Remove From Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
