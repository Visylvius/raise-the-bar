import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import { gymsReducer } from './gyms-reducer';
import { gymReducer } from './gym-reducer';
import { athleteReducer } from './athlete-reducer';
import { cropReducer } from './crop-reducer';
import { profileReducer } from './profile-reducer';
import { trainersReducer } from './trainers-reducer';
import { trainerReducer } from './trainer-reducer';
import { inboxReducer } from './inbox-reducer';
import { messageReducer } from './message-reducer';
import { userReducer } from './user-reducer';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise(), ReduxThunk, createLogger())(createStore);

const rootReducer = combineReducers({
  gyms: gymsReducer,
  gym: gymReducer,
  form: formReducer,
  athletes: athleteReducer,
  inbox: inboxReducer,
  profile: profileReducer,
  trainers: trainersReducer,
  trainer: trainerReducer,
  message: messageReducer,
  crop: cropReducer,
  user: userReducer
});

export default createStoreWithMiddleware(rootReducer);
