import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Orders.css"; // Import the CSS file

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("Pending");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">☕ Order Management</h2>

      <div className="orders-filter">
        <label htmlFor="status">Filter by Status:</label>
        <select id="status" defaultValue="Pending" onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <ul className="orders-list">
        {orders &&
          orders.map((order) => (
            <li key={order._id} className="order-item">
              <span><strong>ID:</strong> {order._id}</span>
              <span><strong>Value:</strong> ₹{order.orderValue}</span>
              <span><strong>Status:</strong> {order.status}</span>

              {order.status === "Pending" && (
                <div className="order-actions">
                  <button className="cancel-btn" onClick={() => updateOrder("cancelled", order._id)}>
                    Cancel
                  </button>
                  <button className="complete-btn" onClick={() => updateOrder("completed", order._id)}>
                    Complete
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅ Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ➡
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
