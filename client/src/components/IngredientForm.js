import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Item } from 'semantic-ui-react'

function IngredientForm({ onAdd }) {

  const formSchema = yup.object().shape({
    name: yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      onAdd(values)
    }
  });

  return (
    <Item>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field inline>
          <label>Add new:</label>
          <input name='name' placeholder='Ingredient name' onChange={formik.handleChange} value={formik.values.name} />
          <Button floated='right' type='submit'>Submit</Button>
        </Form.Field>
        <p style={{ color: 'red' }}>{formik.errors.name}</p>
      </Form>
    </Item>)
}

export default IngredientForm

