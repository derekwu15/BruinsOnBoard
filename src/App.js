// Filename - App.js
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import React from "react";
import Navbar from "./components/Navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Login from "./pages/profile/login";
import SignUp from "./pages/profile/signup";
import RidesFind from "./pages/rides/rides";
import Profile from "./pages/profile/profile"
import ViewProfile from "./pages/profile/viewProfile"
import MemberSearch from "./pages/profile/searchProfile";
import About from "./pages/about/about"


function App() {
  const { user } = useAuthContext();
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/viewprofile/:userId" element={<ViewProfile />} />
        <Route path="/search/" element={<MemberSearch />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to='/' />} />
        <Route path="/rides" element={<RidesFind />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
