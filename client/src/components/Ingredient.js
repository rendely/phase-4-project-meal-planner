import React from 'react'
import { Button, Icon, Grid, Segment } from 'semantic-ui-react'

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
    <Grid.Column >
    <Segment padded>
       <Grid>
        <Grid.Column width={12}>
        {ingredient.name}
        </Grid.Column>
        <Grid.Column floated='right'>
        <Icon link name='trash' onClick={() => handleDelete(ingredient.id)} />
        </Grid.Column>
       </Grid>
        {/* <Button compact floated='right' className="ui icon button" onClick={() => handleDelete(ingredient.id)}><i aria-hidden="true" className="trash icon"></i></Button> */}
    </Segment>
    </Grid.Column>
  )
}

export default Ingredient

