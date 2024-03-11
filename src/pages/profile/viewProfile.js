import { Container, ProfileCard, ProfileImage, UserInfo } from './styledProfiles';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ViewProfiles = () => {
  const navigate = useNavigate();

  const { userId } = useParams();
  console.log('Received userId:', userId); // Added console.log

  const [member, setMember] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    console.error('JWT token not found in local storage');
    navigate('/login');
    return;
  }

  const token = user?.token;

  const fetchData = async () => {
    try {
      const memberResponse = await fetch(`http://localhost:4000/api/members/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!memberResponse.ok) {
        throw new Error('Failed to fetch member data');
      }

      const memberData = await memberResponse.json();
      setMember(memberData);

      const profileResponse = await fetch(`http://localhost:4000/api/profiles/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const profileData = await profileResponse.json();
      setEmail(profileData.email);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [userId, navigate]);

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
