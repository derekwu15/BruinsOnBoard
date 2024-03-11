import React from 'react';
import './boxContainer.css';
import about from './about.png';
import ride from './carpool.png';
import profile from './profile.png';

// Box component
const Box = ({ imageUrl, buttonText, link, text}) => {
  return (
    <div className="box">
      <img src={imageUrl} alt={buttonText} />
      <br />
      <div className="box-text">{text}</div> {/* This div holds the text */}
      <br />
      <button onClick={() => window.location.href=link}>{buttonText}</button>
    </div>
  );
};

// Main container component
const BoxContainer = () => {
  return (
    <div className="box-container">
      <Box 
        imageUrl={about} 
        buttonText="About Us" 
        link="about-us.html" 
        text = "We are a community-focused rideshare solution exclusively for UCLA students, designed to connect Bruins so they can share an Uber ride and split the costs"
      />
      <Box 
        imageUrl={ride} 
        buttonText="Find a Ride" 
        link="create-ride.html" 
        text="Enter your destination and schedule to find fellow Bruins who are heading the same way"
      />
      <Box 
        imageUrl={profile} 
        buttonText="Create a Profile" 
        link="create-ride.html" 
        text="Create a Profile now to start connecting with other students!"
      />
    </div>
  );
};

export default BoxContainer;
