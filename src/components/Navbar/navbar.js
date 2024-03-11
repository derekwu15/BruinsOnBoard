import React, { useState } from "react";
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

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  background: #0172c0;
  min-width: 160px;
  padding: 12px 16px;
  z-index: 1;
  right: 0;
  top: 40px;
`;

const ProfileButton = styled.div`
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

const DropdownLink = styled(Link)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 20px;
  height: 100%;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: #0056b3;
  }

  &:hover {
    color: #ffc52d;
  }
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 15px;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Navbar = () => {
  const {logout} = useLogout()
  const { user } = useAuthContext()
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Implement your search logic here, e.g., navigate to search page or filter content
      console.log(searchInput); // For example, log the search input
      // You might want to navigate to a search page or perform any other action
    }
  };


  return (
    <>
      <Nav>
        <NavMenu>
          <img src={logo} alt="Logo" width="55" height="55"/>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>

          {user && (
            <NavLink to="/rides" activeStyle>
              Rides
            </NavLink>
          )}

        </NavMenu>
        {user && (
          <SearchContainer>
            <SearchBar
              type="text"
              placeholder="Search Profile"
              value={searchInput}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
            />
            <ProfileButton onClick={toggleDropdown}>
              Profile
              <DropdownMenu>
                <DropdownLink to="/profile" activeStyle>
                  Your Profile
                </DropdownLink>
                <DropdownLink as="LogoutButton" onClick={() => logout()}activeStyle>
                  Log out
                </DropdownLink> 
              </DropdownMenu>
            </ProfileButton>
          </SearchContainer>
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
