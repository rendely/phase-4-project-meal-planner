import React from 'react'
import { Item, Icon } from 'semantic-ui-react'

function Ingredient({ingredient, onDelete}) {

  function handleDelete(id){
    fetch('/api/ingredients', {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
    body: JSON.stringify({id: id})
    }
    )
    onDelete(id);
  }

  return (
    <Item>
      <Icon name='arrow right' color='green' />
      <Item.Content verticalAlign='middle'>{ingredient.name}</Item.Content>
      <button className="ui icon button" onClick={() => handleDelete(ingredient.id)}><i aria-hidden="true" className="trash icon"></i></button>
    </Item>
  )
}

export default Ingredient

