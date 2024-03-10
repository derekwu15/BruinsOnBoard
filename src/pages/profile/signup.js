// Filename - pages/profile/signup.js

import React, { Component } from "react";
import styled from "styled-components";

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


export default class SignUp extends Component {
  constructor(props){
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  onChangeName(e){
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e){
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password} = this.state;

    try {
      const response = await fetch("http://localhost:4000/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Profile created successfully");
      // Redirect or show success message as needed
      window.location = '/profile';
    } catch (error) {
      this.setState({ error: "Email/Password doesn't match our database" });
      console.error("Invalid Email or Password", error);
    }
  }

  render() {
    return (
      <SignUpContainer>
        <SignUpBox>
          <SignUpHeader>Sign Up</SignUpHeader>
          <SignUpForm onSubmit={this.handleSubmit} method= "POST">
            <SignUpLabel>
              Name:{' '}
              <SignUpInput type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName} 
              />
            </SignUpLabel>
            <SignUpLabel>
              Email:{' '}
              <SignUpInput type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail} 
              />
            </SignUpLabel>
            <SignUpLabel>
              Password:{' '}
              <SignUpInput type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword} 
              />
            </SignUpLabel>
            <SignUpSubmitButton type="submit" value="Submit"/>
          </SignUpForm>
        </SignUpBox>
      </SignUpContainer>
    )
  }
}
