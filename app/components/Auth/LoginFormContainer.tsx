import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import LoginForm from './LoginForm';
import { loginUser } from '../../actions/auth';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducers/index';

interface ILoginFormContainerState {
  username: string;
  password: string;
}

interface ILoginFormContainerProps {
  loginUser: (username: string, password: string) => any;
  errors: Array<string>;
  userAuthenticated: boolean;
  isAuthenticating: boolean;
}

class LoginFormContainer extends React.Component<
  ILoginFormContainerProps,
  ILoginFormContainerState
> {
  state = {
    username: '',
    password: '',
  };

  handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.currentTarget.value });
  };

  handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.loginUser(this.state.username, this.state.password);
  };

  render() {
    return (
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        errors={this.props.errors}
        isAuthenticating={this.props.isAuthenticating}
        handleUsernameChange={this.handleUsernameChange}
        handlePasswordChange={this.handlePasswordChange}
        handleLoginSubmit={this.handleLoginSubmit}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    errors: state.auth.errors,
    userAuthenticated: state.auth.authToken !== '',
    isAuthenticating: state.auth.isLoading,
  }),
  (dispatch: Dispatch<AppState>) => ({
    loginUser: (username: string, password: string) => {
      dispatch(loginUser(username, password));
    },
  })
)(LoginFormContainer);
