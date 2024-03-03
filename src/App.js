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
import Rides from "./pages/rides/rides";
import Messages from "./pages/messages/message";
import RidesCreate from "./pages/rides/ridesCreate";
import RidesFind from "./pages/rides/ridesFind";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/message" element={<Messages />} />
      </Routes>
    </Router>
  );
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/ridesCreate" element={<RidesCreate />} />
        <Route path="/ridesFind" element={<RidesFind />} />
      </Routes>
    </Router>
  );
}

export default App;
