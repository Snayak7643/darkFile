import React, { useState } from "react";
import { Nav, NavLink, NavIcon, NavMenu } from "./NavbarStyle";
import { FaBars, FaTimes, FaSnapchatGhost } from "react-icons/fa";

const Navbar = () => {
  const [active, setActive] = useState(0);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <Nav>
      <NavLink to="/" onClick={handleClick}>
        <FaSnapchatGhost style={{ fontSize: "2rem" }} />
      </NavLink>
      <NavIcon onClick={handleClick}>
        {active ? <FaTimes /> : <FaBars />}
      </NavIcon>
      <NavMenu active={active}>
        <NavLink to="/about" activeStyle onClick={handleClick}>
          About
        </NavLink>
        <NavLink to="/signin" activeStyle onClick={handleClick}>
          Sign In
        </NavLink>
        <NavLink to="/signup" activeStyle onClick={handleClick}>
          Sign Up
        </NavLink>
      </NavMenu>
    </Nav>
  );
};
export default Navbar;
