import React from 'react'
import { Item, Button, Icon } from 'semantic-ui-react'
function PageIngredients() {
  return (<>
    <h2>Ingredients</h2>
    <Item.Group divided>
      <Item>
        <Icon name='spoon' color='green'/>
        <Item.Content verticalAlign='middle'>Content A</Item.Content>
        <button class="ui icon button"><i aria-hidden="true" class="edit icon"></i></button>
      </Item>
      
    </Item.Group>
  </>)
}

export default PageIngredients

