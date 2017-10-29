import * as React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

export const SecuredRoute = ({ component: Component, ...routerParameters }) => (
  <Route
    {...routerParameters}
    render={(props: any) =>
      routerParameters.userAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
  />
);
