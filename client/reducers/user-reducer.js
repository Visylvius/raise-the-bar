import { FETCH_USER } from '../actions/user-actions';

const initialState = { user: null, error: null, loading: null };

export const userReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_USER}_PENDING`:
      return initialState;
    case `${FETCH_USER}_FULFILLED`:
      return { user: action.payload, error: null, loading: true};
    case `${FETCH_USER}_REJECTED`:
      return { user: null, error: action.payload, loading: false};
    default:
      return state;
  }
};
