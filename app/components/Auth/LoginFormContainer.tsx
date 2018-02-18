import * as React from 'react';
import LoginForm from './LoginForm';
import { loginUser } from '../../actions/auth';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducers';

interface ILoginFormContainerProps {
  loginUser: (username: string, password: string) => any;
  errors: Array<string>;
  isAuthenticating: boolean;
}

class LoginFormContainer extends React.Component<ILoginFormContainerProps> {
  handleLoginSubmit = (username: string, password: string) => {
    this.props.loginUser(username, password);
  };

  render() {
    return (
      <LoginForm
        errors={this.props.errors}
        handleLoginSubmit={this.handleLoginSubmit}
        isAuthenticating={this.props.isAuthenticating}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    errors: state.auth.errors,
    isAuthenticating: state.auth.isLoading,
  }),
  (dispatch: Dispatch<AppState>) => ({
    loginUser: (username: string, password: string) => {
      dispatch(loginUser(username, password));
    },
  })
)(LoginFormContainer);
