import { TOGGLE_ACTIVE } from '../actions/gyms-actions';

const initialState = {toggledGym: null, error: null, loading: null };

export const toggleGymToActiveReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${TOGGLE_ACTIVE}_PENDING`:
      return initialState;
    case `${TOGGLE_ACTIVE}_FULFILLED`:
      return { toggledGym: action.payload, error: null, loading: true};
    case `${TOGGLE_ACTIVE}_REJECTED`:
      return { toggledGym: null, error: action.payload, loading: false};
    default:
      return state;
  }
};
