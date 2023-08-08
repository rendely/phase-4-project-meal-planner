import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from './Login';
import NavBar from './NavBar';


function App() {
  const [user, setUser] = useState(1);
  if (!user) return <Login />;

  return (
    <>
      <NavBar />
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
    </>
  )

}

export default App;
