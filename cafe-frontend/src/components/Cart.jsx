import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => sum + value.qty * value.price, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">My Cart</h2>
      {error && <div className="error-message">{error}</div>}

      {cart &&
        cart.map(
          (item) =>
            item.qty > 0 && (
              <div className="cart-item" key={item._id}>
                <div className="item-details">
                  <div className="item-name">{item.productName}</div>
                  <div className="item-price">₹{item.price}</div>
                </div>
                <div className="qty-controls">
                  <button
                    className="qty-button"
                    onClick={() => decrement(item._id, item.qty)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="qty-button"
                    onClick={() => increment(item._id, item.qty)}
                  >
                    +
                  </button>
                </div>
                <div className="item-price">₹{item.price * item.qty}</div>
              </div>
            )
        )}

      <div className="order-summary">Order Value: ₹{orderValue}</div>

      {user?.token ? (
        <button className="order-button" onClick={placeOrder}>
          Place Order
        </button>
      ) : (
        <button
          className="order-button"
          onClick={() => Navigate("/login")}
        >
          Login to Order
        </button>
      )}
    </div>
  );
}
