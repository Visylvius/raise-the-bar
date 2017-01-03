import { CLOSE_MENU_BAR, OPEN_MENU_BAR } from '../actions/user-actions';

const initialState = { isShowingModal: false, isShowingDrawer: false}

export const menuBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU_BAR:
      return Object.assign({}, state, {isShowingDrawer: true});
    case CLOSE_MENU_BAR:
      return Object.assign({}, state, {isShowingDrawer: false});
    default:
      return state;
  }
};
