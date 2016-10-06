import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import store from './reducers';
import GymSearch from './containers/GymSearch';
import routes from './routes';

window.socket = io(); // TIP: io() with no args does auto-discovery
  socket.on('ferret', function(data) {

  });

  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    socket.emit('ferret', {"from": ""}, function (data) {
      console.log(data); // data will be 'woot'
    });
  });

 socket.emit('message', {});
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
