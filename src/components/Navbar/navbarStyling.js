import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const Nav = styled.nav`
  background: #031d39;
  height: 60px;
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
  font-family: 'Outfit';
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

export const LoginButton = styled(NavLink)`
  display: inline-block;
  background: #ffffff;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Outfit';
  text-decoration: none;
  padding: 10px 20px;
  width: 70px;
  height: 15px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  border-radius: 10px;
  text-align: center;
  line-height: 15px;
  &:hover,
  &.active {
    background: #ffc52d;
    color: #000000;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  background: #031d39;
  min-width: 160px;
  padding: 12px 16px;
  z-index: 1;
  right: 0;
  top: 40px;
`;

export const ProfileButton = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 20px;
  transition: color 0.3s ease;
  cursor: pointer;
  position: relative;
  &:hover ${DropdownMenu} {
    display: block;
  }
  &:hover {
    color: #ffc52d;
  }
  &.active {
    color: #ffc52d;
  }
`;

export const DropdownLink = styled(Link)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 20px;
  height: 100%;
  cursor: pointer;
  display: block;
  font-family: 'Outfit';

  &:hover {
    background-color: #021326;
  }

  &:hover {
    color: #ffc52d;
  }
`;

export const SearchButton = styled(NavLink)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffc52d;
  }
`;
