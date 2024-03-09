import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const Nav = styled.nav`
  background: #0172c0;
  height: 60px;
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

const LoginButton = styled(NavLink)`
  display: inline-block;
  background: #ffffff;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 20px;
  width: 70px;
  height: 15px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  border-radius: 20px;
  text-align: center;
  line-height: 15px;
  &:hover,
  &.active {
    background: #ffc52d;
    color: #000000;
  }
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
          <NavLink to="/ridesFind" activeStyle>
            Rides
          </NavLink>
        </NavMenu>
        <LoginButton to="/login" activeStyle>
          Login
        </LoginButton>
      </Nav>
    </>
  );
};

export default Navbar;
