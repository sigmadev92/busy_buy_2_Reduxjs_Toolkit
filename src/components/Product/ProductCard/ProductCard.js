import React from "react";
import ProductContainer from "../ProductContainer/ProductContainer";
import ProductDetails from "../ProductContainer/ProductDetails/ProductDetails";
import ProductImage from "../ProductContainer/ProductImage/ProductImage";

// Product Card component
const ProductCard = ({
  product: { title, price, image, id, quantity },
  onOwnPage,
}) => {
  return (
    <ProductContainer>
      <ProductImage image={image} />
      <ProductDetails
        title={title}
        price={price}
        onOwnPage={onOwnPage}
        productId={id}
        quantity={quantity}
      />
    </ProductContainer>
  );
};

export default ProductCard;
