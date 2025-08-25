import React from "react";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = ({ setCategories, setPriceRange, priceRange }) => {
  function handleChange(e) {
    if (e.target.checked) {
      setCategories((prev) => [...prev, e.target.value]);
    } else
      setCategories((prev) => prev.filter((ele) => ele !== e.target.value));
  }
  return (
    <aside className={styles.filterContainer}>
      <h2>Filter</h2>
      <form>
        <label htmlFor="price">Price: {priceRange}</label>
        <input
          type="range"
          id="price"
          name="price"
          min="1"
          max="100000"
          className={styles.priceRange}
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          step="10"
        />
        <h2>Category</h2>
        <div className={styles.categoryContainer}>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="mensFashion"
              name="mensFashion"
              value={"men's clothing"}
              onChange={handleChange}
            />
            <label htmlFor="mensFashion">Men's Clothing</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="womensFashion"
              name="womensFashion"
              value="women's clothing"
              onChange={handleChange}
            />
            <label htmlFor="womensFashion">Women's Clothing</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="jewelery"
              name="jewelery"
              value="jewelery"
              onChange={handleChange}
            />
            <label htmlFor="jewelery">Jewelery</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="electronics"
              name="electronics"
              value={"electronics"}
              onChange={handleChange}
            />
            <label htmlFor="electronics">Electronics</label>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default FilterSidebar;
