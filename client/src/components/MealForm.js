import { Form, Card } from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as yup from 'yup';

function MealForm({ onAdd }) {

  const formSchema = yup.object().shape({
    name: yup.string().min(1,'At least 1 character').required(),
    time: yup.number().typeError('must be number').positive().integer('must be an integer').notRequired()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      time: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/api/meals', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values)
      })
        .then(r => r.json())
        .then(d => {onAdd(d); formik.handleReset();});
    }
  });

  return (
    <Card fluid><Card.Content>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label aria-label='meal name'></label>
          <Form.Input id='name' onChange={formik.handleChange} placeholder='Meal name' type='text' value={formik.values.name} />
        </Form.Field>
        <Form.Field>
          <label aria-label='meal time'></label>
          <Form.Input id='time' onChange={formik.handleChange} placeholder = 'time in minutes' type='text' value={formik.values.time} />
        </Form.Field>
        <Form.Button type='submit'>Add meal</Form.Button>
      </Form>
      <p style={{color: 'red'}}>{formik.errors.name}</p>
      <p style={{color: 'red'}}>{formik.errors.time}</p>
      
      </Card.Content>
    </Card>
  )
}

export default MealForm;