// Filename - App.js

import React from "react";
import Navbar from "./components/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import SignUp from "./pages/profile/signup";
import Rides from "./pages/rides/rides";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route
					path="/sign-up"
					element={<SignUp />}
				/>
				<Route path="/rides" element={<Rides />} />
			</Routes>
		</Router>
	);
}

export default App;
