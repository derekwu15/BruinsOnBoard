import { Container, ProfileCard, ProfileImage, UserInfo } from './styledProfiles';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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
    // Filter members based on search input
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
      <h1>Members</h1>
      <input
        type="text"
        placeholder="Search Members"
        value={searchInput}
        onChange={handleSearchChange}
      />
      <Container>
        {filteredMembers.map((member) => (
          <ProfileCard key={member.id}>
            <ProfileImage
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
              alt="Profile"
            />
            <UserInfo>
              <h1>{member.name}</h1>
              <p>{member.username}</p>
              <p>{member.bio}</p>
            </UserInfo>
          </ProfileCard>
        ))}
      </Container>
    </div>
  );
};

export default MemberSearch;
