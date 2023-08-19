import { Dropdown, Table} from 'semantic-ui-react'


function MealPlanEntry({mealPlanEntry, allMealsDropdown, onChangeMealEntry}){

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = weekDays[(new Date(`${mealPlanEntry.date} `).getDay())];

  function handleChange(e,d, meal_type){
    const payload = {
      meal_plan_id:mealPlanEntry.id, 
      date: mealPlanEntry.date, 
      [meal_type]: d.value};

    onChangeMealEntry(payload);

    fetch('/api/meal_plans', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(d => onChangeMealEntry(d));

  }
                         
  return (
    <Table.Row>
    <Table.Cell>
      <div>{day}</div>
      <div style={{color: 'gray', fontSize: '0.9rem'}}>{mealPlanEntry.date}</div>
    </Table.Cell>

    {['breakfast_id', 'lunch_id', 'dinner_id'].map(meal_type => 
      (
       <Table.Cell key={meal_type}>    
       <Dropdown 
         clearable
         closeOnChange
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

