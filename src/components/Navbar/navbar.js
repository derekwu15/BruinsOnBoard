// Filename - "./components/Navbar.js

import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Nav = styled.nav`
  background: #0172c0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 12;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 20px;
  height: 100%;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffc52d;
  }

  &.active {
    color: #ffc52d;
  }
`;

const ProfileIcon = styled(FaUser)`
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  margin-top: 25px;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/rides" activeStyle>
            Rides
          </NavLink>
        </NavMenu>
        <NavLink to="/login" activeStyle>
          <ProfileIcon />
        </NavLink>
      </Nav>
    </>
  );
};

export default Navbar;
