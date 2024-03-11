import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import {useLogout} from '../../hooks/useLogout'
import { useAuthContext } from "../../hooks/useAuthContext";
import logo from '../../logo.png';

const Nav = styled.nav`
  background: #031d39;
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

const LogOutButton = styled(NavLink)`
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
  const {logout} = useLogout()
  const { user } = useAuthContext()
  const handleClick = () => {
    logout()
  }
  return (
    <>
      <Nav>
        <NavMenu>
          <img src={logo} alt="Logo" width="55" height="55"/>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/rides" activeStyle>
            Rides
          </NavLink>
          <NavLink to="/profile" activeStyle>
            Profile
          </NavLink>
          <NavLink to="/profile" activeStyle>
            About Us
          </NavLink>
        </NavMenu>
        {user && (
          <div>
            <span>{user.email}</span>
            <LogOutButton onClick={handleClick}>Log out</LogOutButton>
          </div>
        )}
        {!user && (
          <LoginButton to="/login" activeStyle>
            Login
          </LoginButton>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
