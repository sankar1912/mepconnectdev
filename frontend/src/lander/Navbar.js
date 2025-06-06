import React from "react";
import "./Navbar.css"; // Ensure you create a CSS file for styling

const Navbar = () => {
  const menuItems = [
    "Administration",
    "Admin",
    "Contact us",
    "Get Help",
    "Scroll to main"
  ]

  return (
    <>
      {/* Transparent blur overlay */}
      <div className="overlay" id="summa1"></div>
      
      {/* Header bar */}
      <div className="header-bar"></div>
      
      {/* Background blur */}
      <div className="background-blur" id="sum2"></div>

      {/* Navigation Menu */}
      <nav className="nav-links">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="nav-item"
            onMouseOver={() => console.log(`Hovered on ${item}`)}
          >
            {item}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
