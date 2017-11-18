import AuthApi, { IApiAuthResponse, IUser, IUserApiResponse } from '../api/AuthApi';
import history from '../history';
import { AUTH_TOKEN_KEY } from '../constants';
import { Dispatch } from 'react-redux';
import { AppState } from '../reducers/index';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { IAuthState } from '../reducers/auth';

export const USER_LOGOUT = 'USER_LOGOUT';

export type LogoutUserAction = {
  type: typeof USER_LOGOUT;
};

export const logoutUser: ActionCreator<ThunkAction<void, AppState, {}>> = (): ThunkAction<
  void,
  AppState,
  {}
> => (dispatch: Dispatch<IAuthState>): void => {
  const userLogoutAction: LogoutUserAction = { type: USER_LOGOUT };

  dispatch(userLogoutAction);

  sessionStorage.removeItem(AUTH_TOKEN_KEY);
};

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';

export type RequestLoginAction = {
  type: typeof USER_LOGIN_REQUEST;
};

const requestUserLogin: ActionCreator<RequestLoginAction> = (): RequestLoginAction => ({
  type: USER_LOGIN_REQUEST,
});

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export type HandleLoginSuccessAction = {
  type: typeof USER_LOGIN_SUCCESS;
  authToken: string;
  user: IUser;
};

const handleLoginSuccess: ActionCreator<HandleLoginSuccessAction> = (
  authToken: string,
  user: IUser
): HandleLoginSuccessAction => ({
  type: USER_LOGIN_SUCCESS,
  authToken,
  user,
});

export const USER_LOGIN_WRONG_CREDENTIALS = 'USER_LOGIN_WRONG_CREDENTIALS';

export type HandleWrongLoginCredentialsAction = {
  type: typeof USER_LOGIN_WRONG_CREDENTIALS;
  errorMessage: string;
};

const handleWrongLoginCredentials = (): HandleWrongLoginCredentialsAction => ({
  type: USER_LOGIN_WRONG_CREDENTIALS,
  errorMessage: 'Wrong login credentials, please try again',
});

export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export type HandleLoginFailureAction = {
  type: typeof USER_LOGIN_FAILURE;
  errorMessage: string;
};

const handleLoginFailure: ActionCreator<
  HandleLoginFailureAction
> = (): HandleLoginFailureAction => ({
  type: USER_LOGIN_FAILURE,
  errorMessage: 'There was an error when connecting to server, please try again later',
});

export const loginUser: ActionCreator<ThunkAction<Promise<void>, AppState, {}>> = (
  username: string,
  password: string
): ThunkAction<Promise<void>, AppState, {}> => async (
  dispatch: Dispatch<IAuthState>
): Promise<void> => {
  dispatch(requestUserLogin());

  try {
    try {
      const authResponse: IApiAuthResponse = await AuthApi.login(username, password);

      dispatch(handleLoginSuccess(authResponse.authToken, authResponse.user));

      sessionStorage.setItem(AUTH_TOKEN_KEY, authResponse.authToken);
    } catch (authError) {
      dispatch(handleWrongLoginCredentials());
    }
  } catch (error) {
    dispatch(handleLoginFailure());
  }
};

export const SET_USER = 'SET_USER';

export type SetUserAction = {
  type: typeof SET_USER;
  user: IUser;
};

const setUser: ActionCreator<SetUserAction> = (user: IUser): SetUserAction => ({
  type: SET_USER,
  user,
});

export const setLoggedUser: ActionCreator<
  ThunkAction<Promise<void>, AppState, {}>
> = (): ThunkAction<Promise<void>, AppState, {}> => async (
  dispatch: Dispatch<AppState>,
  getState: () => AppState
): Promise<void> => {
  const authToken: string = getState().auth.authToken;

  if (!authToken) {
    return;
  }

  try {
    const userData: IUserApiResponse = await AuthApi.fetchUser(getState().auth.authToken);

    if (userData.success === false && userData.authorizationFailed === true) {
      dispatch(logoutUser());
    } else {
      dispatch(setUser(userData.user));
    }
  } catch (error) {
    console.log(error);
  }
};
