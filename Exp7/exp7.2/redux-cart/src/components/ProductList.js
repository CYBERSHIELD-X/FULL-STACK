import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import products from "../data/products";

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <p>
            {product.name} - ₹{product.price}
          </p>
          <button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
