import { Container, ProfileCard, ProfileImage, UserInfo} from './styledProfiles';
import {jwtDecode} from 'jwt-decode';
import React, { useState, useEffect } from 'react';

const ViewProfiles = () => {

  const [member, setMember] = useState(null);
  const [email, setEmail] = useState('');
  useEffect(() => {
    const fetchMemberData = async () => {
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      const token = user.token
      if (token) {
        try {
          const userId = jwtDecode(token);
          const response = await fetch('http://localhost:4000/api/members/' + userId._id, {
            headers: {
              'Authorization': 'Bearer ' + token
          }});
          if (!response.ok) {
            throw new Error('Failed to fetch member data');
          }

          const memberData = await response.json();
          setMember(memberData);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }

        try {
          const userId = jwtDecode(token);
          const response = await fetch('http://localhost:4000/api/profiles/' + userId._id, {
            headers: {
              'Authorization': 'Bearer ' + token
          }});
          if (!response.ok) {
            throw new Error('Failed to fetch member data');
          }

          const profileData = await response.json();
          setEmail(profileData.email);
        } catch (error) {
          console.error('Error fetching email:', error);
        }
      } else {
        console.error('JWT token not found in local storage');
      }
    };
    fetchMemberData();
  }, []);

  return (
    <Container>
      <ProfileCard>
        <ProfileImage
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
          alt="Profile"
        />
        <UserInfo>
        {member ? (
          <div>
            <h1>{member.name ? member.name : "Name"}</h1>
            <p>{member.username ? member.username : "Username"}</p>
            <p>{email ? email : "Email"}</p>
            <p>{member.bio ? member.bio : "Bio"}</p>
          </div>
        ) : (
          <p>Loading member data...</p>
        )}
        </UserInfo>
      </ProfileCard>
    </Container>
  );
};

export default ViewProfiles;
