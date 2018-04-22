import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

import config from './ctfstrap.config';

import 'bootstrap/dist/css/bootstrap.min.css';

document.title = config.title;

render(<Router><App /></Router>, document.getElementById('root'));
