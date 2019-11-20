import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import AppRouter from '../router';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import { weather } from './__mocks__/sample.weather';
import { act } from 'react-dom/test-utils';

const feature = loadFeature('./src/meteo/meteo.feature');

defineFeature(feature, test => {
  let wrapper: ReactWrapper;
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(weather.result) })
    );
  test('Aller sur la page permet de saisir le lieu', ({ when, then }) => {
    when(/^Je vais sur la route '(.*)'$/, async url => {
      await act(async () => {
        wrapper = await mount(
          <Router initialEntries={[url]}>
            <AppRouter />
          </Router>
        );
      });
    });
    then(/^J'obtiens la '(.*)' météo '(.*)'$/, (nom, valeur) => {
      expect(wrapper.find(`#${nom}`)).toHaveLength(1);
      expect(wrapper.find(`#${nom}`).text()).toBe(valeur);
    });
  });
});
