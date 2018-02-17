import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth, { IAuthState } from './auth';

export interface AppState {
  auth: IAuthState;
}

export default combineReducers({
  auth,
  form: formReducer,
});
