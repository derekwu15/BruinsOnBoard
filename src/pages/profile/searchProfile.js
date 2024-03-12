import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProfileCard = styled(Link)`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const UserInfo = styled.div``;

const SearchBar = styled.input`
  width: 80%; /* Adjusted width to match ProfileCard width */
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none; /* Remove default outline */
  display: block; /* Ensure the input is displayed as a block element */
`;

const MemberSearch = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

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
          const response = await fetch('http://localhost:4000/api/members/', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch member data');
          }

          const memberData = await response.json();
          setMembers(memberData);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      } else {
        console.error('JWT token not found in local storage');
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchInput, members]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Members</h1>
      <SearchBar
        type="text"
        placeholder="Search Members"
        value={searchInput}
        onChange={handleSearchChange}
      />
      <Container>
        {filteredMembers.map((member) => (
          <ProfileCard to={`/viewprofile/${member.user_id}`} key={member.user_id}>
            <ProfileImage
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
              alt="Profile"
            />
            <UserInfo>
              <h3>{member.name}</h3>
              <p>{member.username}</p>
            </UserInfo>
          </ProfileCard>
        ))}
      </Container>
    </div>
  );
};

export default MemberSearch;
