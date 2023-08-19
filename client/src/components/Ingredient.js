import { Icon, Grid, Card } from 'semantic-ui-react'

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
    <Grid.Column style={{padding: '5px'}} >
      <Card padded>
        <Card.Content style={{padding: '3px'}}>
          <Grid >
            <Grid.Column  width={12}>
              {ingredient.name}
            </Grid.Column>
            <Grid.Column width={2}>
              <Icon link name='trash' onClick={() => handleDelete(ingredient.id)} />
            </Grid.Column>
          </Grid>
        </Card.Content>

      </Card>
    </Grid.Column>
  )
}

export default Ingredient;