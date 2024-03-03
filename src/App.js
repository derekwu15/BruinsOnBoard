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
import Login from "./pages/profile/login";
import SignUp from "./pages/profile/signup";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
              	<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	);
}

export default App;
