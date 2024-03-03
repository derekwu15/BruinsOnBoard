// Filename - ./components/Navbar.js

import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #0172c0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 12;
`;

export const NavLink = styled(Link)`
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

export const Bars = styled(FaBars)`
  display: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
