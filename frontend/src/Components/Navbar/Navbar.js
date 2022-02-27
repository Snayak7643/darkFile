import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavLink, NavIcon, NavMenu } from "./NavbarStyle";
import { FaBars, FaTimes, FaSnapchatGhost } from "react-icons/fa";
import { AppContext } from "../../App";

const Navbar = () => {
  const [active, setActive] = useState(0);
  const handleClick = () => {
    setActive(!active);
  };

  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  const Navigation = () => {
    if (!state) {
      return [
        <NavLink key="about" to="/about" activeStyle onClick={handleClick}>
          About
        </NavLink>,
        <NavLink key="signin" to="/signin" activeStyle onClick={handleClick}>
          Sign In
        </NavLink>,
        <NavLink key="signup" to="/signup" activeStyle onClick={handleClick}>
          Sign Up
        </NavLink>,
      ];
    } else {
      return [
        <NavLink
          key="allposts"
          to="/allposts"
          activeStyle
          onClick={handleClick}
        >
          All Posts
        </NavLink>,
        <NavLink
          key="createpost"
          to="/createpost"
          activeStyle
          onClick={handleClick}
        >
          Create Post
        </NavLink>,
        <NavLink
          key="logout"
          to="/signin"
          activeStyle
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/signin");
            handleClick();
          }}
        >
          Log Out
        </NavLink>,
      ];
    }
  };

  return (
    <Nav>
      <NavLink to="/" onClick={handleClick}>
        <FaSnapchatGhost style={{ fontSize: "2rem" }} />
      </NavLink>
      <NavIcon onClick={handleClick}>
        {active ? <FaTimes /> : <FaBars />}
      </NavIcon>
      <NavMenu active={active}>{Navigation()}</NavMenu>
    </Nav>
  );
};
export default Navbar;
