import { Container, Segment, Form, Button } from 'semantic-ui-react'
import { useFormik } from "formik";
import { useState } from 'react'
import * as yup from "yup";

function Signup({ setUser }) {

  const [errors, setErrors] = useState('');

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username").min(3, "At least 3 characters"),
    password: yup.string().required("Must enter a password").min(3, "At least 3 characters"),
    confirm_password: yup.string()
      .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
      })
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(r => {
        if (r.status === 201) return r.json()
        setErrors('Invalid signup')
        throw new Error('Signup failed')
      })
        .then(d => {
          if (d.id) setUser(d.id)
        })
        .catch((error) => console.log(error));
    },
  });


  return (
    <Container textAlign='justified'>
      <Segment style={{ margin: 'auto' }} textAlign='center' basic padded compact>
        <h2>Signup for Meal Planner</h2>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input name='username' placeholder='Username' onChange={formik.handleChange} value={formik.values.username} />
            <p style={{ color: "red" }}> {formik.errors.username}</p>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name='password' placeholder='Password' type='password' onChange={formik.handleChange} value={formik.values.password} />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input name='confirm_password' placeholder='Password' type='password' onChange={formik.handleChange} value={formik.values.confirm_password} />
            <p style={{ color: "red" }}> {formik.errors.confirm_password}</p>
          </Form.Field>
          <Button type='button' onClick={formik.handleSubmit}>Signup</Button>
        </Form>
        <p style={{ color: 'red' }}>{errors}</p>
      </Segment>
    </Container>
  )
}

export default Signup;