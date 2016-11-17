import { SAVE_GYM, HIDE_SNACKBAR } from '../actions/gyms-actions';

const initialState = {savedGym: null, error: null, loading: null, snackBarShowing: false};

export const saveGymReducer = (state=initialState, action) => {
  switch(action.type) {
    case `${SAVE_GYM}_PENDING`:
      return initialState;
    case `${SAVE_GYM}_FULFILLED`:
      return { savedGym: action.payload, error: null, loading: true, snackBarShowing: true};
    case `${SAVE_GYM}_REJECTED`:
      return { savedGym: null, error: action.payload, loading: false};
    case HIDE_SNACKBAR:
      return Object.assign({}, state, {snackBarShowing: false});
    default:
      return state;
  }
};
