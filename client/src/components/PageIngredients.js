import { Item, Grid, Segment } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
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

  function alphaSort(a,b){
    return a.name.localeCompare(b.name)
  }

  return (<>
    <h2>Ingredients</h2>
      < IngredientForm onAdd={handleAdd} />
    <Grid stackable doubling columns={4}>
      {ingredients.sort(alphaSort).map(i =>
        <Ingredient key={i.id} ingredient={i} onDelete={handleDelete} />
      )}
    </Grid>
  </>)
}

export default PageIngredients;