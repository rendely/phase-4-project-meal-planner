import { Container, Loader } from 'semantic-ui-react'
import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from './pages/Auth';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import Meals from './pages/Meals';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/check_session')
      .then(r => r.json())
      .then(d => {setUser(d.id); setIsLoading(false);})
  }, [])

  if (isLoading) return <Loader />;
  if (!user) return <Auth setUser={setUser} />;

  function handleLogout(e) {
    fetch('/api/logout', { method: 'DELETE' })
    setUser(null);
  }

  return (
    <Container>
      <NavBar onLogout={handleLogout} />
      <Container>
        <Switch>
          <Route path='/ingredients'>
            <Ingredients />
          </Route>
          <Route path='/meals'>
            <Meals />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </Container>
  )
}

export default App;