import { Button, Container, Grid, Table } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import MealPlanEntry from './MealPlanEntry';

function PageHome() {

  const [allMeals, setAllMeals] = useState([])
  const [mealPlans, setMealPlans] = useState([])

  useEffect(() => {
    fetch('/api/meals')
      .then(r => r.json())
      .then(d => setAllMeals(d))
  }, [])

  useEffect(() => {
    fetch('api/meal_plans')
      .then(r => r.json())
      .then(d => setMealPlans(d))
  }, [])

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getWeekDates() {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilMonday = (currentDay + 6) % 7;

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysUntilMonday);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push(formatDate(date));
    }

    return weekDates;
  }

  const thisWeekDates = getWeekDates();
  const mealPlan = thisWeekDates.map(d => {
    const m = mealPlans.find(m => m.date === d);
    if (m) return m;
    return { date: d };
  })


  function handleChangeMealEntry(updatedMealEntry) {
    setMealPlans(curr => curr.map(m => (
      m.id === updatedMealEntry.id ? updatedMealEntry : m
    )))
  }

  function handleResetMealEntries(){
    fetch('/api/meal_plans', {method: 'DELETE'})
    setMealPlans([]);
  }

  if (!allMeals) return <div> Loading </div>

  const allMealsDropdown = allMeals.map(m => ({ key: m.id, text: m.name, value: m.id }))
  return (
    <Container text>
      <Grid>
        <Grid.Row>
          <Grid.Column width={11} verticalAlign="middle">
            <h2>Your meal plan</h2>
          </Grid.Column>
          <Grid.Column width={5} textAlign="right" verticalAlign="middle">
            <Button onClick={handleResetMealEntries}>Reset</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>
              Day
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
              Breakfast
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
              Lunch
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
              Dinner
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mealPlan.map(m =>
            <MealPlanEntry
              key={m.date}
              mealPlanEntry={m}
              allMealsDropdown={allMealsDropdown}
              onChangeMealEntry={handleChangeMealEntry}
            />
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default PageHome;