import React from 'react';
import styled from 'styled-components';

// Styled components
const AboutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-size: 18px;
`;

const Heading = styled.h1`
  color: #0056b3;
  text-align: center;
`;

const SubHeading = styled.h2`
  color: #007bff;
`;

const Paragraph = styled.p`
  text-align: justify;
  line-height: 1.6;
`;

const List = styled.ul`
  list-style-position: inside;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

// AboutPage component
const AboutPage = () => {
  return (
    <AboutContainer>
      <Heading>About BruinsOnBoard</Heading>
      <SubHeading>Sharing Journeys, Splitting Costs, Building Connections</SubHeading>
      <Paragraph>
        At BruinsOnBoard, we believe that getting from point A to point B should be more than just a ride—it should be a journey shared with peers, an opportunity to make new friends, and a way to make travel more affordable. We are a community-focused rideshare solution exclusively for UCLA students, designed to connect Bruins so they can share an Uber ride and split the costs.
      </Paragraph>
      <SubHeading>Our Mission</SubHeading>
      <Paragraph>
        Navigating the bustling streets of Los Angeles can be daunting and expensive for college students. BruinsOnBoard emerges as a sustainable, economical, and social way to travel. Our mission is to empower UCLA students with a platform that not only reduces the financial burden of transportation but also fosters a sense of community through shared experiences.
      </Paragraph>
      <SubHeading>How It Works</SubHeading>
      <List>
        <ListItem><BoldText>Sign Up:</BoldText> Create your profile using your UCLA email to ensure a trusted network of students.</ListItem>
        <ListItem><BoldText>Plan Your Ride:</BoldText> Enter your destination and schedule to find fellow Bruins who are heading the same way.</ListItem>
        <ListItem><BoldText>Connect:</BoldText> Choose who you’d like to ride with based on profiles, reviews, and preferred sharing options.</ListItem>
        <ListItem><BoldText>Share and Save:</BoldText> Meet up, enjoy the company of a new friend, and split the fare directly through the app.</ListItem>
      </List>
      <SubHeading>Safety First</SubHeading>
      <Paragraph>
        Your safety is our top priority. BruinsOnBoard is built on trust and transparency. All users are verified UCLA students, and you have full control over whom you choose to ride with. In-app ratings and reviews allow you to see feedback from fellow Bruins, ensuring a secure and enjoyable ride-sharing experience.
      </Paragraph>
      <SubHeading>Join Our Community</SubHeading>
      <Paragraph>
        We're more than just an app; we're a community. BruinsOnBoard is a platform for UCLA students to connect, save, and travel together. So why ride alone when you can share the journey with a fellow Bruin? Sign up today and become part of a movement that drives forward together, one shared ride at a time.
      </Paragraph>
      <Paragraph>
        <BoldText>Experience the joy of shared journeys with BruinsOnBoard.</BoldText> Because together, we make every ride a little more special, a little less expensive, and a lot more blue and gold.
      </Paragraph>
    </AboutContainer>
  );
};

export default AboutPage;
