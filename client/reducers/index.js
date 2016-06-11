import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { gymsReducer } from './gyms-reducer';

export default combineReducers({
  gyms: gymsReducer,
  form: formReducer
});
