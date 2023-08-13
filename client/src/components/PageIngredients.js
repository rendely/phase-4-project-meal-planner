import React, { useEffect, useState } from 'react'
import { Item, Grid, Segment } from 'semantic-ui-react'
import Ingredient from './Ingredient';
import IngredientForm from './IngredientForm';


function PageIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('/api/ingredients')
      .then(r => r.json())
      .then(d => setIngredients(d))
  }, [])

  function handleAdd(newIngredient) {
    fetch('/api/ingredients', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIngredient)
    })
      .then(r => r.json())
      .then(d =>
        setIngredients(i => [...i, d]))
  }

  function handleDelete(id) {
    setIngredients(curr => curr.slice().filter(i => i.id !== id))
  }

  return (<>
    <h2>Ingredients</h2>
    <Grid stackable columns={3}>
      {ingredients.map(i =>
        <Grid.Column key={i.id}>
            <Ingredient ingredient={i} onDelete={handleDelete} />
        </Grid.Column>
      )}
      < IngredientForm onAdd={handleAdd} />
    </Grid>
  </>)
}

export default PageIngredients

