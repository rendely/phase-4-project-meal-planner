import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as yup from 'yup';

function IngredientForm({ onAdd }) {

  const formSchema = yup.object().shape({
    name: yup.string().min(1, 'At least 1 character').required()
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      onAdd(values);
      formik.resetForm();
    }
  });

  return (
      <Form onSubmit={formik.handleSubmit} style={{marginBottom: '30px'}}>
        <Form.Field inline>
          <label>Add new:</label>
          <input name='name' placeholder='Ingredient name' onChange={formik.handleChange} value={formik.values.name} />
          <Button type='submit' style={{marginLeft: '20px'}}>Add</Button>
        </Form.Field>
        <p style={{ color: 'red' }}>{formik.errors.name}</p>
      </Form>
  )
}

export default IngredientForm;