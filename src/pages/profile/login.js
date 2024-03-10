// Filename - pages/profile/login.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: radial-gradient(circle, #ffffff, #dfebf2);
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
  box-sizing: border-box;
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

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await fetch("http://localhost:4000/api/profiles/check-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Profile exists");
      // Redirect or show success message as needed
      window.location = '/profile';
    } catch (error) {
      this.setState({ error: "Email/Password doesn't match our database" });
      console.error("Invalid Email or Password", error);
    }
  };

  render() {
    const { error } = this.state;

    return (
      <LoginContainer>
        <LoginBox>
          <LoginHeader>Log In</LoginHeader>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={this.handleSubmit} method="POST">
            <Label>
              Email:{' '}
              <Input type="email" name="Email" required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail} />
            </Label>
            <Label>
              Password:{' '}
              <Input type="password" name="Password" required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword} />
            </Label>
            <SubmitButton type="submit" value="Submit" />
          </Form>
          <SignUpLink>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </SignUpLink>
        </LoginBox>
      </LoginContainer>
    );
  }
}
