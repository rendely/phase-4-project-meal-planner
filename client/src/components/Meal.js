import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

function Meal({meal}){
  return (
    <Grid.Column>
    <Segment >
      {meal.name}
      {meal.ingredients.map(i => (<li key={i.id}>{i.name}</li>))}
    </Segment>
  </Grid.Column>
  )
}

export default Meal

