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
  console.log(ingredients);

  return (<>
    <h2>Ingredients</h2>
    <Item.Group divided>
      {ingredients.map(i =>
        <Ingredient key={i.id} ingredient={i} />
      )}
      < IngredientForm />
    </Item.Group>
  </>)
}

export default PageIngredients

