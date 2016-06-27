import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { gymsReducer } from './gyms-reducer';
import { athleteReducer } from './athlete-reducer';
import { cropReducer } from './crop-reducer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise(), ReduxThunk, createLogger())(createStore);

const rootReducer = combineReducers({
  gyms: gymsReducer,
  form: formReducer,
  athletes: athleteReducer,
  crop: cropReducer
});

export default createStoreWithMiddleware(rootReducer);
