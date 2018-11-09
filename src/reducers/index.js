import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';

const rootReducer = combineReducers({
  notifications: notificationsReducer()
});

export default rootReducer;
