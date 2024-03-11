import { Container, ProfileCard, ProfileImage, UserInfo } from './styledProfiles';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";


const ViewProfiles = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { userId } = useParams();
  console.log('Received userId:', userId); // Added console.log

  const [member, setMember] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!user) {
      console.error('JWT token not found in local storage');
      navigate('/login');
      return;
    }


    const fetchMemberData = async () => {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;

      const token = user?.token;

      if (token) {
        try {
          const response = await fetch(`http://localhost:4000/api/members/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch member data');
          }

          const memberData = await response.json();
          setMember(memberData);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }

        try {
          const response = await fetch(`http://localhost:4000/api/profiles/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
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
  }, [userId]);

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
