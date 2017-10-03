import 'script-loader!../node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min';
import 'script-loader!../node_modules/admin-lte/bootstrap/js/bootstrap.min';
import 'script-loader!../node_modules/admin-lte/dist/js/app.min';

import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(<App />, document.getElementById('app'));
