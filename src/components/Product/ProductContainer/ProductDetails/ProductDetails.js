import { useState } from "react";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cartSelector,
  removeFromCart,
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
      return navigate("/signin");
    }
    setProductAddingToCart(true);
    dispatch(addToCart({ userId: user.uid, productId }));
    toast.success("Product Added Successfully");
    setProductAddingToCart(false);
  };
  const removeProductBtn = async () => {
    // Function to remaove the cart
    setProductRemovingCart(true);
    const cartItemId = cart.find((ele) => ele.productId === productId).id;
    dispatch(removeFromCart(user.uid, cartItemId));
  };

  const handleAddBtn = async () => {
    // Function for Handling the product quantity increase
  };

  const handleRemoveBtn = async () => {
    // Handling the product quantity decrease
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
