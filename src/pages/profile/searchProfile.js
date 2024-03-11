import { Container, ProfileCard, ProfileImage, UserInfo } from './styledProfiles';
import React, { useState, useEffect } from 'react';

const SearchProfiles = (searchInput) => {
  const [member, setMember] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchMemberData = async () => {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
      
        const token = user?.token;
      
        if (token) {
          try {
            const response = await fetch('http://localhost:4000/api/members/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ keyword: searchInput }) // Include the keyword in the request body
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch member data');
            }
      
            const matches = await response.json();
            console.log('Matches:', matches);
            setMember(matches);
          } catch (error) {
            console.error('Error fetching member data:', error);
          }
        } else {
          console.error('JWT token not found in local storage');
        }
      };      

    fetchMemberData();
  });

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

export default SearchProfiles;
