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
					<NavLink to="/login" activeStyle>
						Login
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
