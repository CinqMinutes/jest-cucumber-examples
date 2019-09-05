import App from './app';
import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

export default () => (
  <Switch>
    <Route exact path="/" render={() => <App />} />
    <Redirect to="/" />
  </Switch>
);
