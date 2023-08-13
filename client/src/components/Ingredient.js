import React from 'react'
import { Button, Segment } from 'semantic-ui-react'

function Ingredient({ ingredient, onDelete }) {

  function handleDelete(id) {
    fetch('/api/ingredients', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id: id })
    }
    )
    onDelete(id);
  }

  return (
    <Segment padded>
        {ingredient.name}
        <Button compact floated='right' className="ui icon button" onClick={() => handleDelete(ingredient.id)}><i aria-hidden="true" className="trash icon"></i></Button>
    </Segment>
  )
}

export default Ingredient

