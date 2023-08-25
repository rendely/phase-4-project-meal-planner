import { Button, Dropdown, Form, Grid, Card } from 'semantic-ui-react'
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';


function Meal({ meal, onAdd, onDelete, allIngredients, onRemoveMeal, onUpdateMeal }) {

  const [isEditName, setIsEditName] = useState(false);

  function handleChange(e, d) {

    if (d.value.length > meal.ingredients.length) {
      const ingredientNames = meal.ingredients.map(mi => mi.name);
      const addedIngredientName = d.value.find(name => !ingredientNames.includes(name));
      const addedIngredient = allIngredients.find(ingredient => ingredient.name === addedIngredientName);

      if (addedIngredient) {
        onAdd(meal, addedIngredient);
      }
    }
    if (d.value.length < meal.ingredients.length) {

      const updatedIngredient = meal.ingredients.find(i => !d.value.includes(i.name));
      onDelete(meal, updatedIngredient);
    }
  }
  const formSchema = yup.object().shape({
    name: yup.string().min(1, 'At least 1 character').required(),
    time: yup.number().typeError('must be number').positive().integer('must be an integer').notRequired()
  });

  const formik = useFormik({
    initialValues: {
      name: meal.name,
      time: meal.time || ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      onUpdateMeal(meal.id, values);
      setIsEditName(false);
    }
  });

  return (
    <Grid.Column>
      {/* TODO: Use additions to add ingredients on the fly
      https://react.semantic-ui.com/modules/dropdown/#usage-multiple-allow-additions
       */}
      <Card fluid><Card.Content>
        {isEditName ?
          <Form>
            <Form.Field>
              <label aria-label='meal name'>Name</label>
              <Form.Input id='name' value={formik.values.name} onChange={formik.handleChange}>
              </Form.Input>
              <label aria-label='meal time'>Time</label>
              <Form.Input id='time' value={formik.values.time} onChange={formik.handleChange}>
              </Form.Input>
            </Form.Field>
            <p style={{ color: 'red' }}>{formik.errors.name}</p>
            <p style={{ color: 'red' }}>{formik.errors.time}</p>
          </Form>
          :
          <>
            <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{meal.name}</div>
            {meal.time ? <div style={{ color: 'gray', fontSize: '0.9rem' }}>Cook time: {meal.time} mins</div> : null}
          </>
        }
        <br></br>
        <Dropdown
          placeholder='Ingredient'
          fluid
          multiple
          search
          selection
          onChange={handleChange}
          options={allIngredients.map((i) => ({ key: i.id, value: i.name, text: i.name }))}
          value={meal.ingredients.map((i) => (i.name)).sort()}
        />
      </Card.Content>
        {
          isEditName ?
            <Button onClick={formik.handleSubmit}>Save</Button>
            :
            <Button.Group fluid attached='bottom'>
              <Button basic attached='bottom' onClick={() => setIsEditName(curr => !curr)}>Edit</Button>
              <Button basic attached='bottom' onClick={() => onRemoveMeal(meal)}>Delete</Button>
            </Button.Group>
        }
      </Card>
    </Grid.Column>
  )
}

export default Meal;