import React from 'react';
import { AboutContainer, Heading, SubHeading, Paragraph, StepContainer, StepItem, BoldText } from './styledAbout';

const AboutPage = () => {
  return (
    <AboutContainer>
      <Heading>About Us</Heading>
      <SubHeading>Sharing Journeys, Splitting Costs, Building Connections</SubHeading>
      <Paragraph>
        At BruinsOnBoard, we believe that getting from point A to point B should be more than just a ride—it should be a journey shared with peers, an opportunity to make new friends, and a way to make travel more affordable. We are a community-focused rideshare solution exclusively for UCLA students, designed to connect Bruins so they can share an Uber ride and split the costs.
      </Paragraph>
      <SubHeading>Our Mission</SubHeading>
      <Paragraph>
        Navigating the bustling streets of Los Angeles can be daunting and expensive for college students. BruinsOnBoard emerges as a sustainable, economical, and social way to travel. Our mission is to empower UCLA students with a platform that not only reduces the financial burden of transportation but also fosters a sense of community through shared experiences.
      </Paragraph>
      <SubHeading>How It Works</SubHeading>
      <StepContainer>
        <StepItem><BoldText>Sign Up:</BoldText> Create your profile using your UCLA email to ensure a trusted network of students.</StepItem>
        <StepItem><BoldText>Plan a Ride:</BoldText> Enter your destination and schedule to find Bruins who are heading the same way.</StepItem>
        <StepItem><BoldText>Connect:</BoldText> Choose who you’d like to ride with based on profiles.</StepItem>
        <StepItem><BoldText>Share and Save:</BoldText> Meet up, enjoy the company of a new friend, and split the fare.</StepItem>
      </StepContainer>
      <SubHeading>Safety First</SubHeading>
      <Paragraph>
        Your safety is our top priority. BruinsOnBoard is built on trust and transparency. You have full control over whom you choose to ride with. In-app profiles allow you to see other Bruins, ensuring a secure and enjoyable ride-sharing experience.
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
