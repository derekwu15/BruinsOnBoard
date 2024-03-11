import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export const AuthBox = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const AuthHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #333;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthLabel = styled.label`
  width: 100%;
  margin-bottom: 10px;
  color: #555;
`;

export const AuthInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

export const AuthSubmitButton = styled.input`
  width: 100%;
  background-color: #0172c0;
  color: #fff;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #01508b;
  }
`;

export const AuthLink = styled.p`
  text-align: center;
  margin-top: 15px;
  color: #555;

  a {
    color: #0172c0;
    text-decoration: underline;
    transition: color 0.3s ease;

    &:hover {
      color: #01508b;
    }
  }
`;
