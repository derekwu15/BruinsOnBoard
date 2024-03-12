import React from 'react';
import './boxContainer.css';
import { Link } from 'react-router-dom';
import about from './about.png';
import ride from './carpool.png';
import profile from './profile.png';
import { useAuthContext } from "../../hooks/useAuthContext";

// Box component
const Box = ({ imageUrl, buttonText, link, text }) => {
  return (
    <div className="box">
      <img src={imageUrl} alt={buttonText} />
      <br />
      <div className="box-text">{text}</div>
      <br />
      <Link to={link}>
        <button>{buttonText}</button>
      </Link>
    </div>
  );
};

// Main container component
const BoxContainer = () => {
  const { user } = useAuthContext();
  return (
    <div className="box-container">
      <Box
        imageUrl={about}
        buttonText="About Us"
        link="/about"
        text="We are a community-focused rideshare solution exclusively for UCLA students, designed to connect Bruins so they can share an Uber ride and split the costs"
      />
      <Box
        imageUrl={ride}
        buttonText="Find a Ride"
        link={user ? '/rides' : '/login'}
        text={
          <>
            <br />
            Enter your destination and schedule to find fellow Bruins who are heading the same way
            <br /><br />
          </>
        }
      />
      <Box
        imageUrl={profile}
        buttonText="Create a Profile"
        link={user ? '/profile' : '/signup'}
        text=
        {
          <>
            <br />
              Create a Profile now to start connecting with other students!
            <br /><br />
          </>
        }
      />
    </div>
  );
};

export default BoxContainer;
