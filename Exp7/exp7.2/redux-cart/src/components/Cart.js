import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} - ₹{item.price}
          </p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
