// Filename - pages/profile/login.js

import { Link } from "react-router-dom";
import styled from "styled-components";
import {useLogin} from '../../hooks/useLogin'
import {useState} from 'react';

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

const sendEmail = async (email) => {
  try {
    const response = await fetch('http://localhost:4000/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Pass the recipient email address to the backend
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const data = await response.json();
    console.log(data); // Log response from the backend
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
    sendEmail(email)
  }

  return (
    <LoginContainer>
        <LoginBox>
          <LoginHeader>Sign In</LoginHeader>
          <Form onSubmit={handleSubmit} method= "POST">
            <Label>
              Email:{' '}
              <Input type="email" name="Email" required
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </Label>
            <Label>
              Password:{' '}
              <Input type="password" name="Password" required
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </Label>
            <SubmitButton disabled={isLoading} type="submit" value="Submit" />
            {error && <div className="error">{error}</div>}
          </Form>
          <SignUpLink>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </SignUpLink>
        </LoginBox>
      </LoginContainer>
  )
}
export default Login
