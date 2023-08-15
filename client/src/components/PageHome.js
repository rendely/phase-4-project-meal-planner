import { Container, Table} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import MealPlanEntry from './MealPlanEntry';

function PageHome(){

  const [allMeals, setAllMeals] = useState([])

  useEffect(() => {
    fetch('/api/meals')
    .then(r => r.json())
    .then(d => setAllMeals(d))
  },[])

  const mealPlan = [
    {day: 'Monday', mealId: 2, mealName: 'Pasta'},
    {day: 'Tuesday', mealId: 2, mealName: 'Pasta'},
    {day: 'Wednesday', mealId: 2, mealName: 'Pasta'},
    {day: 'Thursday', mealId: 2, mealName: 'Pasta'},
    {day: 'Friday', mealId: 2, mealName: 'Pasta'},
    {day: 'Saturday', mealId: 2, mealName: 'Pasta'},
    {day: 'Sunday', mealId: 2, mealName: 'Pasta'},
  ]

  const allMealsDropdown = allMeals.map(m => ({key: m.id, text: m.name, value: m.id}))

  return (
    <Container text>
    <h2>Your meal plan</h2>
    <Table celled >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>
            Day
          </Table.HeaderCell>
          <Table.HeaderCell width={1}>
            Meal
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {mealPlan.map(m => <MealPlanEntry key={m.day} mealPlanEntry={m} allMealsDropdown={allMealsDropdown} /> )}
      </Table.Body>
    </Table>
    </Container>
  )
}

export default PageHome;