import { Icon, Grid, Card, Transition } from 'semantic-ui-react'

function Ingredient({ ingredient, onDelete, showTransition }) {

  function handleDelete(id) {
    fetch('/api/ingredients/'+id, {method: 'DELETE'}
    )
    onDelete(id);
  }

  return (
    <Grid.Column style={{padding: '5px'}} >
      <Transition transitionOnMount={showTransition} animation='glow' duration={5000}>
      <Card>
        <Card.Content style={{padding: '3px'}}>
          <Grid >
            <Grid.Column  width={12}>
              {ingredient.name}
            </Grid.Column>
            <Grid.Column textAlign={'right'} width={2}>
              <Icon link name='trash' onClick={() => handleDelete(ingredient.id)} />
            </Grid.Column>
          </Grid>
        </Card.Content>

      </Card>
      </Transition>
    </Grid.Column>
  )
}

export default Ingredient;