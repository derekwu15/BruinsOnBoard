import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, ProfileCard, ProfileImage, UserInfo, SearchBar } from './styledSearch';
import { jwtDecode } from 'jwt-decode';


const MemberSearch = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [member, setMember] = useState(null);

  const fetchMemberData = async () => {
    const userString = localStorage.getItem('user');

    const user = userString ? JSON.parse(userString) : null;
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

        if (!memberData.username) {
          navigate('/profile');
        }

      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    } else {
      console.error('JWT token not found in local storage');
    }
  };
  fetchMemberData();

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
          setMember(user);
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
