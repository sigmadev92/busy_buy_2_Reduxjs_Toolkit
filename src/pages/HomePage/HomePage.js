import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import ProductList from "../../components/Product/ProductList/ProductList";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/UI/Loader/Loader";
import { useSelector } from "react-redux";
import { productsSelector } from "../../redux/reducers/productsReducer";

function HomePage() {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(75000);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tempProducts, setTempProducts] = useState([]);
  const { products } = useSelector(productsSelector);
  const style = {
    marginLeft: "16rem",
  };

  // Fetch products on app mount
  useEffect(() => {
    setLoading(true);
    setTempProducts(products);
    setLoading(false);
    //eslint-disable-next-line
  }, [products]);

  // Rerender the products if the search or filter parameters change

  useEffect(() => {
    let np = products.filter((p) => p.price <= priceRange);
    if (query) {
      np = np.filter((p) => new RegExp(query, "i").test(p.title));
    }

    const filteredProducts =
      categories.length === 0
        ? np
        : np.filter((p) => categories.includes(p.category));

    setTempProducts(filteredProducts);

    //eslint-disable-next-line
  }, [priceRange, query, categories]);

  // Display loader while products are fetching using the Loader Component
  if (loading) return <Loader />;

  return (
    <div className={styles.homePageContainer}>
      <FilterSidebar
        setPriceRange={setPriceRange}
        setCategories={setCategories}
        priceRange={priceRange}
      />
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {tempProducts.length ? (
        <ProductList style={style} products={tempProducts} onCart={false} />
      ) : (
        <>No products</>
      )}
    </div>
  );
}

export default HomePage;
