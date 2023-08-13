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

  function handleDelete(meal, ingredient) {
    const meal_id = meal.id;
    const ingredient_id = ingredient.id;
    fetch(`/api/meals/${meal_id}/ingredients/${ingredient_id}`, {
      method: 'DELETE',
    })
      .then(r => {
        if (r.status === 200) {
          const updatedIngredients = meal.ingredients.filter(i => i.id !== ingredient_id);
          const updatedMeal = { ...meal, ingredients: updatedIngredients }
          setMeals(curr => curr.map(m =>
            (m.id === updatedMeal.id ? updatedMeal : m)
          ))
        }
      });
  }

  function handleAdd(meal, ingredient) {
    const meal_id = meal.id;
    const ingredient_id = ingredient.id;
    fetch(`/api/meals/${meal_id}/ingredients/1`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ingredient_id: ingredient_id})
    })
    .then(r => r.json())
    .then(d => setMeals(curr => curr.map(m => 
      m.id === d.id ? d : m)))
  }

  return (
    <>
      <h2>Meals</h2>

      <Grid stackable columns={3}>
        {meals.map(m =>
          <Meal key={m.id} meal={m} onAdd={handleAdd} onDelete={handleDelete} />
        )}
      </Grid>
    </>
  )
}

export default PageMeals

