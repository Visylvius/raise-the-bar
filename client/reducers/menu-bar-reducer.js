import {
  CLOSE_MENU_BAR,
  OPEN_MENU_BAR,
  OPEN_NEW_USER_MODAL,
  CLOSE_NEW_USER_MODAL
} from '../actions/user-actions';

const initialState = { isShowingModal: false, isShowingDrawer: false}

export const menuBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU_BAR:
      return Object.assign({}, state, {isShowingDrawer: true});
    case CLOSE_MENU_BAR:
      return Object.assign({}, state, {isShowingDrawer: false});
    case OPEN_NEW_USER_MODAL:
      return Object.assign({}, state, {isShowingModal: true});
    case CLOSE_NEW_USER_MODAL:
      return Object.assign({}, state, {isShowingModal: false});
    default:
      return state;
  }
};
