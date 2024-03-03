// Filename - pages/profile/signup.js

import React from "react";

const SignUp = () => {
  return (
    <div>
      <h1>Log In</h1>
      <form>
        <label>
          Email:{' '}
          <input type="text" name="Email" />
        </label>
        <br />
        <label>
          Password:{' '}
          <input type="text" name="Password" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUp;
