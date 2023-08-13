import React from 'react'
import {Form, Segment} from 'semantic-ui-react'

function MealForm(){
  return (
  <Segment>
  <Form>
    <Form.Field>
    <label>Meal name:</label>
    <Form.Input />
    </Form.Field>
    <Form.Button type='submit'>Add meal</Form.Button>
  </Form>
  </Segment>
  )
}

export default MealForm

