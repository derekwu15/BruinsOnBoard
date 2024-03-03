// Filename - App.js

import React from "react";
import Navbar from "./components/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/profile/login";
import SignUp from "./pages/profile/signup";
import Rides from "./pages/rides/rides";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/rides" element={<Rides />} />
				<Route path="/login" element={<Login />} />
              	<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	);
}

export default App;
