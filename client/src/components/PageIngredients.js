import React from 'react'
import { Item } from 'semantic-ui-react'
import Ingredient from './Ingredient';
import IngredientForm from './IngredientForm';


function PageIngredients() {
  return (<>
    <h2>Ingredients</h2>
    <Item.Group divided>
      <Ingredient />     
      <IngredientForm />
    </Item.Group>
  </>)
}

export default PageIngredients

