// Filename - pages/profile/signup.js

import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <h1>Sign In</h1>
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

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

    </div>
  );
};

export default SignUp;
