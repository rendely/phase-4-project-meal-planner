import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from './Login';
import NavBar from './NavBar';
import PageIngredients from './PageIngredients';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('/api/check_session')
    .then(r=>r.json())
    .then(d=> setUser(d.id))
  },[])

  if (!user) return <Login setUser={setUser}/>;

  function handleLogout(e){
    console.log('logging out');
    fetch('/api/logout', {method: 'DELETE'})
    setUser(null);
  }

  return (
    <Container>
      <NavBar onLogout={handleLogout}/>
      <Container>
      <Switch>
        <Route path='/ingredients'>
          <PageIngredients />
        </Route>
        <Route path='/meals'>
          Meals
        </Route>      
        <Route path='/'>
          Home
        </Route>
      </Switch>
      </Container>
    </Container>
  )

}

export default App;
