// Filename - pages/profile/signup.js

import React from "react";

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>
          Email:{' '}
          <input type="email" name="Email" />
        </label>
        <br />
        <label>
          Password:{' '}
          <input type="password" name="Password" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUp;
