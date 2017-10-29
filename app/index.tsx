import 'script-loader!../node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min';
import 'script-loader!../node_modules/admin-lte/bootstrap/js/bootstrap.min';
import 'script-loader!../node_modules/admin-lte/dist/js/app.min';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import { setLoggedUser } from './actions/auth';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
store.dispatch(setLoggedUser());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
