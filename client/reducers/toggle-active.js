import { TOGGLE_ACTIVE } from '../actions/gyms-actions';

const initialState = {toggledGym: null, error: null, loaded: null };

export const toggleGymToActiveReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${TOGGLE_ACTIVE}_PENDING`:
      return initialState;
    case `${TOGGLE_ACTIVE}_FULFILLED`:
      return { toggledGym: action.payload, error: null, loaded: true};
    case `${TOGGLE_ACTIVE}_REJECTED`:
      return { toggledGym: null, error: action.payload, loaded: false};
    default:
      return state;
  }
};
