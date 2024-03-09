import React from 'react';
import styled from 'styled-components';

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
  return (
    <Container>
      <ProfileCard>
        <ProfileImage
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
          alt="Profile"
        />
        <UserInfo>
          <h1>Name</h1>
          <p>@username</p>
          <p>user@example.com</p>
          <p>User bio goes here</p>
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
      </EditForm>
    </Container>
  );
};

export default ProfilePage;
