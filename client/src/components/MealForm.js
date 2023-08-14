import React from 'react'
import {Form, Segment} from 'semantic-ui-react'

function MealForm(){
  return (
  <Segment>
  <Form>
    <Form.Field>
    <label aria-label='meal name'></label>
    <Form.Input placeholder='Meal name' type='text' />
    </Form.Field>
    <Form.Button type='submit'>Add meal</Form.Button>
  </Form>
  </Segment>
  )
}

export default MealForm

