import React from 'react'
import { Container, Segment, Form, Checkbox, Button } from 'semantic-ui-react'
function Login({setUser}){

  function handleSignup(e){
    e.preventDefault();
    setUser(1);
  }

  return (
  <Container textAlign='justified'> 
    <Segment style={{margin: 'auto'}} textAlign='center'basic padded compact>
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
    <Button type='button'>Login</Button>
  </Form>
    </Segment>
  </Container>
  )
}

export default Login

