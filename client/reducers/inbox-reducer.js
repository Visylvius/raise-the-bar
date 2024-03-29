import {
  GET_MESSAGES,
  SHOW_MESSAGE_THREAD,
  HIDE_MESSAGE_THREAD,
  SEND_MESSAGE,
  SHOW_DELETE_MESSAGE_MODAL,
  HIDE_DELETE_MESSAGE_MODAL,
  CANCEL_DELETE_MESSAGE_MODAL,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from '../actions/inbox-actions';

const initialState = {
  messageId: null,
  messages: null,
  err: null,
  loading: false,
  modalShowing: false,
  deleteMessageModal: false,
  firstTimeRenderingInbox: true,
  snackBarShowing: false
};

export const inboxReducer = (state=initialState, action) => {
  console.log('state', state);
  switch(action.type) {
    case `${GET_MESSAGES}_PENDING`:
      return initialState;
    case `${GET_MESSAGES}_FULFILLED`:
      return {
        messages: action.payload,
        err: false,
        loading: true,
        modalShowing: state.modalShowing,
        firstTimeRenderingInbox: true
      };
    case `${GET_MESSAGES}_REJECTED`:
      return { messages: null, err: action.payload, loading: false, modalShowing: false};
    case `${SEND_MESSAGE}_FULFILLED`:
      return Object.assign({}, state, {modalShowing: false});
    case SHOW_MESSAGE_THREAD:
      return Object.assign({}, state, {messageId: action.messageId, modalShowing: true});
    case HIDE_MESSAGE_THREAD:
      return Object.assign({}, state, {modalShowing: false});
    case SHOW_DELETE_MESSAGE_MODAL:
      return Object.assign({}, state, {deleteMessageModal: true, messageId: action.messageId});
    case CANCEL_DELETE_MESSAGE_MODAL:
      return Object.assign({}, state, {deleteMessageModal: false});
    case HIDE_DELETE_MESSAGE_MODAL:
      return { messages: action.messages.filter((message) =>
        message.id !== action.messageId
      ),
      deleteMessageModal: false,
      messageId: null
    };
    case `${HIDE_DELETE_MESSAGE_MODAL}_PENDING`:
      return state;
    case `${HIDE_DELETE_MESSAGE_MODAL}_FULFILLED`:
      return Object.assign({}, state, {
        deleteMessageModal: false,
        messageId: null,
        firstTimeRenderingInbox: false
      });
    case SHOW_SNACKBAR:
      return Object.assign({}, state, {snackBarShowing: true});
    case HIDE_SNACKBAR:
      return Object.assign({}, state, {snackBarShowing: false});
    default:
      return state;
  }
};
