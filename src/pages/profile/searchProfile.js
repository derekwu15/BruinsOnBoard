import { Container, ProfileCard, ProfileImage, UserInfo } from './styledProfiles';
import React, { useState, useEffect } from "react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const MemberSearch = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [members, setMembers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredMembers, setFilteredMembers] = useState([]);
  
    // Dummy data for demonstration purposes
    const dummyMembers = [
      { id: 1, name: "John Doe", username: "john_doe", bio: "Lorem ipsum dolor sit amet" },
      { id: 2, name: "Jane Smith", username: "jane_smith", bio: "Consectetur adipiscing elit" },
      { id: 3, name: "Alice Johnson", username: "alice_johnson", bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" },
      { id: 4, name: "Bob Brown", username: "bob_brown", bio: "Ut enim ad minim veniam" }
    ];
  
    useEffect(() => {
      // Simulate fetching members from an API
      // Replace this with your actual API call to fetch members
      setMembers(dummyMembers);
    }, []);
  
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
        {user && (
          <button onClick={() => logout()}>Logout</button>
        )}
      </div>
    );
  };
  
  export default MemberSearch;