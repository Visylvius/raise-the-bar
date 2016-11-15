import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import {fade} from 'material-ui/utils/colorManipulator';
import {
  green600,
  green500,
  purple600,
  purpleA200,
  purpleA400,
  purpleA100,
  grey600,
  fullWhite,
  black
} from 'material-ui/styles/colors';

import store from './reducers';
import GymSearch from './containers/GymSearch';
import routes from './routes';

injectTapEventPlugin();

const customTheme = {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
   primary1Color: green600,
   primary2Color: green500,
   primary3Color: grey600,
   accent1Color: purpleA200,
   accent2Color: purpleA400,
   accent3Color: purpleA100,
   textColor: grey600,
   secondaryTextColor: fade(purpleA200, 0.7),
   alternateTextColor: '#fff',
   canvasColor: '#000000',
   borderColor: fade(fullWhite, 0.3),
   disabledColor: fade(fullWhite, 0.3),
   pickerHeaderColor: fade(fullWhite, 0.12),
   clockCircleColor: fade(fullWhite, 0.12),
  },
};

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
    <Provider store={store}>
      {routes}
    </Provider>
  </MuiThemeProvider>
);



ReactDOM.render(
  <App />,
  document.getElementById('container')
);
