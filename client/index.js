import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import store from './reducers';
import GymSearch from './containers/GymSearch';
import routes from './routes';

injectTapEventPlugin();


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
