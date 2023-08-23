import { useState } from 'react'
import { Button, Container } from 'semantic-ui-react'
import Login from '../components/Login'
import Signup from '../components/Signup'

function Auth({ setUser }) {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container text textAlign='center'>
      {showLogin ? (
        <>
          <Login setUser={setUser} />
          <div>Don't have an account? <Button compact  onClick={() => setShowLogin(false)}>Sign up instead</Button></div>
        </>
      ) : (
        <>
          <Signup setUser={setUser} />
          <div>Already have an account? <Button compact onClick={() => setShowLogin(true)}>Login instead</Button></div>
        </>
      )}
    </Container>
  )
}

export default Auth;