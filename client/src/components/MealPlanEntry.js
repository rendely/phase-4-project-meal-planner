import { Dropdown, Table} from 'semantic-ui-react'


function MealPlanEntry({mealPlanEntry, allMealsDropdown}){

  function handleChange(e,d, meal_type){
    console.log({
      meal_plan_id:mealPlanEntry.id, 
      date: mealPlanEntry.date, 
      [meal_type]: d.value})
  }
                         
  return (
    <Table.Row>
    <Table.Cell>
      {mealPlanEntry.date}
    </Table.Cell>

    {['breakfast_id', 'lunch_id', 'dinner_id'].map(meal_type => 
      (
       <Table.Cell key={meal_type}>    
       <Dropdown 
         clearable
         fluid
         search
         selection 
         onChange={(e,d) => handleChange(e,d,meal_type)}
         options={allMealsDropdown}
         placeholder='Choose meal'
         value={mealPlanEntry[meal_type]}
       />
     </Table.Cell>
      )
    )}
  </Table.Row>
  )
}

export default MealPlanEntry

