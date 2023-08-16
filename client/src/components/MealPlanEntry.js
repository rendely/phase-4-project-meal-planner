import { Dropdown, Table} from 'semantic-ui-react'


function MealPlanEntry({mealPlanEntry, allMealsDropdown}){

                         
  return (
    <Table.Row>
    <Table.Cell>
      {mealPlanEntry.date}
    </Table.Cell>
    <Table.Cell>
    
      <Dropdown 
        clearable
        fluid
        search
        selection 
        onChange={() => console.log('hi')}
        options={allMealsDropdown}
        placeholder='Choose meal'
        value={mealPlanEntry.breakfast_id}
      />
    </Table.Cell>
    <Table.Cell>
    
    <Dropdown 
      clearable
      fluid
      search
      selection 
      onChange={() => console.log('hi')}
      options={allMealsDropdown}
      placeholder='Choose meal'
      value={mealPlanEntry.lunch_id}
    />
  </Table.Cell>
  <Table.Cell>
    
    <Dropdown 
      clearable
      fluid
      search
      selection 
      onChange={() => console.log('hi')}
      options={allMealsDropdown}
      placeholder='Choose meal'
      value={mealPlanEntry.dinner_id}
    />
  </Table.Cell>
  </Table.Row>
  )
}

export default MealPlanEntry

