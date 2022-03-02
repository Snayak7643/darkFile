import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavLink, NavIcon, NavMenu } from "./NavbarStyle";
import { FaBars, FaTimes, FaBattleNet } from "react-icons/fa";
import { AppContext } from "../../App";
import swal from "sweetalert";

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
        <NavLink key="signin" to="/signin" onClick={handleClick}>
          Sign In
        </NavLink>,
        <NavLink key="signup" to="/signup" onClick={handleClick}>
          Sign Up
        </NavLink>,
      ];
    } else {
      return [
        <NavLink key="profile" to="/profile" onClick={handleClick}>
          Profile
        </NavLink>,
        <NavLink key="allposts" to="/allposts" onClick={handleClick}>
          All Posts
        </NavLink>,
        <NavLink key="createpost" to="/createpost" onClick={handleClick}>
          Create Post
        </NavLink>,
        <NavLink
          key="logout"
          to="/signin"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            swal("Logged Out Successfully", {
              icon: "success",
              buttons: false,
              timer: 1000,
            });
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
        <FaBattleNet style={{ fontSize: "3rem", marginLeft: "10px" }} />
      </NavLink>
      <NavIcon onClick={handleClick}>
        {active ? <FaTimes /> : <FaBars />}
      </NavIcon>
      <NavMenu active={active}>{Navigation()}</NavMenu>
    </Nav>
  );
};
export default Navbar;
