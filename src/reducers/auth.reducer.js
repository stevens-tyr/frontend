import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case types.ADD_AUTH_FORM_MESSAGE: {
      const { msg, msgType, msgHead } = action.payload;
      return {
        msg,
        msgType,
        msgHead
      };
    }
    case types.DEL_AUTH_FORM_MESSAGE:
      return {
        msg: null,
        msgType: null,
        msgHead: null
      };
    default:
      return state;
  }
};
