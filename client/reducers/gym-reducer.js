import { FETCH_GYM } from '../actions/gyms-actions';

const initialState = { gym: null, error: null, loaded: false};

export const gymReducer = (state=initialState, action) => {
  switch (action.type) {
    case `${FETCH_GYM}_PENDING`:
      return initialState;
    case `${FETCH_GYM}_FULFILLED`:
      return { gym: action.payload, error: null, loaded: true};
    case `${FETCH_GYM}_REJECTED`:
      return { gym: null, error: action.payload, loaded: false};
    default:
    return state;
  }
};
