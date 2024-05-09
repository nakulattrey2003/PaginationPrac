import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const handlePrev = () => {
    if (page > 1) {
      setPage();
    }
  };

  const handleNext = () => {};

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");

    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>Products</h1>
      </div>
      <div className="products">
        {products.length > 0 &&
          products.slice(0, page * 9).map((item) => {
            return (
              <div className="products_single">
                <img src={item.thumbnail} alt={item.title} />
                <div className="products_title">{item.title}</div>
              </div>
            );
          })}
      </div>
      <div className="product_button">
        <button onclick={handlePrev}>Prev</button>
        <button onclick={handleNext}>Next</button>
      </div>
    </div>
  );
}
