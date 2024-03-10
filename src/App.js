// Filename - App.js

import React from "react";
import Navbar from "./components/Navbar/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/profile/login";
import SignUp from "./pages/profile/signup";
import Messages from "./pages/messages/message";
import RidesFind from "./pages/rides/rides";
import Profile from "./pages/profile/profile"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/rides" element={<RidesFind />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
