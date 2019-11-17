import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { App } from './app';
import AppRouter from './router';
import { mount } from 'enzyme';

describe('Routing switch verifications', () => {
  test('/ => App', () => {
    const wrapper = mount(
      <Router initialEntries={['/']}>
        <AppRouter />
      </Router>
    );
    expect(wrapper.find(App).length).toBe(1);
  });
});
