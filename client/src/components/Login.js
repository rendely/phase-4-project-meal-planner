import React from 'react'
import { Container, Segment, Form, Checkbox, Button } from 'semantic-ui-react'
function Login({ setUser }) {

  function handleSignup(e) {
    e.preventDefault();
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(r => {
        if (r.status === 201) return r.json()
        throw new Error('Signup failed')
      })
      .then(d => {
        if (d.id) setUser(d.id)
      })
      .catch((error) => console.log(error))
  }

  function handleLogin(e) {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(r => {
        if (r.status === 201) return r.json()
        throw new Error('Login failed')
      })
      .then(d => {
        if (d.id) setUser(d.id)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container textAlign='justified'>
      <Segment style={{ margin: 'auto' }} textAlign='center' basic padded compact>
        <h2>Login/Signup for Meal Planner</h2>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' />
          </Form.Field>
          <Button type='button' onClick={handleSignup}>Signup</Button>
          <Button type='button' onClick={handleLogin}>Login</Button>
        </Form>
      </Segment>
    </Container>
  )
}

export default Login

