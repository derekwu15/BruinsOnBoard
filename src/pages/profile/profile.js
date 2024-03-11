import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Container, ProfileCard, ProfileImage, UserInfo, EditForm, Input, Textarea } from './styledProfiles';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [member, setMember] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {

    if (!user) {
      console.error('JWT token not found in local storage');
      navigate('/login');
      return;
    }
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
          const userId = jwtDecode(token);
          const response = await fetch('http://localhost:4000/api/profiles/' + userId._id, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
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

  const handleSave = async () => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const token = user.token
    const userId = jwtDecode(token);
    const profileData = { name, username, bio, uid: userId._id };

    try {
      const response = await fetch('http://localhost:4000/api/members/' + userId._id, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      // Optionally, handle success response
      console.log('Profile saved successfully');
      window.location = '/profile';
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }
  }
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
      <EditForm>
        <h2>Edit Profile</h2>
        <label>
          Name:
          <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Username:
          <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Bio:
          <Textarea placeholder="Enter your bio" rows="4" value={bio} onChange={(e) => setBio(e.target.value)}></Textarea>
        </label>
        <br />
        <button onClick={handleSave}>Save</button>
      </EditForm>
    </Container>
  );
};

export default ProfilePage;
