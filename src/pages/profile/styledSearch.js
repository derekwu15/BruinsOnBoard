import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ProfileCard = styled(Link)`
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

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const UserInfo = styled.div``;

export const SearchBar = styled.input`
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  display: block;
`;
