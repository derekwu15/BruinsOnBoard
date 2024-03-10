import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding: 40px;
  background: radial-gradient(circle, #ffffff, #dfebf2);
  `;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-right: 40px;
  width: 300px;
  background-color: #fff;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const EditForm = styled.div`
  width: 400px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const ProfilePage = () => {

  const [member, setMember] = useState(null);
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
          console.log(memberData)
          setMember(memberData);
        } catch (error) {
          console.error('Error fetching member data:', error);
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
            <p>{member.email ? member.email : "Email"}</p>
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
          <Input type="text" placeholder="Enter your name" />
        </label>
        <label>
          Username:
          <Input type="text" placeholder="Enter your username" />
        </label>
        <label>
          Email:
          <Input type="email" placeholder="Enter your email" />
        </label>
        <label>
          Bio:
          <Textarea placeholder="Enter your bio" rows="4"></Textarea>
        </label>
        <br/>
        <button>Save</button>
      </EditForm>
    </Container>
  );
};

export default ProfilePage;
