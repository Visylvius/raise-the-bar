import { combineReducers } from 'redux';

import { gymsReducer } from './gyms-reducer';

export default combineReducers({
  gyms: gymsReducer
});
