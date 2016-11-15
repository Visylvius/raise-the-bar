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
  purple600
} from 'material-ui/styles/colors';

import store from './reducers';
import GymSearch from './containers/GymSearch';
import routes from './routes';

injectTapEventPlugin();

// const customTheme = {
//   spacing: spacing,
//   fontFamily: 'Roboto, sans-serif',
//   palette: {
//    primary1Color: cyan700,
//    primary2Color: cyan700,
//    primary3Color: grey600,
//    accent1Color: pinkA200,
//    accent2Color: pinkA400,
//    accent3Color: pinkA100,
//    textColor: fullWhite,
//    secondaryTextColor: fade(fullWhite, 0.7),
//    alternateTextColor: '#303030',
//    canvasColor: '#303030',
//    borderColor: fade(fullWhite, 0.3),
//    disabledColor: fade(fullWhite, 0.3),
//    pickerHeaderColor: fade(fullWhite, 0.12),
//    clockCircleColor: fade(fullWhite, 0.12),
//   },
// };

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      {routes}
    </Provider>
  </MuiThemeProvider>
);



ReactDOM.render(
  <App />,
  document.getElementById('container')
);
