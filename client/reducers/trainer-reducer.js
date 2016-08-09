import { FETCH_TRAINERS } from '../actions/trainer-actions';

const initialState = { trainers: null, error: null, loading: null};

export const trainerReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_TRAINERS}_PENDING`:
      return initialState;
    case `${FETCH_TRAINERS}_FULFILLED`:
      return { trainers: action.payload, error: null, loading: true};
    case `${FETCH_TRAINERS}_REJECTED`:
      return { trainers: null, error: action.payload, loading: false};
    default:
      return state;
  }
};
