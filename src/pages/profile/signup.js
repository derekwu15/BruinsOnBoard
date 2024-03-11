import { AuthContainer, AuthBox, AuthHeader, AuthForm, AuthLabel, AuthInput, AuthSubmitButton } from './styledAuth';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)

  }

  return (
    <AuthContainer>
      <AuthBox>
        <AuthHeader>Sign Up</AuthHeader>
        <AuthForm onSubmit={handleSubmit} method="POST">
          <AuthLabel>
            Email:{' '}
            <AuthInput type="email"
              required
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </AuthLabel>
          <AuthLabel>
            Password:{' '}
            <AuthInput type="password"
              required
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AuthLabel>
          <AuthSubmitButton disabled={isLoading} type="submit" value="Submit" />
          {error && <div clasName='error'>{error}</div>}
        </AuthForm>
      </AuthBox>
    </AuthContainer>
  )
}
export default Signup
