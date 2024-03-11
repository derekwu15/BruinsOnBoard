import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import './home.css'; // Make sure your CSS file is imported

const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <div className="main-container">
        <h1 className="welcome-text">Welcome to <span>BruinsOnBoard</span></h1>
        <p>find other UCLA students to share an Uber ride with!</p>
        <Link to={user ? '/rides' : '/signup'}>
          <button className="styled-button">Get Started</button>
        </Link>
      </div>
      <div className="about-section">
      </div>
    </div>
  );
};

export default Home;