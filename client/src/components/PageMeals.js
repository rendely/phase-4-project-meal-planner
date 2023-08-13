import React, { useState, useEffect } from 'react'
import { Grid, Segment } from 'semantic-ui-react'

function PageMeals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('/api/meals')
      .then(r => r.json())
      .then(d => setMeals(d))
  }, [])

  return (
    <>
      <h2>Meals</h2>

      <Grid stackable columns={2}>
        {meals.map(m => (
          <Grid.Column key={m.id}>
            <Segment >
              {m.name}
              {m.ingredients.map(i => (<li key={i.id}>{i.name}</li>))}
            </Segment>
          </Grid.Column>
        )
        )}
      </Grid>
    </>
  )
}

export default PageMeals

