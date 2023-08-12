import React, {useState} from 'react'
import { Container, Segment, Form, Button } from 'semantic-ui-react'
import {useFormik} from "formik";
import * as yup from "yup";

function Login({ setUser }) {

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username").min(3, "At least 3 characters"),
    password: yup.string().required("Must enter a password").min(3, "At least 3 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(r => {
        if (r.status === 201) return r.json()
        throw new Error('Login failed')
      })
      .then(d => {
        if (d.id) setUser(d.id)
      })
      .catch((error) => console.log(error));
    },
  });

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

  
  return (
    <Container textAlign='justified'>
      <Segment style={{ margin: 'auto' }} textAlign='center' basic padded compact>
        <h2>Login/Signup for Meal Planner</h2>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input name='username' placeholder='Username' onChange={formik.handleChange} value={formik.values.username} />
            <p style={{ color: "red" }}> {formik.errors.username}</p>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name='password' placeholder='Password' type='password' onChange={formik.handleChange}  value={formik.values.password}/>
            <p style={{ color: "red" }}> {formik.errors.password}</p>
          </Form.Field>
          <Button type='button' onClick={handleSignup}>Signup</Button>
          <Button type='button' onClick={formik.handleSubmit}>Login</Button>
        </Form>
      </Segment>
    </Container>
  )
}

export default Login

