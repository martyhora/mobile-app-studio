import { AUTH_TOKEN_KEY } from '../constants';
import {
  HandleLoginFailureAction,
  HandleLoginSuccessAction,
  HandleWrongLoginCredentialsAction,
  LogoutUserAction,
  RequestLoginAction,
  SET_USER,
  SetUserAction,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_WRONG_CREDENTIALS,
  USER_LOGOUT,
} from '../actions/auth';
import { IUser } from '../api/AuthApi';

export interface IAuthState {
  readonly authToken: string;
  readonly user: IUser;
  readonly errors: Array<string>;
  readonly isLoading: boolean;
}

type AuthAction =
  | RequestLoginAction
  | HandleWrongLoginCredentialsAction
  | LogoutUserAction
  | HandleLoginSuccessAction
  | HandleLoginFailureAction
  | SetUserAction;

const authToken: string = sessionStorage.getItem(AUTH_TOKEN_KEY);

const defaultState: IAuthState = {
  authToken: authToken ? authToken : '',
  user: null,
  errors: [],
  isLoading: false,
};

const auth = (state: IAuthState = defaultState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        errors: [],
        authToken: action.authToken,
        user: action.user,
        isLoading: false,
      };

    case USER_LOGIN_WRONG_CREDENTIALS:
      return { ...state, errors: [action.errorMessage], isLoading: false };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        errors: [action.errorMessage],
        isLoading: false,
      };

    case USER_LOGOUT:
      return { ...state, authToken: '' };

    case SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default auth;
