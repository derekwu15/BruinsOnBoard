import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled component for the main container
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: radial-gradient(circle, #ffffff, #dfebf2);
`;

// Styled component for the Welcome text
const WelcomeText = styled.h1`
  font-size: 5rem;
  margin: 0;
  padding: 0;

  span {
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
`;

const StyledButton = styled.button`
  font-size: 1.5rem;
  padding: 15px 30px;
  margin-top: 40px;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
		color: #ffc52d;
  }
`;

// Styled component for the About section
const AboutSection = styled.div`
  font-size: 2rem;
  text-align: left;
  padding: 50px 20px;
	padding-left: 100px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;


const Home = () => {
  return (
    <div>
      <MainContainer>
        <WelcomeText>Welcome to <span>BruinsOnBoard</span></WelcomeText>
        <StyledLink to="/login">
          <StyledButton>Get Started</StyledButton>
        </StyledLink>
      </MainContainer>
      <AboutSection>
        <h1>About</h1>
        <p>We are a dedicated team of UCLA students who are looking to improve tranpsortation for UCLA studnets.</p>
      </AboutSection>
    </div>
  );
};

export default Home;
