import { Dropdown, Table} from 'semantic-ui-react'


function MealPlanEntry({mealPlanEntry, allMealsDropdown}){
//   {
//     "day": "2023-08-16 Wednesday",
//     "dayOfWeek": " Wednesday",
//     "meals": [
//         {
//             "meal_type": "breakfast",
//             "meal_id": 1
//         },
//         {
//             "meal_type": "lunch",
//             "meal_id": 1
//         },
//         {
//             "meal_type": "dinner",
//             "meal_id": 1
//         }
//     ]
// }
  const breakfastId = mealPlanEntry.meals
                        .filter(m => m.meal_type === 'breakfast')
                        [0]['meal_id'];
  const lunchId = mealPlanEntry.meals
                        .filter(m => m.meal_type === 'lunch')
                        [0]['meal_id'];                        
  const dinnerId = mealPlanEntry.meals
                        .filter(m => m.meal_type === 'dinner')
                        [0]['meal_id'];       
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

