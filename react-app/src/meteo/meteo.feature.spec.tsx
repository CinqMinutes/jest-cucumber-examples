import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import AppRouter from '../router';
import { mount, ReactWrapper } from 'enzyme';

import { MemoryRouter as Router } from 'react-router-dom';

const feature = loadFeature('./src/meteo/meteo.feature');

defineFeature(feature, test => {
  let wrapper: ReactWrapper;
  test('Aller sur la page permet de saisir le lieu', ({ when, then }) => {
    when(/^Je vais sur la route '(.*)'$/, url => {
      wrapper = mount(
        <Router initialEntries={[url]}>
          <AppRouter />
        </Router>
      );
    });
    then(/^J'obtiens la '(.*)' météo '(.*)'$/, (nom, valeur) => {
      expect(wrapper.find(`#${nom}`)).toHaveLength(1);
      expect(wrapper.find(`#${nom}`).text()).toBe(valeur);
    });
  });
});
