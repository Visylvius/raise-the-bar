import { AVATARCROP_CHANGE } from '../actions/athlete-actions';

const initialState = null;

export const cropReducer = (crop=initialState, action) => {
  switch (action.type) {
    case AVATARCROP_CHANGE:
      return action.payload;
    default:
      return crop;
  }
};
