import React, {useState, useEffect} from 'react'

function PageMeals(){
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('/api/meals')
    .then(r => r.json())
    .then(d => setMeals(d))
  }, [])

  return (
  <>
  <h2>Meals</h2>
  {meals.map(m => (
    <div key={m.id}>{m.name} {m.ingredients.map(i => (<li>{i.name}</li>))}</div>)
  )}
  </>
  )
}

export default PageMeals

