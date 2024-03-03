// Filename - "./components/Navbar.js

import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements.js";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
        			<NavLink to="/" activeStyle>
        				Home
        			</NavLink>
					<NavLink to="/about" activeStyle>
						About
					</NavLink>
					<NavLink to="/sign-up" activeStyle>
						Sign Up
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
