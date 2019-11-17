import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { App } from './app';

export default () => (
  <Switch>
    <Route exact path="/">
      <App />
    </Route>
    <Redirect to="/" />
  </Switch>
);
