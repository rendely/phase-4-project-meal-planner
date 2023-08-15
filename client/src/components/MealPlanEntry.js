import { Dropdown, Table} from 'semantic-ui-react'
import {useState} from 'react'

function MealPlanEntry({mealPlanEntry, allMealsDropdown}){

  return (
    <Table.Row>
    <Table.Cell>
      {mealPlanEntry.day}
    </Table.Cell>
    <Table.Cell>
    
      <Dropdown 
        fluid
        search
        selection 
        onChange={() => console.log('hi')}
        options={allMealsDropdown}
        placeholder='Choose meal'
      />
    </Table.Cell>
  </Table.Row>
  )
}

export default MealPlanEntry

