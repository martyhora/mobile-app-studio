import * as React from 'react';
import { Link, Router } from 'react-router-dom';
import { connect } from 'react-redux';

import ApplicationListContainer from './ApplicationList/ApplicationListContainer';
import SceneContainer from './Scene/SceneContainer';
import SceneListContainer from './SceneList/SceneListContainer';
import { LoginRoute, SecuredRoute } from '../routes';
import history from '../history';
import { logoutUser } from '../actions/auth';
import { IUser } from '../api/AuthApi';
import { AppState } from '../reducers/index';
import { Dispatch } from 'redux';
import { APP_TITLE } from '../constants';

interface AppProps {
  userAuthenticated: boolean;
  logoutUser: () => void;
  user: IUser;
}

const App = ({ userAuthenticated, logoutUser, user }: AppProps) => (
  <Router history={history}>
    <div className="wrapper">
      {userAuthenticated && (
        <header className="main-header">
          <a href="" className="logo">
            <span className="logo-mini">
              <b>{APP_TITLE}</b>
            </span>

            <span className="logo-lg">
              <b>{APP_TITLE}</b>
            </span>
          </a>

          <nav className="navbar navbar-static-top" role="navigation">
            <a href="#" className="sidebar-toggle visible-xs" data-toggle="offcanvas" role="button">
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                  <a href="" className="dropdown-toggle" data-toggle="dropdown">
                    {user.name}
                    {/*<img src="/images/user2-160x160.jpg" className="user-image" alt="User Image"/>*/}
                    <span className="hidden-xs" />
                  </a>
                  <ul className="dropdown-menu">
                    <li className="user-header">
                      {/*<img src="/images/user2-160x160.jpg" className="img-circle" alt="User Image"/>*/}
                      <p>{user.name}</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <a style={{ cursor: 'pointer' }} onClick={logoutUser}>
                    <i className="fa fa-sign-out fa-fw" /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      )}
      {userAuthenticated && (
        <aside className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image" />
              <div className="pull-left info">
                <p />
                <a href="#">
                  <i className="fa fa-circle text-success" /> Online
                </a>
              </div>
            </div>

            <ul className="sidebar-menu">
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-link" /> <span>Applications</span>{' '}
                  <i className="fa fa-angle-left pull-right" />
                </a>
                <ul className="treeview-menu">
                  <li>
                    <Link to="/">Application list</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </aside>
      )}

      <div className={`content-wrapper ${!userAuthenticated ? `content-wrapper--login` : ''}`}>
        <section className="content-header">
          <LoginRoute path="/login" userAuthenticated={userAuthenticated} />

          <SecuredRoute
            path="/"
            exact
            component={ApplicationListContainer}
            userAuthenticated={userAuthenticated}
          />
          <SecuredRoute
            path="/scene/:id"
            component={SceneContainer}
            userAuthenticated={userAuthenticated}
          />
          <SecuredRoute
            path="/scene-list/:id"
            component={SceneListContainer}
            userAuthenticated={userAuthenticated}
          />
        </section>

        <section className="content" />
      </div>

      <footer className={`main-footer ${!userAuthenticated ? `main-footer--login` : ''}`}>
        <div className="pull-right hidden-xs" />

        <strong>Copyright &copy; 2017</strong>
      </footer>

      <div className="control-sidebar-bg" />
    </div>
  </Router>
);

export default connect(
  (state: AppState) => ({
    userAuthenticated: state.auth.authToken !== '',
    user: state.auth.user !== null ? state.auth.user : {},
  }),
  (dispatch: Dispatch<AppState>) => ({
    logoutUser: () => {
      dispatch(logoutUser());
    },
  })
)(App);
