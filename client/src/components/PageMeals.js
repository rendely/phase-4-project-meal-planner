import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import Meal from './Meal';

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
        {meals.map(m =>
          <Meal key={m.id} meal={m} />
        )}
      </Grid>
    </>
  )
}

export default PageMeals

