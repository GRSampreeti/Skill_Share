import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { GiHamburgerMenu } from "react-icons/gi";
import "./NavBar.css"

const Navbar = ({ isAuthenticated }) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(prev => !prev);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-main">
        <Link to="/" className="header">
          <h1>
            <span className="m">S</span>KILL
            <span className="m">S</span>HARE
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="list-sec">
        <ul className={click ? "list-mobile" : "list"} onClick={() => setClick(false)}>
          <Link to="/" className="link"><li>Home</li></Link>
          <Link to="/about" className="link"><li>About</li></Link>
          {click && isAuthenticated ? (
            <Link to="/profile" className="link"><li>Own Profile</li></Link>
          ) : (
            <Link to="/login" className="mobile-btn link"><li>Login/Register</li></Link>
          )}
        </ul>
      </div>

      {/* Auth Buttons for Desktop */}
      <div className="section3">
        {isAuthenticated ? (
          <Link to="/profile">
            <Button colorScheme="teal" variant="solid" mx="2">Own Profile</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button colorScheme="teal" variant="solid">Login/Register</Button>
          </Link>
        )}
        <ColorModeSwitcher />
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger">
        <ColorModeSwitcher style={{ marginRight: "6px" }} />
        <GiHamburgerMenu onClick={handleClick} style={{ marginTop: "7px", cursor: "pointer" }} />
      </div>
    </nav>
  );
};

export default Navbar;
