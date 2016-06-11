import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise-middleware';

import reducers from './reducers';
import GymSearch from './containers/GymSearch';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {routes} 
  </Provider>,
  document.getElementById('container')
);
