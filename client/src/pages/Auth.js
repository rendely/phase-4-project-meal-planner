import { useState } from 'react'
import { Container } from 'semantic-ui-react'
import Login from '../components/Login'
import Signup from '../components/Signup'

function Auth({ setUser }) {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container text textAlign='center'>
      {showLogin ? (
        <>
          <Login setUser={setUser} />
          <div>Don't have an account? <a href='#' onClick={() => setShowLogin(false)}>Sign up instead</a></div>
        </>
      ) : (
        <>
          <Signup setUser={setUser} />
          <div>Already have an account? <a href='#' onClick={() => setShowLogin(true)}>Login instead</a></div>
        </>
      )}
    </Container>
  )
}

export default Auth;