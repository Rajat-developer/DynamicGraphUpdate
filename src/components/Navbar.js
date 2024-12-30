import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">SpeedVitals</div>
      <div className="hamburger" onClick={toggleNavbar}>
        ☰
      </div>
      <ul className={`nav-links ${isOpen ? "active" : ""}` }>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/performance-test">Performance Test</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
