import React from 'react';
import { Route, Switch } from "react-router-dom";

import { useAuth } from './context'
import { Login, Signup, Dashboard } from './view';

function App() {
  const { currentUser } = useAuth();

  return (
    <Switch>
      <Route path="/signup"><Signup/></Route>
      <Route path="/">{currentUser ? <Dashboard/> : <Login/>}</Route>
    </Switch>
  );
}

export default App;
