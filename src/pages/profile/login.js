import { Link } from "react-router-dom";
import { AuthContainer, AuthBox, AuthHeader, AuthForm, AuthLabel, AuthInput, AuthSubmitButton, AuthLink } from './styledAuth';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <AuthContainer>
      <AuthBox>
        <AuthHeader>Login</AuthHeader>
        <AuthForm onSubmit={handleSubmit} method="POST">
          <AuthLabel>
            Email:{' '}
            <AuthInput type="email" name="Email" required
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </AuthLabel>
          <AuthLabel>
            Password:{' '}
            <AuthInput type="password" name="Password" required
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </AuthLabel>
          <AuthSubmitButton disabled={isLoading} type="submit" value="Submit" />
          {error && <div className="error">{error}</div>}
        </AuthForm>
        <AuthLink>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </AuthLink>
      </AuthBox>
    </AuthContainer>
  )
}
export default Login
