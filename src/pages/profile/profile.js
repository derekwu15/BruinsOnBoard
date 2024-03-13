import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Container, ProfileCard, ProfileImage, UserInfo, EditForm, Input, Textarea, Label, Header, Button } from './styledProfiles';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      if (!user) {
        console.error('JWT token not found in local storage');
        navigate('/login');
        return;
      }

      const token = user.token;

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
          setName(memberData.name || '');
          setUsername(memberData.username || '');
          setBio(memberData.bio || '');

          const profileResponse = await fetch('http://localhost:4000/api/profiles/' + userId._id, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });

          if (!profileResponse.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const profileData = await profileResponse.json();
          setEmail(profileData.email);

          const allMembersResponse = await fetch('http://localhost:4000/api/members/', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });

          if (!allMembersResponse.ok) {
            throw new Error('Failed to fetch all members');
          }

          const allMembersData = await allMembersResponse.json();
          setAllMembers(allMembersData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.error('JWT token not found in local storage');
      }
    };

    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const handleSave = async () => {
  if (!name || !username || !bio) {
    setErrorMessage('Please fill out all required fields');
    return;
  }

  setErrorMessage('');

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const token = user.token;
  const userId = jwtDecode(token);

  const isUsernameChanged = member.username !== username;

  let existingUser;

  if (isUsernameChanged) {
    existingUser = allMembers.find(
      (member) => member.username === username && member._id !== userId._id
    );
  }

  if (isUsernameChanged && existingUser) {
    setErrorMessage('Username already taken. Please choose a different username.');
    return;
  }

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

    const updatedMemberResponse = await fetch('http://localhost:4000/api/members/' + userId._id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!updatedMemberResponse.ok) {
      throw new Error('Failed to fetch updated member data');
    }

    const updatedMemberData = await updatedMemberResponse.json();
    setMember(updatedMemberData);

    const updatedProfileResponse = await fetch('http://localhost:4000/api/profiles/' + userId._id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!updatedProfileResponse.ok) {
      throw new Error('Failed to fetch updated profile data');
    }

    const updatedProfileData = await updatedProfileResponse.json();
    setEmail(updatedProfileData.email);

    const allMembersResponse = await fetch('http://localhost:4000/api/members/', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!allMembersResponse.ok) {
      throw new Error('Failed to fetch all members');
    }

    const updatedAllMembersData = await allMembersResponse.json();
    setAllMembers(updatedAllMembersData);

    console.log('Profile saved successfully');
    navigate('/profile', { replace: true });
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
        <Header>Edit Profile</Header>
        <Label>
          Name:
          <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Label>
        <Label>
          Username:
          <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Label>
        <Label>
          Bio:
          <Textarea placeholder="Enter your bio" rows="4" value={bio} onChange={(e) => setBio(e.target.value)} required />
        </Label>
        <br />
        <Button onClick={handleSave}>Save</Button>
        {(!member || !member.name) && (
          <div style={{ color: 'red', textAlign: 'center', fontFamily: 'Outfit' }}>Please finish setting up your profile!</div>
        )}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </EditForm>
    </Container>
  );
};

export default ProfilePage;
