import React, { useState, useEffect } from 'react'
import { Dropdown, Grid, Segment } from 'semantic-ui-react'

function Meal({ meal, onAdd, onDelete }) {

  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    fetch('/api/ingredients')
      .then(r => r.json())
      .then(d => setAllIngredients(d))
  }, [])

  function handleChange(e, d) {
    if (d.value.length > meal.ingredients.length) {
      const ingredientNames = meal.ingredients.map(mi => mi.name);
      const addedIngredientName = d.value.find(name => !ingredientNames.includes(name));
      const addedIngredient = allIngredients.find(ingredient => ingredient.name === addedIngredientName);

      if (addedIngredient) {
        onAdd(meal, addedIngredient);
      }
    }
    if (d.value.length < meal.ingredients.length) {

      const updatedIngredient = meal.ingredients.filter(i => !d.value.includes(i.name))[0];
      onDelete(meal, updatedIngredient );
    }
  }

  return (
    <Grid.Column>
      {/* TODO: Use additions to add ingredients on the fly
      https://react.semantic-ui.com/modules/dropdown/#usage-multiple-allow-additions
       */}
      <Segment >
        <h3>{meal.name}</h3>
        <Dropdown
          placeholder='Ingredient'
          fluid
          multiple
          search
          selection
          onChange={handleChange}
          options={allIngredients.map((i) => ({ key: i.id, value: i.name, text: i.name }))}
          value={meal.ingredients.map((i) => (i.name)).sort()}
        />
      </Segment>
    </Grid.Column>
  )
}

export default Meal

