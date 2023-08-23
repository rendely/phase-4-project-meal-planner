import { Grid } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import Meal from '../components/Meal';
import MealForm from '../components/MealForm';

function PageMeals() {

  const [meals, setMeals] = useState([]);

  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    fetch('/api/ingredients')
      .then(r => r.json())
      .then(d => setAllIngredients(d))
  }, [])

  useEffect(() => {
    fetch('/api/meals')
      .then(r => r.json())
      .then(d => setMeals(d))
  }, [])

  function handleDelete(meal, ingredient) {
    const meal_id = meal.id;
    const ingredient_id = ingredient.id;
    fetch(`/api/meals/${meal_id}/ingredients/${ingredient_id}`, {
      method: 'DELETE',
    })
      .then(r => {
        if (r.status === 200) {
          const updatedIngredients = meal.ingredients.filter(i => i.id !== ingredient_id);
          const updatedMeal = { ...meal, ingredients: updatedIngredients }
          setMeals(curr => curr.map(m =>
            (m.id === updatedMeal.id ? updatedMeal : m)
          ))
        }
      });
  }

  function handleChangeName(id, newName){
    fetch(`/api/meals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name: newName })
    })
    .then(r => r.json())
    .then(updatedMeal => {
      setMeals(curr => curr.map(m => (m.id ===updatedMeal.id ? updatedMeal : m)))
    })
  }

  function handleAdd(meal, ingredient) {
    const meal_id = meal.id;
    const ingredient_id = ingredient.id;
    fetch(`/api/meals/${meal_id}/ingredients/1`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ ingredient_id: ingredient_id })
    })
      .then(r => r.json())
      .then(d => setMeals(curr => curr.map(m =>
        m.id === d.id ? d : m)))
  }

  function handleAddMeal(newMeal) {
    setMeals(curr => [...curr, newMeal])
  }
  function handleRemoveMeal(meal) {
    fetch(`/api/meals/${meal.id}`, { method: 'DELETE' })
      .then(r => {
        if (r.status !== 200) return 'Error'
        setMeals(curr => curr.filter(m => m.id !== meal.id))
      })
  }

  return (
    <>
      <h2>Meals</h2>
      <Grid stackable doubling columns={3}>
        {meals.map(m =>
          <Meal 
            key={m.id} 
            meal={m} 
            onChangeName={handleChangeName}
            onAdd={handleAdd} 
            onDelete={handleDelete} 
            allIngredients={allIngredients} 
            onRemoveMeal={handleRemoveMeal} />
        )}
        <Grid.Column>
          <MealForm onAdd={handleAddMeal} />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default PageMeals;