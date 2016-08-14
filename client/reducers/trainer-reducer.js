import { FETCH_TRAINER } from '../actions/trainer-actions';

const initialState = { trainer: null, error: null, loading: null};

export const trainerReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_TRAINER}_PENDING`:
      return initialState;
    case `${FETCH_TRAINER}_FULFILLED`:
      return { trainer: action.payload, error: null, loading: true};
    case `${FETCH_TRAINER}_REJECTED`:
      return { trainer: null, error: action.payload, loading: false};
    default:
      return state;
  }
};
