import { SAVE_GYM } from '../actions/gyms-actions';

const initialState = {savedGym: null, error: null, loading: null };

export const saveGymReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${SAVE_GYM}_PENDING`:
      return initialState;
    case `${SAVE_GYM}_FULFILLED`:
      return { savedGym: action.payload, error: null, loading: true};
    case `${SAVE_GYM}_REJECTED`:
      return { savedGym: null, error: action.payload, loading: false};
    default:
      return state;
  }
};
