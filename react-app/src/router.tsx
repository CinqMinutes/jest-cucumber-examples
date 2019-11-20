import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { App } from './app';
import { Meteo } from './meteo';

export default () => (
  <Switch>
    <Route exact path="/">
      <App />
    </Route>
    <Route path="/meteo">
      <Meteo />
    </Route>
    <Redirect to="/" />
  </Switch>
);
