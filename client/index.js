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
  black,
  orange500,
  orange600,
  orange700
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
   primary2Color: green600,
   primary3Color: grey600,
   accent1Color: orange500,
   accent2Color: orange600,
   accent3Color: orange700,
   textColor: fullWhite,
   secondaryTextColor: fade(fullWhite, 0.7),
   alternateTextColor: fullWhite,
   canvasColor: '#303030',
   borderColor: fade(grey600, 0.3),
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
