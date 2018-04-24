import React from 'react';
import { render } from 'react-dom';

import App from './App';

import config from './ctfstrap.config';

import './style/index.scss';

document.title = config.title;

render(<App />, document.getElementById('root'));
