import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>

        
      </div>
    </footer>
  );
};

export default Footer;
