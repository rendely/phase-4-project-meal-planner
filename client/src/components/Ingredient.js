import React from 'react'
import { Item, Icon } from 'semantic-ui-react'

function Ingredient() {
  return (
    <Item>
      <Icon name='spoon' color='green' />
      <Item.Content verticalAlign='middle'>Content A</Item.Content>
      <button className="ui icon button"><i aria-hidden="true" className="edit icon"></i></button>
    </Item>
  )
}

export default Ingredient

