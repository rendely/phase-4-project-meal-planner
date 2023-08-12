import React, {useEffect, useState} from 'react'
import { Item } from 'semantic-ui-react'
import Ingredient from './Ingredient';
import IngredientForm from './IngredientForm';


function PageIngredients() {
  const [ingredients, setIngredients] = useState([{id: 1, name: 'pasta'}]);

  useEffect(() => {
    fetch('/api/ingredients')
    .then(r => r.json())
    .then(d => setIngredients(d))
  }, [])

  function handleAdd(newIngredient){
    fetch('/api/ingredients', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIngredient)
    })
    .then(r => r.json())
    .then(d => 
    setIngredients(i => [...i,d]) )
  }

  function handleDelete(id){
    setIngredients(curr => curr.slice().filter(i => i.id !== id))
  }

  return (<>
    <h2>Ingredients</h2>
    <Item.Group divided>
      {ingredients.map(i =>
        <Ingredient key={i.id} ingredient={i} onDelete={handleDelete} />
      )}
      < IngredientForm onAdd={handleAdd} />
    </Item.Group>
  </>)
}

export default PageIngredients

