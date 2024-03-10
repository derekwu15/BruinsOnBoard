import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  padding: 20px;
`;

const ProfileCard = styled.div`
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-right: 20px;
  width: 90vh;
  align-items: flex-start;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  padding: 20px;
`;

const EditForm = styled.div`
  width: 90vh;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  align-items: flex-start;
`;

const ProfilePage = () => {
  return (
    <Container>
      <ProfileCard>
        <ProfileImage src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="Profile" />
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
          <input type="text" placeholder="Enter your name" />
        </label>
        <br/>
        <label>
          Username:
          <input type="text" placeholder="Enter your username" />
        </label>
        <br/>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" />
        </label>
        <br/>
        <label>
          Bio:
          <textarea placeholder="Enter your bio"></textarea>
        </label>
        <br/>
        <button>Save</button>
      </EditForm>
    </Container>
  );
};

export default ProfilePage;
