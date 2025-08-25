import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../ProductGrid/ProductGrid";

const ProductList = ({ products, style }) => {
  // Component to display the product list
  return (
    <ProductGrid style={{ ...style }}>
      {!!products &&
        products.map((product, idx) => {
          return <ProductCard product={product} key={idx} />;
        })}
    </ProductGrid>
  );
};

export default ProductList;
