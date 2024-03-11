import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import './home.css'; // Make sure your CSS file is imported
import AboutPage from "../about/about";

const Home = () => {
  const { user } = useAuthContext();
  const [typedText, setTypedText] = useState('');
  const fullText = 'BruinsOnBoard';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) {
        clearInterval(intervalId);
      }
    }, 150); // This controls the speed of the typing

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="main-container">
        <h1 className="welcome-text">Welcome to <br /><span>BruinsOnBoard</span></h1>
        <p className="share-ride-text">find other UCLA students to share an Uber ride with!</p>
        <Link to={user ? '/rides' : '/signup'}>
          <button className="styled-button">Get Started</button>
        </Link>
      </div>
      <div className="about-section">
        <AboutPage />
      </div>
      
    </div>
  );
};

export default Home;