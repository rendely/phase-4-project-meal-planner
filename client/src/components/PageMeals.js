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

  function handleUpdate(updatedMeal){
    fetch(`/api/meals/${updatedMeal.id}`, {
      method: 'PATCH',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({'ingredients': updatedMeal.ingredients})
    })
    setMeals(curr => curr.map(m =>{
      if (m.id !== updatedMeal.id) return m 
      return updatedMeal
    }));
  }
  return (
    <>
      <h2>Meals</h2>

      <Grid stackable columns={3}>
        {meals.map(m =>
          <Meal key={m.id} meal={m} onUpdate={handleUpdate}/>
        )}
      </Grid>
    </>
  )
}

export default PageMeals

