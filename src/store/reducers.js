import {combineReducers} from 'redux';
import user from './user/reducer';
import global from './global/reducer';

export default combineReducers({
  user,
  global,
});
