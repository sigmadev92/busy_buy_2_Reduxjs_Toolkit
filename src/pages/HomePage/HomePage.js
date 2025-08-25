import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import ProductList from "../../components/Product/ProductList/ProductList";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Loader from "../../components/UI/Loader/Loader";

function HomePage() {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(75000);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tempProducts, setTempProducts] = useState([]);
  const [fixedProducts, setFixedProducts] = useState([]);

  const style = {
    marginLeft: "16rem",
  };

  // Fetch products on app mount
  useEffect(() => {
    const fetchProducts = async () => {
      let prodArr = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.docs.forEach((p, i) => {
        prodArr.push({ ...p.data() });
      });
      setFixedProducts(prodArr);
      setTempProducts(prodArr);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Rerender the products if the search or filter parameters change

  useEffect(() => {
    let np = fixedProducts.filter((p) => p.price <= priceRange);
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
        <ProductList style={style} products={tempProducts} />
      ) : null}
    </div>
  );
}

export default HomePage;
