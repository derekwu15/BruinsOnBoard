import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding: 40px;
  background: radial-gradient(circle, #ffffff, #dfebf2);
`;

export const ProfileCard = styled.div`
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

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 20px;
`;

export const UserInfo = styled.div`
  padding: 20px;
  text-align: center;
  font-family: 'Outfit';
`;

export const EditForm = styled.div`
  width: 400px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Outfit';
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-family: 'Outfit';
`;

export const Label =  styled.label `
  font-family: 'Outfit';
`;

export const Header = styled.h2 `
  font-family: 'Outfit';
`;

export const Button = styled.button`
  justfy-align: center;
  width: 100%;
  background-color: #031d39;
  color: #fff;
  padding: 12px;
  font-family: 'Outfit';
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #021326;
    color: #ffc52d;
  }
`;
