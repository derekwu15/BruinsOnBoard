// Filename - pages/profile/signup.js

import styled from "styled-components";
import {useState} from 'react';
import { useSignup } from "../../hooks/useSignup";

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const SignUpBox = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: -7.5vh; /* Adjusted to move the SignUpBox up */
`;

const SignUpHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpLabel = styled.label`
  width: 100%;
  margin-bottom: 10px;
  color: #555;
`;

const SignUpInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const SignUpSubmitButton = styled.input`
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

const Signup = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  
  }

  return (
    <SignUpContainer>
        <SignUpBox>
          <SignUpHeader>Sign Up</SignUpHeader>
          <SignUpForm onSubmit={handleSubmit} method= "POST">
            <SignUpLabel>
              Email:{' '}
              <SignUpInput type="text"
              required
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              />
            </SignUpLabel>
            <SignUpLabel>
              Password:{' '}
              <SignUpInput type="text"
              required
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              />
            </SignUpLabel>
            <SignUpSubmitButton disabled={isLoading} type="submit" value="Submit"/>
            {error && <div clasName='error'>{error}</div>}
          </SignUpForm>
        </SignUpBox>
      </SignUpContainer>
  )
}
export default Signup
