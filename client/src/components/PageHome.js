import { Container, Table } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import MealPlanEntry from './MealPlanEntry';

function PageHome() {

  const [allMeals, setAllMeals] = useState()

  useEffect(() => {
    fetch('/api/meals')
      .then(r => r.json())
      .then(d => setAllMeals(d))
  }, [])

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDateWithDay(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayName = daysOfWeek[date.getDay()];
    return `${year}-${month}-${day} ${dayName}`;
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
      weekDates.push(formatDateWithDay(date));
    }

    return weekDates;
  }

  const thisWeekDates = getWeekDates();

  const mealPlan = thisWeekDates.map(d => ({
    day: d,
    dayOfWeek: d.slice(10),
    breakfast_id: 1,
    lunch_id: null,
    dinner_id: 3}));
    
  if (!allMeals) return <div> Loading </div>
  const allMealsDropdown = allMeals.map(m => ({ key: m.id, text: m.name, value: m.id }))
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
          {mealPlan.map(m => <MealPlanEntry key={m.day} mealPlanEntry={m} allMealsDropdown={allMealsDropdown} />)}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default PageHome;