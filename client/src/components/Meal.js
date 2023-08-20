import { Button, Dropdown, Form, Grid, Card } from 'semantic-ui-react'
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';


function Meal({ meal, onAdd, onDelete, allIngredients, onRemoveMeal, onChangeName }) {

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
    name: yup.string().min(1,'At least 1 character').required()
  });

  const formik = useFormik({
    initialValues: {
      name: meal.name
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      onChangeName(meal.id, values.name);
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
                <Form.Input id='name' value={formik.values.name} onChange={formik.handleChange}>
                </Form.Input>
              </Form.Field>
              <p style={{color: 'red'}}>{formik.errors.name}</p>
            </Form>
            : <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{meal.name}</div>}
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