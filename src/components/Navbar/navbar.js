import React, { useState } from "react";
import { Nav, NavLink, LoginButton, NavMenu, DropdownMenu, ProfileButton, DropdownLink, SearchButton } from "./navbarStyling";
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from "../../hooks/useAuthContext";
import logo from '../../logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            <img src={logo} alt="Logo" width="55" height="55" />
          </NavLink>

          {user && (
            <NavLink to="/rides" activeStyle>
              Rides
            </NavLink>
          )}
          {user && (
            <SearchButton to="/search" activeStyle>
              Members
            </SearchButton>
          )}
        </NavMenu>
        <NavMenu>
          {user && (
            <ProfileButton onClick={toggleDropdown}>
              <FaUserCircle size={30} />
              <DropdownMenu>
                <DropdownLink to="/profile" activeStyle>
                  Your Profile
                </DropdownLink>
                <DropdownLink as="LogoutButton" onClick={handleLogout} activeStyle>                  
                  Log out
                </DropdownLink>
              </DropdownMenu>
            </ProfileButton>
          )}
          {!user && (
            <LoginButton to="/login" activeStyle>
              Login
            </LoginButton>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
