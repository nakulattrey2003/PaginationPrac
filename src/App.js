import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const handlePrevClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageClick = (e) => {
    setPage(e);
  };

  const handleNextClick = () => {
    if (page <= products.length/10) setPage(page + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(products.length / 9);
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={page === i ? "activeButton" : ""}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

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
          products.slice((page - 1) * 9, page * 9).map((item) => {
            return (
              <div className="products_single">
                <img src={item.thumbnail} alt={item.title} />
                <div className="products_title">{item.title}</div>
              </div>
            );
          })}
      </div>
      <div className="product_button">
        <span onClick={handlePrevClick}>⬅️</span>
        {renderPageNumbers()}
        <span onClick={handleNextClick}>➡️</span>
      </div>
    </div>
  );
}
