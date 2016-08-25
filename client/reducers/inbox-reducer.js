import { GET_MESSAGES } from '../actions/inbox-actions';

const initialState = { messages: null, err: null, loading: false};

export const inboxReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${GET_MESSAGES}_PENDING`:
      return initialState;
    case `${GET_MESSAGES}_FULFILLED`:
      return { messages: action.payload, err: false, loading: true};
    case `${GET_MESSAGES}_REJECTED`:
      return { messages: null, err: action.payload, loading: false};
    default:
      return state;
  }
};
