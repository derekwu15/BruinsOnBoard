import React from "react";
import styled from "styled-components";

// Styled component for the main container
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: radial-gradient(circle, #ffffff, #dfebf2); // Complementary radial gradient
`;

// Styled component for the Welcome text
const WelcomeText = styled.h1`
  font-size: 5rem; // Existing font size
  margin: 0;
  padding: 0;

  span {
    transition: color 0.3s ease; // Smooth transition for color change
    cursor: pointer; // Change cursor to indicate interactiveness

    &:hover {
      color: #007bff; // Change to desired hover color
    }
  }
`;

// Styled component for the button
// Styled component for the button
const StyledButton = styled.button`
  font-size: 1.5rem; // Increase the text size
  padding: 15px 30px; // Increase padding for a bigger button
  margin-top: 40px; // Increase space above the button
  cursor: pointer;
  border: none; // Remove default border
  border-radius: 20px; // Add rounded corners
  background-color: #007bff; // Add a background color (example with Bootstrap primary color)
  color: white; // Change text color to white
  transition: background-color 0.2s; // Smooth transition for hover effect

  &:hover {
    background-color: #0056b3; // Darken the button on hover for a nice effect
		color: #ffc52d;
  }
`;

// Styled component for the About section
const AboutSection = styled.div`
  font-size: 2rem; // Increase the text size
  text-align: left;
  padding: 50px 20px; // Add padding to make it necessary to scroll to view
	padding-left: 100px;
`;


const Home = () => {
  return (
    <div>
      <MainContainer>
        <WelcomeText>Welcome to <span>BruinsOnBoard</span></WelcomeText>
        <div>
          <StyledButton>Get Started</StyledButton>
        </div>
      </MainContainer>
      <AboutSection>
        <h1>About</h1>
				<p>We are a dedicated team of UCLA students who are looking to improve tranpsortation for UCLA studnets.</p>
      </AboutSection>
    </div>
  );
};

export default Home;