import React from 'react'
import { Container, Segment, Form, Checkbox, Button } from 'semantic-ui-react'
function Login(){
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
    <Button type='submit'>Signup</Button>
    <Button type='submit'>Login</Button>
  </Form>
    </Segment>
  </Container>
  )
}

export default Login

