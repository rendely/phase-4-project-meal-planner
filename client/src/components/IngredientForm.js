import React from 'react'
import { Button, Form, Item } from 'semantic-ui-react'

function IngredientForm({onAdd}) {

  function handleAdd(e){
    e.preventDefault();
    onAdd({id: 10, name: e.target.name.value});
  }

  return (
    <Item>
      <Form onSubmit={handleAdd}>
        <Form.Field inline>
          <label>Add new:</label>
            <input name='name' placeholder='Ingredient name' />
          <Button floated='right' type='submit'>Submit</Button>
        </Form.Field>
      </Form>
    </Item>)
}

export default IngredientForm

