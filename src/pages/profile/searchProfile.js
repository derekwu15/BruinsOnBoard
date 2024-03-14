import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, ProfileCard, ProfileImage, UserInfo, SearchBar } from './styledSearch';
import { jwtDecode } from 'jwt-decode';


const MemberSearch = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  // eslint-disable-next-line
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          console.error('User not found in local storage');
          navigate('/login');
          return;
        }

        const user = JSON.parse(userString);
        const token = user.token;

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
        setMember(user);
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          console.error('User not found in local storage');
          navigate('/login');
          return;
        }

        const user = JSON.parse(userString);
        const token = user.token;

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

        if (!memberData.username) {
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    fetchMemberData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array to run only once when component mounts

  useEffect(() => {
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      member.username.toLowerCase().includes(searchInput.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchInput, members]);


  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Outfit' }}>Members</h1>
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
              <p>{member.bio}</p>
            </UserInfo>
          </ProfileCard>
        ))}
      </Container>
    </div>
  );
};

export default MemberSearch;
