import React, { useState } from "react";
import { Nav, NavLink, LoginButton, NavMenu, DropdownMenu, ProfileButton, DropdownLink, SearchButton } from "./navbarStyling";
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from "../../hooks/useAuthContext";
import logo from '../../logo.png';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
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
          <SearchButton to="/search" activeStyle>
            Search Users
          </SearchButton>

        </NavMenu>
        <NavMenu>
          {user && (
            <ProfileButton onClick={toggleDropdown}>
              <FaUserCircle size={30}/>
              <DropdownMenu>
                <DropdownLink to="/profile" activeStyle>
                  Your Profile
                </DropdownLink>
                <DropdownLink as="LogoutButton" onClick={() => logout()} activeStyle>
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
