import React from 'react'
import { Item, Icon } from 'semantic-ui-react'

function Ingredient({ingredient}) {
  return (
    <Item>
      <Icon name='spoon' color='green' />
      <Item.Content verticalAlign='middle'>{ingredient.name}</Item.Content>
      <button className="ui icon button"><i aria-hidden="true" className="edit icon"></i></button>
    </Item>
  )
}

export default Ingredient

