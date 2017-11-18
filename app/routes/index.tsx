import * as React from 'react';
import { Redirect, RouteProps } from 'react-router';
import { Route } from 'react-router-dom';
import LoginFormContainer from '../components/Auth/LoginFormContainer';
import { Component } from 'react';

interface SecuredRouteProps extends RouteProps {
  userAuthenticated: boolean;
}

export const SecuredRoute = ({ component: Component, ...routerParameters }: SecuredRouteProps) => (
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

export const LoginRoute = ({ ...routerParameters }) => (
  <Route
    {...routerParameters}
    render={(props: any) =>
      routerParameters.userAuthenticated ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <LoginFormContainer />
      )}
  />
);
