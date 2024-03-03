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
					<NavLink to="/rides" activeStyle>
						Rides
					</NavLink>
					<NavLink to="/login" activeStyle>
						Profile
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
