import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import ErrorList from '../ErrorList';

interface ILoginFormProps {
  username: string;
  password: string;
  errors: Array<string>;
  isAuthenticating: boolean;
  handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLoginSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({
  username,
  password,
  errors,
  isAuthenticating,
  handleUsernameChange,
  handlePasswordChange,
  handleLoginSubmit,
}: ILoginFormProps) => (
  <div className="login-box">
    <div className="login-logo">
      <a href="">
        <b>Mobile App</b> Studio
      </a>
    </div>
    <form action="" onSubmit={handleLoginSubmit}>
      <div className="login-box-body">
        <p className="login-box-msg">Log in, please.</p>

        <ErrorList header="Login failed" errors={errors} />

        <div className="form-group has-feedback">
          <input
            type="text"
            name="username"
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
            required={true}
          />
          <span className="glyphicon glyphicon-envelope form-control-feedback" />
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
            required={true}
          />
          <span className="glyphicon glyphicon-lock form-control-feedback" />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-flat btn--full-width"
          value="Log in"
          disabled={isAuthenticating}
        />
      </div>
    </form>
  </div>
);

export default LoginForm;
