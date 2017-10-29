import { combineReducers } from 'redux';
import auth, { IAuthState } from './auth';

export interface AppState {
  auth: IAuthState;
}

export default combineReducers({
  auth,
});
