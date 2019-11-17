import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { App } from './app';
import AppRouter from './router';
import { mount } from 'enzyme';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('Routing switch verifications', () => {
  test('/ => App', () => {
    const wrapper = mount(
      <Router initialEntries={['/']}>
        <AppRouter />
      </Router>
    );
    expect(wrapper.find(App).length).toBe(1);
  });

  test('Automatic redirect to "/"', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    let globalLocation = { pathname: '' };
    render(
      <Router initialEntries={['/not-accepted-route']}>
        <AppRouter />
        <Route
          path="*"
          render={({ location }) => {
            globalLocation = location;
            return null;
          }}
        />
      </Router>,
      root
    );

    act(() => {
      // example: click a <Link> to /not-accepted-route
    });

    expect(globalLocation.pathname).toBe('/');
  });
});
