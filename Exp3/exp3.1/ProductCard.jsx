import React from "react";
import "./ProductCard.css";

function ProductCard({ name, price, image, inStock }) {
  return (
    <div className="card">
      <img src={image} alt={name} className="product-img" />

      <h2>{name}</h2>

      <p className="price">₹{price.toFixed(2)}</p>

      <p className={inStock ? "stock in" : "stock out"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>

      <button disabled={!inStock}>
        {inStock ? "Add to Cart" : "Unavailable"}
      </button>
    </div>
  );
}

export default ProductCard;
