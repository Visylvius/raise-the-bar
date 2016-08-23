import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client'

import store from './reducers';
import GymSearch from './containers/GymSearch';
import routes from './routes';

var socket = io(); // TIP: io() with no args does auto-discovery
  socket.on('ferret', function(data, reply) {
    console.log(data, 'data');
    if (reply) {
      reply('yo dawg im da client');
    }
  });

  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    socket.emit('ferret', {"from": ""}, function (data) {
      console.log(data); // data will be 'woot'
    });
  });

 socket.emit('bimbo', 'thing');



ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('container')
);
