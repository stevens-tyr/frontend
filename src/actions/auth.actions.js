import * as types from './actionTypes';

export const addMsg = (msgType, msgHead, msg) => dispatch =>
  dispatch({
    type: types.ADD_AUTH_FORM_MESSAGE,
    payload: {
      msgType,
      msgHead,
      msg
    }
  });

export const clearMsg = () => dispatch =>
  dispatch({
    type: types.DEL_AUTH_FORM_MESSAGE
  });
