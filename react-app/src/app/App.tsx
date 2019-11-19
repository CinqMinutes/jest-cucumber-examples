import React from 'react';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CircularProgress } from 'material-ui';

const App: React.FC = () => (
  <MuiThemeProvider>
    <div className="perfect-middle">
      <CircularProgress size={180} thickness={5} />
    </div>
  </MuiThemeProvider>
);

export default App;
