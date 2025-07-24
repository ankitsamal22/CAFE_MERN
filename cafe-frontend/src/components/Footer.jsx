import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>CoffeeApp</h3>
          <p>Your daily dose of the finest coffee blends and brews.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@coffeeapp.com</p>
          <p>Phone: +1 234 567 8900</p>
          <div className="social-icons">
            <a href="https://facebook.com/coffeeapp" aria-label="Facebook" target="_blank" rel="noreferrer">FB</a>
            <a href="https://twitter.com/coffeeapp" aria-label="Twitter" target="_blank" rel="noreferrer">TW</a>
            <a href="https://instagram.com/coffeeapp" aria-label="Instagram" target="_blank" rel="noreferrer">IG</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 CoffeeApp. All rights reserved.</p>
      </div>
    </footer>
  );
}
