import { SEND_MESSAGE } from '../actions/inbox-actions';

const initialState = { message: null, error: null, loading: null};

export const messageReducer = (state=initialState, action) => {
  switch (action.type) {
    case `${SEND_MESSAGE}_PENDING`:
      return initialState;
    case `${SEND_MESSAGE}_FULFILLED`:
      return { message: action.payload, error: false, loading: true};
    case `${SEND_MESSAGE}_REJECTED`:
      return { message: null, error: action.payload, loading: false};
    default:
      return initialState;
  }
};
