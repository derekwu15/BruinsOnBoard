// Filename - pages/profile/login.js

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Adjusted height */
`;

const LoginBox = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  width: 100%;
  margin-bottom: 10px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box; /* Ensures padding and border are included in the total width */
`;

const SubmitButton = styled.input`
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

const SignUpLink = styled.p`
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

const Login = () => {
  return (
    <LoginContainer>
      <LoginBox>
        <LoginHeader>Sign In</LoginHeader>
        <Form>
          <Label>
            Email:{' '}
            <Input type="email" name="Email" required />
          </Label>
          <Label>
            Password:{' '}
            <Input type="password" name="Password" required />
          </Label>
          <SubmitButton type="submit" value="Submit" />
        </Form>
        <SignUpLink>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </SignUpLink>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
