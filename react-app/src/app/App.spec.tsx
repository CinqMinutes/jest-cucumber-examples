import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import { CircularProgress } from 'material-ui';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Material UI', () => {
  test('Doit contenir le MuiThemeProvider', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(MuiThemeProvider).length).toBe(1);
  });

  test('Doit contenir un cercle de chargement au centre', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('.perfect-middle').length).toBe(1);
    expect(wrapper.find(CircularProgress).length).toBe(1);
    expect(wrapper.find(CircularProgress).prop('size')).toBe(180);
    expect(wrapper.find(CircularProgress).prop('thickness')).toBe(5);
  });
});
