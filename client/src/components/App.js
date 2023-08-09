import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from './Login';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function App() {
  const [user, setUser] = useState();
  if (!user) return <Login />;

  return (
    <Container>
      <NavBar />
      <Container segment>
      <Switch>
        <Route path='/ingredients'>
          Ingredients
        </Route>
        <Route path='/meals'>
          Meals
        </Route>
        <Route path='/logout'>
          Logout
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
