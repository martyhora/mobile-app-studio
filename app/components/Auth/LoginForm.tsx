import * as React from 'react';
import ErrorList from '../ErrorList';
import { APP_TITLE } from '../../constants';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface ILoginFormData {
  username: string;
  password: string;
}

interface ILoginFormProps {
  errors: Array<string>;
  handleLoginSubmit: (username: string, password: string) => void;
  isAuthenticating: boolean;
}

const LoginForm = ({
  errors,
  handleLoginSubmit,
  isAuthenticating,
  handleSubmit,
  submitting,
}: InjectedFormProps<ILoginFormData> & ILoginFormProps) => (
  <div className="login-box">
    <div className="login-logo">
      <a href="">
        <b>{APP_TITLE}</b>
      </a>
    </div>
    <form
      action=""
      onSubmit={handleSubmit((values: ILoginFormData) => {
        handleLoginSubmit(values.username, values.password);
      })}
    >
      <div className="login-box-body">
        <p className="login-box-msg">Log in, please.</p>

        <ErrorList header="Login failed" errors={errors} />

        <div className="form-group has-feedback">
          <Field name="username" component="input" type="text" className="form-control" required />
          <span className="glyphicon glyphicon-envelope form-control-feedback" />
        </div>
        <div className="form-group has-feedback">
          <Field
            name="password"
            component="input"
            type="password"
            className="form-control"
            required
          />
          <span className="glyphicon glyphicon-lock form-control-feedback" />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-flat btn--full-width"
          value="Log in"
          disabled={submitting || isAuthenticating}
        />
      </div>
    </form>
  </div>
);

const form: string = 'login';

export default reduxForm<ILoginFormData, ILoginFormProps>({
  form,
  enableReinitialize: true,
})(LoginForm);
