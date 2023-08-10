import React from 'react'
import { Button, Form, Item } from 'semantic-ui-react'

function IngredientForm() {
  return (
    <Item>
      <Form>
        <Form.Field inline>
          <label>Add new:</label>
            <input placeholder='Ingredient name' />
          <Button floated='right' type='submit'>Submit</Button>
        </Form.Field>
      </Form>
    </Item>)
}

export default IngredientForm

