import React from "react";
import logo from "../../assets/logo.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <img src={logo} alt="logo" />
      </div>
    </footer>
  );
};

export default Footer;
