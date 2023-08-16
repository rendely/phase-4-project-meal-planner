import { Dropdown, Table} from 'semantic-ui-react'


function MealPlanEntry({mealPlanEntry, allMealsDropdown}){

  const breakfastMeal = mealPlanEntry.meals.find(m => m.meal_type === 'breakfast');
  const breakfastId = breakfastMeal ? breakfastMeal.meal_id : '';
  const lunchMeal = mealPlanEntry.meals.find(m => m.meal_type === 'lunch');
  const lunchId = lunchMeal ? lunchMeal.meal_id : '';
  const dinnerMeal = mealPlanEntry.meals.find(m => m.meal_type === 'dinner');
  const dinnerId = dinnerMeal ? dinnerMeal.meal_id : '';
                                             
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
        value={breakfastId}
      />
    </Table.Cell>
    <Table.Cell>
    
    <Dropdown 
      fluid
      search
      selection 
      onChange={() => console.log('hi')}
      options={allMealsDropdown}
      placeholder='Choose meal'
      value={lunchId}
    />
  </Table.Cell>
  <Table.Cell>
    
    <Dropdown 
      fluid
      search
      selection 
      onChange={() => console.log('hi')}
      options={allMealsDropdown}
      placeholder='Choose meal'
      value={dinnerId}
    />
  </Table.Cell>
  </Table.Row>
  )
}

export default MealPlanEntry

