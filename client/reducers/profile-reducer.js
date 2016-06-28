import { FETCH_ATHLETE } from '../actions/athlete-actions';

const initialState = { athlete: null, error: null, loaded: false };

export const profileReducer = (state=initialState, action) => {
  switch (action.type) {
    case `${FETCH_ATHLETE}_FULFILLED`:
      return {
        athlete: action.payload,
        error: null,
        loaded: true
      };
    case `${FETCH_ATHLETE}_PENDING`:
      return {
        athlete: null,
        error: null,
        loaded: false
      };
    case `${FETCH_ATHLETE}_REJECTED`:
      return {
        athlete: null,
        error: action.payload,
        loaded: false
      };
    default:
      return state;
  }
};
