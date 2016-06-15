import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import { gymsReducer } from './gyms-reducer';
import { athleteReducer } from './athlete-reducer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise(), createLogger())(createStore);

const rootReducer = combineReducers({
  gyms: gymsReducer,
  form: formReducer,
  athletes: athleteReducer
});

export default createStoreWithMiddleware(rootReducer);
